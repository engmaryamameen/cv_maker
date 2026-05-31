import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import DateRange from "../../utility/DateRange";
import Skills from "../../preview/Skills";
import {
  HeaderSection,
  SummarySection,
  EducationSection,
  LanguagesSection,
  CertificationsSection,
} from "../shared";

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
    <>
      <HeaderSection
        name={resumeData.name}
        position={resumeData.position}
        profilePicture={resumeData.profilePicture}
        contactInformation={resumeData.contactInformation}
        email={resumeData.email}
        address={resumeData.address}
        socialMedia={resumeData.socialMedia}
      />
      <hr className="border-dashed my-2" />
      {/* two column layout */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
          <SummarySection summary={resumeData.summary} />
          <div>
            <EducationSection education={resumeData.education} />
          </div>
          <Droppable droppableId="skills" type="SKILLS">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {resumeData.skills.map((skill, index) => (
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
                        className={`mb-1 ${
                          snapshot.isDragging &&
                          "outline-dashed outline-2 outline-gray-400 bg-white"
                        }`}
                      >
                        <Skills title={skill.title} skills={skill.skills} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <LanguagesSection languages={resumeData.languages} />
          <CertificationsSection certifications={resumeData.certifications} />
        </div>

        <div className="col-span-2 space-y-2">
          {resumeData.workExperience.length > 0 && (
            <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h2
                    className="section-title mb-1 border-b-2 editable"
                    style={{ borderColor: "var(--cv-section-border)" }}
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Work Experience
                  </h2>
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
                          className={`mb-1 ${
                            snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                          }`}
                        >
                          <div className="flex flex-row justify-between space-y-1">
                            <p className="content i-bold">{item.company}</p>
                            <DateRange
                              startYear={item.startYear}
                              endYear={item.endYear}
                              id={`work-experience-start-end-date`}
                            />
                          </div>
                          <p className="content">{item.position}</p>
                          <p className="content hyphens-auto">
                            {item.description}
                          </p>
                          <Droppable
                            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                          >
                            {(provided) => (
                              <ul
                                className="list-disc ul-padding content"
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
          {resumeData.projects.length > 0 && (
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h2
                    className="section-title mb-1 border-b-2 editable"
                    style={{ borderColor: "var(--cv-section-border)" }}
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Projects
                  </h2>
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
                          className={`mb-1 ${
                            snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                          }`}
                        >
                          <div className="flex flex-row justify-between space-y-1">
                            <p className="content i-bold">{item.name}</p>
                            <DateRange
                              startYear={item.startYear}
                              endYear={item.endYear}
                              id={`work-experience-start-end-date`}
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
                          <Droppable
                            droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                            type="PROJECTS_KEY_ACHIEVEMENT"
                          >
                            {(provided) => (
                              <ul
                                className="list-disc ul-padding content"
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
        </div>
      </div>
    </>
  );
};

export default ClassicTemplate;
