import React from "react";
import Image from "next/image";
import Link from "next/link";
import DateRange from "../../utility/DateRange";

const MinimalTemplate = ({ resumeData }) => {
  return (
    <div style={{ fontSize: "11px", lineHeight: "1.6", color: "#1f2937" }}>

      <div className="text-center" style={{ marginBottom: "14px" }}>
        {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
          <div className="flex justify-center" style={{ marginBottom: "6px" }}>
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: "52px",
                height: "52px",
                border: "1.5px solid var(--cv-primary)",
              }}
            >
              <Image
                src={resumeData.profilePicture}
                alt="profile"
                width={52}
                height={52}
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        )}
        <h1 style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "1px" }}>
          {resumeData.name}
        </h1>
        <div
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "var(--cv-primary)",
            margin: "6px auto",
          }}
        />
        <p style={{ fontSize: "13px", fontWeight: 400, color: "#6b7280" }}>
          {resumeData.position}
        </p>
        <p style={{ fontSize: "10.5px", marginTop: "6px", color: "#6b7280" }}>
          {[resumeData.address, resumeData.contactInformation, resumeData.email]
            .filter(Boolean)
            .join("  ·  ")}
        </p>
        {resumeData.socialMedia && resumeData.socialMedia.length > 0 && (
          <p style={{ fontSize: "10.5px", marginTop: "3px", color: "#6b7280" }}>
            {resumeData.socialMedia.map((item, i) => (
              <span key={i}>
                {i > 0 && "  ·  "}
                <span style={{ fontWeight: 500 }}>{item.socialMedia}:</span>{" "}
                <a href={`http://${item.link}`} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>

      {/* ── SUMMARY ── */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Summary</SectionHeading>
          <p style={{ color: "#374151" }}>{resumeData.summary}</p>
        </div>
      )}

      {/* ── SKILLS (grouped inline) ── */}
      {resumeData.skills.length > 0 &&
        resumeData.skills.some((g) => g.skills.length > 0) && (
          <div style={{ marginBottom: "14px" }}>
            {resumeData.skills.map(
              (skillGroup, index) =>
                skillGroup.skills.length > 0 && (
                  <div key={index}>
                    <SectionHeading>{skillGroup.title}</SectionHeading>
                    <p>{skillGroup.skills.join(", ")}</p>
                  </div>
                )
            )}
          </div>
        )}

      {/* ── WORK EXPERIENCE ── */}
      {resumeData.workExperience.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Work Experience</SectionHeading>
          {resumeData.workExperience.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div className="flex justify-between items-baseline">
                <p>
                  <span style={{ fontWeight: 600 }}>{item.position}</span>
                  <span style={{ color: "#6b7280" }}> · {item.company}</span>
                </p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-work-date-${index}`}
                />
              </div>
              {item.description && (
                <p style={{ color: "#4b5563", marginTop: "2px" }}>
                  {item.description}
                </p>
              )}
              {typeof item.keyAchievements === "string" &&
                item.keyAchievements.length > 0 && (
                  <ul
                    className="list-disc ul-padding"
                    style={{ marginTop: "3px" }}
                  >
                    {item.keyAchievements.split("\n").map((achievement, i) => (
                      <li key={i}>
                        <div
                          dangerouslySetInnerHTML={{ __html: achievement }}
                          contentEditable
                        />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}

      {/* ── PROJECTS ── */}
      {resumeData.projects.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Projects</SectionHeading>
          {resumeData.projects.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <div className="flex justify-between items-baseline">
                <p style={{ fontWeight: 600 }}>{item.name}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-proj-date-${index}`}
                />
              </div>
              {item.link && (
                <p style={{ color: "#6b7280", marginTop: "1px" }}>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link}
                  </Link>
                </p>
              )}
              {item.description && (
                <p style={{ color: "#4b5563", marginTop: "2px" }}>
                  {item.description}
                </p>
              )}
              {typeof item.keyAchievements === "string" &&
                item.keyAchievements.length > 0 && (
                  <ul
                    className="list-disc ul-padding"
                    style={{ marginTop: "3px" }}
                  >
                    {item.keyAchievements.split("\n").map((achievement, i) => (
                      <li key={i}>
                        <div
                          dangerouslySetInnerHTML={{ __html: achievement }}
                          contentEditable
                        />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}

      {/* ── EDUCATION ── */}
      {resumeData.education.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Education</SectionHeading>
          {resumeData.education.map((item, index) => (
            <div key={index} style={{ marginBottom: "4px" }}>
              <div className="flex justify-between items-baseline">
                <p>
                  <span style={{ fontWeight: 600 }}>{item.degree}</span>
                  <span style={{ color: "#6b7280" }}> · {item.school}</span>
                </p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-edu-date-${index}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {resumeData.certifications.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Certifications</SectionHeading>
          <p>{resumeData.certifications.join(", ")}</p>
        </div>
      )}

      {/* ── LANGUAGES ── */}
      {resumeData.languages.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHeading>Languages</SectionHeading>
          <p>{resumeData.languages.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

const SectionHeading = ({ children }) => (
  <h2
    style={{
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      color: "var(--cv-primary)",
      marginBottom: "4px",
    }}
  >
    {children}
  </h2>
);

export default MinimalTemplate;
