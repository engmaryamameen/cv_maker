import React from "react";
import Image from "next/image";
import Link from "next/link";
import DateRange from "../../utility/DateRange";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const MinimalTemplate = ({ resumeData }) => {
  return (
    <>
      {/* Header — left-aligned, compact */}
      <div className="mb-2">
        <div className="flex items-center gap-4">
          {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
            <div
              className="w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0"
              style={{ borderColor: "var(--cv-primary)" }}
            >
              <Image
                src={resumeData.profilePicture}
                alt="profile"
                width={64}
                height={64}
                className="object-cover h-full w-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">{resumeData.name}</h1>
            <p className="text-sm text-gray-600">{resumeData.position}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
          {resumeData.contactInformation && (
            <a href={`tel:${resumeData.contactInformation}`} className="inline-flex items-center gap-1">
              <MdPhone /> {resumeData.contactInformation}
            </a>
          )}
          {resumeData.email && (
            <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1">
              <MdEmail /> {resumeData.email}
            </a>
          )}
          {resumeData.address && (
            <span className="inline-flex items-center gap-1">
              <MdLocationOn /> {resumeData.address}
            </span>
          )}
        </div>
      </div>

      <hr className="my-2" style={{ borderColor: "var(--cv-section-border)" }} />

      {/* Summary */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--cv-primary)" }}
          >
            Summary
          </h2>
          <p className="text-xs leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.workExperience.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--cv-primary)" }}
          >
            Work Experience
          </h2>
          {resumeData.workExperience.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-bold">{item.company}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-work-date-${index}`}
                />
              </div>
              <p className="text-xs italic text-gray-600">{item.position}</p>
              {item.description && (
                <p className="text-xs mt-0.5">{item.description}</p>
              )}
              {typeof item.keyAchievements === "string" &&
                item.keyAchievements.length > 0 && (
                  <ul className="list-disc ul-padding text-xs mt-0.5">
                    {item.keyAchievements.split("\n").map((achievement, i) => (
                      <li key={i}>
                        <div dangerouslySetInnerHTML={{ __html: achievement }} />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--cv-primary)" }}
          >
            Education
          </h2>
          {resumeData.education.map((item, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-bold">{item.degree}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-edu-date-${index}`}
                />
              </div>
              <p className="text-xs text-gray-600">{item.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--cv-primary)" }}
          >
            Projects
          </h2>
          {resumeData.projects.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-bold">{item.name}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`min-proj-date-${index}`}
                />
              </div>
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600"
                >
                  {item.link}
                </Link>
              )}
              {item.description && (
                <p className="text-xs mt-0.5">{item.description}</p>
              )}
              {typeof item.keyAchievements === "string" &&
                item.keyAchievements.length > 0 && (
                  <ul className="list-disc ul-padding text-xs mt-0.5">
                    {item.keyAchievements.split("\n").map((achievement, i) => (
                      <li key={i}>
                        <div dangerouslySetInnerHTML={{ __html: achievement }} />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--cv-primary)" }}
          >
            Skills
          </h2>
          {resumeData.skills.map(
            (skillGroup, index) =>
              skillGroup.skills.length > 0 && (
                <div key={index} className="mb-1">
                  <p className="text-xs">
                    <span className="font-bold">{skillGroup.title}: </span>
                    {skillGroup.skills.join(", ")}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Languages & Certifications — side by side */}
      <div className="grid grid-cols-2 gap-4">
        {resumeData.languages.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-1"
              style={{ color: "var(--cv-primary)" }}
            >
              Languages
            </h2>
            <p className="text-xs">{resumeData.languages.join(", ")}</p>
          </div>
        )}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-1"
              style={{ color: "var(--cv-primary)" }}
            >
              Certifications
            </h2>
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

export default MinimalTemplate;
