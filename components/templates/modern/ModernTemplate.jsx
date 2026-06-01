import React from "react";
import Image from "next/image";
import Link from "next/link";
import DateRange from "../../utility/DateRange";

const ModernTemplate = ({ resumeData }) => {
  return (
    <div style={{ fontSize: "11px", lineHeight: "1.5", color: "#1f2937" }}>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
        <div
          style={{
            width: "4px",
            alignSelf: "stretch",
            borderLeft: "4px solid var(--cv-primary)",
            borderRadius: "2px",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: "48px",
                  height: "48px",
                  border: "2px solid var(--cv-primary)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={48}
                  height={48}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 700 }}>
                {resumeData.name}
              </h1>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--cv-primary)", marginTop: "1px" }}>
                {resumeData.position}
              </p>
            </div>
          </div>

          {/* Contact grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px 20px",
              marginTop: "8px",
              fontSize: "10.5px",
            }}
          >
            {resumeData.email && (
              <p>
                <span style={{ fontWeight: 600, color: "var(--cv-primary)" }}>Email </span>
                <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
              </p>
            )}
            {resumeData.contactInformation && (
              <p>
                <span style={{ fontWeight: 600, color: "var(--cv-primary)" }}>Phone </span>
                <a href={`tel:${resumeData.contactInformation}`}>{resumeData.contactInformation}</a>
              </p>
            )}
            {resumeData.address && (
              <p>
                <span style={{ fontWeight: 600, color: "var(--cv-primary)" }}>Location </span>
                {resumeData.address}
              </p>
            )}
            {resumeData.socialMedia && resumeData.socialMedia.map((item, index) => (
              <p key={index}>
                <span style={{ fontWeight: 600, color: "var(--cv-primary)" }}>{item.socialMedia} </span>
                <a href={`http://${item.link}`} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      <hr style={{ borderColor: "var(--cv-section-border)", marginBottom: "10px" }} />

      {/* ── SUMMARY ── */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ color: "#374151" }}>{resumeData.summary}</p>
        </div>
      )}

      {/* ── SKILLS (compact tags) ── */}
      {resumeData.skills.length > 0 &&
        resumeData.skills.some((g) => g.skills.length > 0) && (
          <div style={{ marginBottom: "12px" }}>
            {resumeData.skills.map(
              (skillGroup, index) =>
                skillGroup.skills.length > 0 && (
                  <div key={index} style={{ marginBottom: "6px" }}>
                    <SectionTitle>{skillGroup.title}</SectionTitle>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {skillGroup.skills.map((skill, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            border: "1px solid var(--cv-section-border)",
                            borderRadius: "3px",
                            color: "#374151",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

      {/* ── WORK EXPERIENCE (date-left grid) ── */}
      {resumeData.workExperience.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <SectionTitle>Work Experience</SectionTitle>
          {resumeData.workExperience.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "85px 1fr",
                gap: "0 12px",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#9ca3af", paddingTop: "2px" }}>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-work-date-${index}`}
                />
              </div>
              <div>
                <p style={{ fontWeight: 700 }}>{item.position}</p>
                <p style={{ color: "#6b7280", fontSize: "10.5px" }}>{item.company}</p>
                {item.description && (
                  <p style={{ color: "#4b5563", marginTop: "2px" }}>
                    {item.description}
                  </p>
                )}
                {typeof item.keyAchievements === "string" &&
                  item.keyAchievements.length > 0 && (
                    <ul className="list-disc ul-padding" style={{ marginTop: "3px" }}>
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
            </div>
          ))}
        </div>
      )}

      {/* ── PROJECTS (date-left grid) ── */}
      {resumeData.projects.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "85px 1fr",
                gap: "0 12px",
                marginBottom: "8px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#9ca3af", paddingTop: "2px" }}>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-proj-date-${index}`}
                />
              </div>
              <div>
                <p style={{ fontWeight: 700 }}>{item.name}</p>
                {item.link && (
                  <p style={{ marginTop: "1px" }}>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--cv-primary)", fontSize: "10.5px" }}
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
                    <ul className="list-disc ul-padding" style={{ marginTop: "3px" }}>
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
            </div>
          ))}
        </div>
      )}

      {/* ── EDUCATION (date-left grid) ── */}
      {resumeData.education.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "85px 1fr",
                gap: "0 12px",
                marginBottom: "4px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#9ca3af", paddingTop: "2px" }}>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-edu-date-${index}`}
                />
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>{item.degree}</p>
                <p style={{ color: "#6b7280" }}>{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {resumeData.certifications.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <SectionTitle>Certifications</SectionTitle>
          <ul className="list-disc ul-padding">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── LANGUAGES ── */}
      {resumeData.languages.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <SectionTitle>Languages</SectionTitle>
          <p>{resumeData.languages.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "13px",
      fontWeight: 700,
      color: "var(--cv-primary)",
      borderLeft: "3px solid var(--cv-primary)",
      paddingLeft: "8px",
      marginBottom: "5px",
    }}
  >
    {children}
  </h2>
);

export default ModernTemplate;
