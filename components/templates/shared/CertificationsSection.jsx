import React from "react";

const CertificationsSection = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <div>
      <h2 className="section-title mb-1 border-b-2" style={{ borderColor: "var(--cv-section-border)", color: "var(--cv-primary)" }}>
        Certifications
      </h2>
      <ul className="sub-content list-disc ul-padding">
        {certifications.map((certification, index) => (
          <li key={index}>{certification}</li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationsSection;
