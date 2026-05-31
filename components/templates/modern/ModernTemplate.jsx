import React from "react";
import Image from "next/image";
import Link from "next/link";
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

const socialIcons = [
  { name: "github", icon: <FaGithub /> },
  { name: "linkedin", icon: <FaLinkedin /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "facebook", icon: <FaFacebook /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "website", icon: <CgWebsite /> },
];

const ModernTemplate = ({ resumeData }) => {
  return (
    <>
      {/* Header */}
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
            <h1 className="text-2xl font-bold">{resumeData.name}</h1>
            <p className="text-sm font-medium" style={{ color: "var(--cv-primary)" }}>
              {resumeData.position}
            </p>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 mt-2 text-xs">
          {resumeData.contactInformation && (
            <a href={`tel:${resumeData.contactInformation}`} className="inline-flex items-center gap-1">
              <span className="font-semibold" style={{ color: "var(--cv-primary)" }}>Phone</span> {resumeData.contactInformation}
            </a>
          )}
          {resumeData.socialMedia && resumeData.socialMedia.map((item, index) => (
            <a
              key={index}
              href={`http://${item.link}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              <span className="font-semibold" style={{ color: "var(--cv-primary)" }}>{item.socialMedia}</span> {item.link}
            </a>
          ))}
          {resumeData.email && (
            <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1">
              <span className="font-semibold" style={{ color: "var(--cv-primary)" }}>E-mail</span> {resumeData.email}
            </a>
          )}
          {resumeData.address && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold" style={{ color: "var(--cv-primary)" }}>Location</span> {resumeData.address}
            </span>
          )}
        </div>
      </div>

      <hr style={{ borderColor: "var(--cv-section-border)" }} />

      {/* Summary */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="my-2">
          <p className="text-xs leading-relaxed text-gray-700">{resumeData.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.workExperience.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Experience</SectionTitle>
          {resumeData.workExperience.map((item, index) => (
            <div key={index} className="grid grid-cols-[90px_1fr] gap-x-3 mb-2">
              <div className="text-xs text-gray-500 pt-0.5">
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-work-date-${index}`}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{item.position}</p>
                <p className="text-xs text-gray-500">{item.company}</p>
                {item.description && (
                  <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                )}
                {typeof item.keyAchievements === "string" &&
                  item.keyAchievements.length > 0 && (
                    <ul className="list-disc ul-padding text-xs mt-0.5">
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

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, index) => (
            <div key={index} className="grid grid-cols-[90px_1fr] gap-x-3 mb-1">
              <div className="text-xs text-gray-500 pt-0.5">
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-edu-date-${index}`}
                />
              </div>
              <div>
                <p className="text-xs font-bold">{item.degree}, {item.school}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((item, index) => (
            <div key={index} className="grid grid-cols-[90px_1fr] gap-x-3 mb-2">
              <div className="text-xs text-gray-500 pt-0.5">
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`mod-proj-date-${index}`}
                />
              </div>
              <div>
                <p className="text-xs font-bold">{item.name}</p>
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
                {typeof item.keyAchievements === "string" &&
                  item.keyAchievements.length > 0 && (
                    <ul className="list-disc ul-padding text-xs mt-0.5">
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

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-2">
          <SectionTitle>Skills</SectionTitle>
          {resumeData.skills.map(
            (skillGroup, index) =>
              skillGroup.skills.length > 0 && (
                <p key={index} className="text-xs mb-0.5">
                  <span className="font-bold">{skillGroup.title}</span> — {skillGroup.skills.join(", ")}
                </p>
              )
          )}
        </div>
      )}

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

export default ModernTemplate;
