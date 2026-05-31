import React from "react";

const SummarySection = ({ summary }) => {
  if (!summary || summary.length === 0) return null;

  return (
    <div className="mb-1">
      <h2 className="section-title mb-1 border-b-2 border-gray-300">
        Summary
      </h2>
      <p className="content break-words">{summary}</p>
    </div>
  );
};

export default SummarySection;
