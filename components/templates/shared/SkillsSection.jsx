import React from "react";

const SkillsSection = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <>
      {skills.map((skillGroup, index) => (
        skillGroup.skills.length > 0 && (
          <div key={index} className="mb-1">
            <h2 className="section-title mb-1 border-b-2" style={{ borderColor: "var(--cv-section-border)", color: "var(--cv-primary)" }}>
              {skillGroup.title}
            </h2>
            <p className="sub-content">{skillGroup.skills.join(", ")}</p>
          </div>
        )
      ))}
    </>
  );
};

export default SkillsSection;
