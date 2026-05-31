import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import DateRange from "../../utility/DateRange";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const ClassicTemplate = ({ resumeData }) => {
  return (
    <div style={{ fontSize: "11px", lineHeight: "1.5" }}>

      {/* ── HEADER ── */}
      <div className="text-center mb-2">
        {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
          <div className="flex justify-center mb-1">
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2"
              style={{ borderColor: "var(--cv-primary)" }}
            >
              <Image
                src={resumeData.profilePicture}
                alt="profile"
                width={56}
                height={56}
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        )}
        <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "0.5px" }}>
          {resumeData.name}
        </h1>
        <p style={{ fontSize: "14px", fontWeight: 500, marginTop: "2px" }}>
          {resumeData.position}
        </p>
        {/* Contact line */}
        <p style={{ fontSize: "11px", marginTop: "4px", color: "#4b5563" }}>
          {[resumeData.address, resumeData.contactInformation, resumeData.email]
            .filter(Boolean)
            .join(" | ")}
        </p>
        {/* Social links line */}
        {resumeData.socialMedia && resumeData.socialMedia.length > 0 && (
          <p style={{ fontSize: "11px", marginTop: "2px", color: "#4b5563" }}>
            {resumeData.socialMedia.map((item, i) => (
              <span key={i}>
                {i > 0 && " | "}
                <span style={{ fontWeight: 600 }}>{item.socialMedia}:</span>{" "}
                <a href={`http://${item.link}`} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>

      <hr style={{ borderColor: "var(--cv-section-border)", marginBottom: "8px" }} />

      {/* ── PROFESSIONAL SUMMARY ── */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Professional Summary</SectionTitle>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {/* ── TECHNICAL SKILLS (grouped inline) ── */}
      <Droppable droppableId="skills" type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {resumeData.skills.length > 0 &&
              resumeData.skills.some((g) => g.skills.length > 0) && (
                <div className="mb-2">
                  {resumeData.skills.map((skillGroup, index) =>
                    skillGroup.skills.length > 0 ? (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {index === 0 && <SectionTitle>{skillGroup.title}</SectionTitle>}
                            {index > 0 && <SectionTitle>{skillGroup.title}</SectionTitle>}
                            <p>
                              {skillGroup.skills.join(", ")}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ) : null
                  )}
                </div>
              )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* ── WORK EXPERIENCE ── */}
      {resumeData.workExperience.length > 0 && (
        <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-2">
              <SectionTitle>Work Experience</SectionTitle>
              {resumeData.workExperience.map((item, index) => (
                <Draggable
                  key={`${item.company}-${index}`}
                  draggableId={`WORK_EXPERIENCE-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-2 ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-baseline">
                        <p>
                          <span style={{ fontWeight: 700 }}>{item.company}</span>
                          <span style={{ color: "#6b7280" }}> — {item.position}</span>
                        </p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`classic-work-date-${index}`}
                        />
                      </div>
                      {item.description && (
                        <p style={{ color: "#4b5563", marginTop: "2px" }}>
                          {item.description}
                        </p>
                      )}
                      <Droppable
                        droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                        type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc ul-padding"
                            style={{ marginTop: "2px" }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {typeof item.keyAchievements === "string" &&
                              item.keyAchievements
                                .split("\n")
                                .map((achievement, subIndex) => (
                                  <Draggable
                                    key={`${item.company}-${index}-${subIndex}`}
                                    draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                    index={subIndex}
                                  >
                                    {(provided, snapshot) => (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${
                                          snapshot.isDragging
                                            ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: achievement,
                                          }}
                                          contentEditable
                                        />
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}

      {/* ── PROJECTS ── */}
      {resumeData.projects.length > 0 && (
        <Droppable droppableId="projects" type="PROJECTS">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-2">
              <SectionTitle>Projects</SectionTitle>
              {resumeData.projects.map((item, index) => (
                <Draggable
                  key={`${item.name}-${index}`}
                  draggableId={`PROJECTS-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-2 ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-baseline">
                        <p style={{ fontWeight: 700 }}>{item.name}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`classic-proj-date-${index}`}
                        />
                      </div>
                      {item.link && (
                        <p style={{ color: "#4b5563" }}>
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
                      <Droppable
                        droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                        type="PROJECTS_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc ul-padding"
                            style={{ marginTop: "2px" }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {typeof item.keyAchievements === "string" &&
                              item.keyAchievements
                                .split("\n")
                                .map((achievement, subIndex) => (
                                  <Draggable
                                    key={`${item.name}-${index}-${subIndex}`}
                                    draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                    index={subIndex}
                                  >
                                    {(provided, snapshot) => (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${
                                          snapshot.isDragging
                                            ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                            : ""
                                          }`}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: achievement,
                                          }}
                                          contentEditable
                                        />
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}

      {/* ── EDUCATION ── */}
      {resumeData.education.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-baseline">
                <div>
                  <p style={{ fontWeight: 700 }}>{item.degree}</p>
                  <p style={{ color: "#4b5563" }}>{item.school}</p>
                </div>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`classic-edu-date-${index}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {resumeData.certifications.length > 0 && (
        <div className="mb-2">
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
        <div className="mb-2">
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
      fontSize: "14px",
      fontWeight: 700,
      color: "var(--cv-primary)",
      borderBottom: "1px solid var(--cv-section-border)",
      paddingBottom: "2px",
      marginBottom: "4px",
    }}
  >
    {children}
  </h2>
);

export default ClassicTemplate;
