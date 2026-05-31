import React from "react";

const LanguagesSection = ({ languages }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div>
      <h2 className="section-title mb-1 border-b-2 border-gray-300">
        Languages
      </h2>
      <p className="sub-content">{languages.join(", ")}</p>
    </div>
  );
};

export default LanguagesSection;
