// components/SummaryButton.jsx
import React from "react";

function SummaryButton({ onSummarize }) {
  return (
    <button onClick={onSummarize} style={{ marginTop: "10px" }}>
      📤 Summarize & Send to Slack
    </button>
  );
}

export default SummaryButton;
