import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills.length > 0 && (
      <>
        <h2 className="section-title mb-1 border-b-2 editable" style={{ borderColor: "var(--cv-section-border)", color: "var(--cv-primary)" }} contentEditable suppressContentEditableWarning onBlur={handleTitleChange}>
          {title}
        </h2>
        <p className="sub-content">{skills.join(", ")}</p>
      </>
    )
  );
};

export default Skills;