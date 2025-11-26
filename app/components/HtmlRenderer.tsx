"use client";

import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

export function HtmlRenderer({ htmlString }: { htmlString: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Sanitize the HTML string first
      const cleanHtml = DOMPurify.sanitize(htmlString, { ADD_TAGS: ["script"] });

      const fragment = document.createRange().createContextualFragment(cleanHtml);
      const scripts = Array.from(fragment.querySelectorAll("script"));

      // Clear previous content
      containerRef.current.innerHTML = "";

      // Append the new content (without scripts)
      containerRef.current.appendChild(fragment);

      // Terminate previous worker if exists
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }

      // Execute scripts in a Web Worker
      const scriptContents = scripts.map((script) => script.text).join("\n");

      if (scriptContents.trim().length > 0) {
        const workerBlob = new Blob(
          [
            `self.onmessage = (e) => {
              const code = e.data;
              const logs = [];
              const originalConsoleLog = console.log;

              console.log = (...args) => {
                logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
                originalConsoleLog(...args); // Also log to main console
              };

              try {
                eval(code);
                self.postMessage({ logs });
              } catch (error) {
                self.postMessage({ error: error.message, logs });
              } finally {
                console.log = originalConsoleLog; // Restore console.log
              }
            };`,
          ],
          { type: "application/javascript" }
        );

        workerRef.current = new Worker(URL.createObjectURL(workerBlob));

        workerRef.current.onmessage = (e) => {
          if (e.data.logs) {
            e.data.logs.forEach(log => console.log("Worker Log:", log));
          }
          if (e.data.error) {
            console.error("Worker Error:", e.data.error);
          }
        };

        workerRef.current.postMessage(scriptContents);
      }
    }

    return () => {
      // Cleanup on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [htmlString]);

  return <div ref={containerRef} />;
}
