import React, { useState } from "react";
import * as marked from "marked";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState(
    "### Hello\n**This is bold text**\n*This is italic text*"
  );

  const handleInputChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const convertMarkdownToHtml = () => {
    return { __html: marked.parse(markdownText) }; // Use marked.parse instead of marked
  };

  return (
    <div>
      <textarea
        id="markdown-input"
        value={markdownText}
        onChange={handleInputChange}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      ></textarea>

      <div
        id="html-output"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
        dangerouslySetInnerHTML={convertMarkdownToHtml()}
      ></div>
    </div>
  );
};

export default MarkdownEditor;
