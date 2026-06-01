import React from "react";
import Link from "next/link";
import DateRange from "../../utility/DateRange";

const ProjectsSection = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div>
      <h2 className="section-title mb-1 border-b-2" style={{ borderColor: "var(--cv-section-border)", color: "var(--cv-primary)" }}>
        Projects
      </h2>
      {projects.map((item, index) => (
        <div key={index} className="mb-1">
          <div className="flex flex-row justify-between space-y-1">
            <p className="content i-bold">{item.name}</p>
            <DateRange
              startYear={item.startYear}
              endYear={item.endYear}
              id={`project-start-end-date`}
            />
          </div>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="content"
          >
            {item.link}
          </Link>
          <p className="content">{item.description}</p>
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

export default ProjectsSection;
