import React from "react";
import Link from "next/link";
import DateRange from "../../utility/DateRange";

const WorkExperienceSection = ({ workExperience }) => {
  if (!workExperience || workExperience.length === 0) return null;

  return (
    <div>
      <h2 className="section-title mb-1 border-b-2" style={{ borderColor: "var(--cv-section-border)", color: "var(--cv-primary)" }}>
        Work Experience
      </h2>
      {workExperience.map((item, index) => (
        <div key={index} className="mb-1">
          <div className="flex flex-row justify-between space-y-1">
            <p className="content i-bold">{item.company}</p>
            <DateRange
              startYear={item.startYear}
              endYear={item.endYear}
              id={`work-experience-start-end-date`}
            />
          </div>
          <p className="content">{item.position}</p>
          <p className="content hyphens-auto">{item.description}</p>
          {typeof item.keyAchievements === "string" &&
            item.keyAchievements.length > 0 && (
              <ul className="list-disc ul-padding content">
                {item.keyAchievements.split("\n").map((achievement, subIndex) => (
                  <li key={subIndex}>
                    <div dangerouslySetInnerHTML={{ __html: achievement }} />
                  </li>
                ))}
              </ul>
            )}
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceSection;
