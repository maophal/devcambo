"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css"; // Example theme

export function LiveCodeEditor() {
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, World!</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState("console.log('Hello, World!');");

  const srcDoc = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
    </html>
  `;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">HTML</h3>
          <div className="h-48 overflow-auto rounded-md bg-gray-900">
            <Editor
              value={htmlCode}
              onValueChange={(code) => setHtmlCode(code)}
              highlight={(code) => highlight(code, languages.markup, "markup")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">CSS</h3>
          <div className="h-48 overflow-auto rounded-md bg-gray-900">
            <Editor
              value={cssCode}
              onValueChange={(code) => setCssCode(code)}
              highlight={(code) => highlight(code, languages.css, "css")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col space-y-2 lg:col-span-2">
          <h3 className="text-lg font-semibold">JavaScript</h3>
          <div className="h-48 overflow-auto rounded-md bg-gray-900">
            <Editor
              value={jsCode}
              onValueChange={(code) => setJsCode(code)}
              highlight={(code) => highlight(code, languages.js, "js")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Result</h3>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="400px"
          className="rounded-md border border-gray-200"
        />
      </div>
    </div>
  );
}
