import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import DateRange from "../../utility/DateRange";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const socialIcons = [
  { name: "github", icon: <FaGithub /> },
  { name: "linkedin", icon: <FaLinkedin /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "facebook", icon: <FaFacebook /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "website", icon: <CgWebsite /> },
];

const ClassicTemplate = ({ resumeData }) => {
  return (
    <>
      {/* Header — position on top bar, large name below */}
      <div className="text-center mb-1">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
          {resumeData.position}
        </p>
        <hr style={{ borderColor: "var(--cv-section-border)" }} />
        <div className="flex items-center justify-center gap-3 mt-2">
          {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
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
          )}
          <h1 className="text-3xl font-bold tracking-wide">{resumeData.name}</h1>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <p className="text-xs leading-relaxed text-gray-600 mt-2 mb-2">
          {resumeData.summary}
        </p>
      )}

      {/* Contact row */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-xs border-t border-b py-2" style={{ borderColor: "var(--cv-section-border)" }}>
        {resumeData.email && (
          <div>
            <p className="font-semibold uppercase text-gray-400" style={{ fontSize: "10px" }}>Email</p>
            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
          </div>
        )}
        {resumeData.contactInformation && (
          <div>
            <p className="font-semibold uppercase text-gray-400" style={{ fontSize: "10px" }}>Phone</p>
            <a href={`tel:${resumeData.contactInformation}`}>{resumeData.contactInformation}</a>
          </div>
        )}
        {resumeData.socialMedia && resumeData.socialMedia.length > 0 && (
          <div>
            <p className="font-semibold uppercase text-gray-400" style={{ fontSize: "10px" }}>{resumeData.socialMedia[0].socialMedia}</p>
            <a href={`http://${resumeData.socialMedia[0].link}`} target="_blank" rel="noreferrer">
              {resumeData.socialMedia[0].link}
            </a>
          </div>
        )}
      </div>

      {/* Work Experience */}
      {resumeData.workExperience.length > 0 && (
        <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-3">
              <SectionTitle>Work History</SectionTitle>
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
                      className={`mb-2 pl-3 border-l-2 ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                          : ""
                      }`}
                      style={{ borderLeftColor: "var(--cv-primary)" }}
                    >
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold">{item.position}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`classic-work-date-${index}`}
                        />
                      </div>
                      <p className="text-xs text-gray-500 uppercase">{item.company}</p>
                      {item.description && (
                        <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                      )}
                      <Droppable
                        droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                        type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc ul-padding text-xs mt-0.5"
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
                                        className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
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

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-3">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, index) => (
            <div
              key={index}
              className="mb-1.5 pl-3 border-l-2"
              style={{ borderLeftColor: "var(--cv-primary)" }}
            >
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{item.degree}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`classic-edu-date-${index}`}
                />
              </div>
              <p className="text-xs text-gray-500 uppercase">{item.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <Droppable droppableId="projects" type="PROJECTS">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-3">
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
                      className={`mb-2 pl-3 border-l-2 ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                          : ""
                      }`}
                      style={{ borderLeftColor: "var(--cv-primary)" }}
                    >
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold">{item.name}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`classic-proj-date-${index}`}
                        />
                      </div>
                      {item.link && (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs"
                          style={{ color: "var(--cv-primary)" }}
                        >
                          {item.link}
                        </Link>
                      )}
                      {item.description && (
                        <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                      )}
                      <Droppable
                        droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                        type="PROJECTS_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc ul-padding text-xs mt-0.5"
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
                                        className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
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

      {/* Skills */}
      <Droppable droppableId="skills" type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="mb-3">
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
                      className={`mb-2 ${
                        snapshot.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                      }`}
                    >
                      <SectionTitle>{skillGroup.title}</SectionTitle>
                      <ul className="list-disc ul-padding text-xs">
                        {skillGroup.skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Draggable>
              ) : null
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-4">
        {resumeData.languages.length > 0 && (
          <div>
            <SectionTitle>Languages</SectionTitle>
            <p className="text-xs">{resumeData.languages.join(", ")}</p>
          </div>
        )}
        {resumeData.certifications.length > 0 && (
          <div>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="list-disc ul-padding text-xs">
              {resumeData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

const SectionTitle = ({ children }) => (
  <h2
    className="text-base font-bold mb-1"
    style={{ color: "var(--cv-primary)" }}
  >
    {children}
  </h2>
);

export default ClassicTemplate;
