"use client"; // For Next.js App Router

import { useRef, useEffect } from "react";
import { renderAsync } from "docx-preview";

export default function DocxViewer() {
  const containerRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      const arrayBuffer = await file.arrayBuffer();

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      await renderAsync(arrayBuffer, containerRef.current, undefined, {
        className: "docx",
        inWrapper: false, // Disables page wrapper that causes spacing
        ignoreWidth: true,
        ignoreHeight: true,
        debug: false,
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Upload a .docx File</h2>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />
      <div
        ref={containerRef}
        className="docx-container"
        style={{
          border: "1px solid #ccc",
          marginTop: "20px",
          padding: "20px",
          maxHeight: "80vh",
          overflow: "auto",
          backgroundColor: "#fff",
          color: "#000",
          minHeight: "200px",
          boxSizing: "border-box",
        }}
      ></div>

      {/* CSS Fixes for Layout Issues */}
      <style jsx>{`
        .docx-container {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }

        .docx * {
          background: none !important;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          color: inherit !important;
        }

        .docx .docx-page {
          margin: 0 !important;
          padding: 0 !important;
          height: auto !important;
          min-height: unset !important;
          max-height: unset !important;
          box-shadow: none !important;
          overflow: visible !important;
          page-break-after: always;
        }

        .docx .docx-wrapper {
          padding: 0 !important;
          margin: 0 !important;
        }

        .docx p,
        .docx div {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
