"use client";

import { useEffect, useRef } from "react";

export function HtmlRenderer({ htmlString }: { htmlString: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const fragment = document.createRange().createContextualFragment(htmlString);
      const scripts = Array.from(fragment.querySelectorAll("script"));

      // Clear previous content
      containerRef.current.innerHTML = "";

      // Append the new content (without scripts)
      containerRef.current.appendChild(fragment);

      // Execute scripts
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.text = script.text;
        document.body.appendChild(newScript).parentNode?.removeChild(newScript);
      });
    }
  }, [htmlString]);

  return <div ref={containerRef} />;
}
