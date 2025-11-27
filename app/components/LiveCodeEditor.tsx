"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";

export function LiveCodeEditor({ initialCode, language = 'javascript' }: { initialCode: string, language: string }) {
  const [code, setCode] = useState(initialCode);
  const [autoRun, setAutoRun] = useState(false);
  const [output, setOutput] = useState<{ level: string, args: any[] }[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    // Initial run
    run(initialCode);
  }, [initialCode, language]);

  // Build an HTML document that runs the user's code in a sandboxed iframe.
  const buildSrcDoc = useCallback((userCode: string) => {
    if (language.toLowerCase() === 'html') {
      return userCode;
    }
    
    // For JS, we wrap it to catch errors and forward console logs
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>body{font-family:system-ui,Segoe UI,Roboto,"Helvetica Neue",Arial;padding:8px;}</style>
</head>
<body>
  <div id="root"></div>
  <script>
    (function() {
      function send(type, args) {
        try {
          parent.postMessage({ type: 'console', level: type, args: args }, '*');
        } catch(e) {}
      }

      const levels = ['log','warn','error','info','debug'];
      levels.forEach(l => {
        const orig = console[l];
        console[l] = function(...a) { send(l, a); orig.apply(console, a); };
      });

      window.onerror = function(message, source, lineno, colno, error) {
        send('error', [String(message) + ' at ' + lineno + ':' + colno]);
      };

      try {
        (function() {
          'use strict';
          ${userCode}
        })();
      } catch (e) {
        send('error', [String(e)]);
      }
    })();
  </script>
</body>
</html>`;
  }, [language]);

  // Run the code by writing to iframe srcdoc
  const run = useCallback((userCode?: string) => {
    setOutput([]);
    const srcdoc = buildSrcDoc(userCode ?? code);
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.srcdoc = srcdoc;
  }, [buildSrcDoc, code]);

  // Listen for messages from iframe (console logs / errors)
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data || e.data.type !== 'console') return;
      setOutput(prev => [...prev, { level: e.data.level, args: e.data.args }]);
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run with debounce when enabled
  useEffect(() => {
    if (!autoRun) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => run(), 700);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [code, autoRun, run]);

  return (
    <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => run()}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Run
        </button>

        <button
          onClick={() => { setCode(initialCode); setOutput([]); run(initialCode); }}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Reset
        </button>

        <label className="ml-4 flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
          <input type="checkbox" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} />
          Auto-run
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-96 border rounded-md overflow-hidden">
          <Editor
            height="100%"
            language={language.toLowerCase()}
            value={code}
            theme="vs-dark"
            onChange={(v) => setCode(String(v ?? ''))}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>

        <div className="h-96 flex flex-col gap-2">
            <div className="flex-1 border rounded-md bg-white">
                <h3 className="text-lg font-semibold p-2 text-gray-800 dark:text-gray-200">Result</h3>
                <iframe
                ref={iframeRef}
                title="preview"
                style={{ width: '100%', height: 'calc(100% - 40px)', border: 0 }}
                sandbox="allow-scripts"
                />
            </div>

            <div className="h-40 border rounded-md p-2 overflow-auto bg-gray-900 text-white text-sm">
                <div className="font-semibold mb-2">Console</div>
                {output.length === 0 && <div className="text-gray-400">(no output)</div>}
                {output.map((o, i) => (
                <div key={i} className="mb-1 font-mono">
                    <span className={`text-xs ${o.level === 'error' ? 'text-red-400' : 'text-gray-400'}`}>[{o.level}]</span>{' '}
                    {o.args.map((a: any, ai: number) => (
                    <span key={ai}>{typeof a === 'object' ? JSON.stringify(a) : String(a)}{' '}</span>
                    ))}
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}