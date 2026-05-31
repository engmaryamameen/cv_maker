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
      {/* Header with colored accent bar */}
      <div
        className="px-4 py-3 rounded-md mb-3"
        style={{ backgroundColor: "var(--cv-primary)" }}
      >
        <div className="flex items-center gap-4">
          {resumeData.profilePicture && resumeData.profilePicture.length > 0 && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
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
            <h1 className="text-xl font-bold text-white">{resumeData.name}</h1>
            <p className="text-sm text-white/80">{resumeData.position}</p>
          </div>
        </div>
      </div>

      {/* Contact row */}
      <div className="flex flex-wrap gap-3 mb-2 text-xs text-gray-600">
        {resumeData.contactInformation && (
          <a href={`tel:${resumeData.contactInformation}`} className="inline-flex items-center gap-1">
            <MdPhone className="text-gray-400" /> {resumeData.contactInformation}
          </a>
        )}
        {resumeData.email && (
          <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1">
            <MdEmail className="text-gray-400" /> {resumeData.email}
          </a>
        )}
        {resumeData.address && (
          <span className="inline-flex items-center gap-1">
            <MdLocationOn className="text-gray-400" /> {resumeData.address}
          </span>
        )}
        {resumeData.socialMedia && resumeData.socialMedia.map((item, index) => (
          <a
            key={index}
            href={`http://${item.link}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1"
            title={item.socialMedia}
          >
            {socialIcons.map((icon, i) => {
              if (icon.name === item.socialMedia.toLowerCase()) {
                return <span key={i} className="text-gray-400">{icon.icon}</span>;
              }
            })}
            {item.link}
          </a>
        ))}
      </div>

      <hr className="mb-3" style={{ borderColor: "var(--cv-section-border)" }} />

      {/* Two-column: main left, sidebar right */}
      <div className="grid grid-cols-3 gap-5">

        {/* Main content — left 2 cols */}
        <div className="col-span-2 space-y-3">

          {/* Summary */}
          {resumeData.summary && resumeData.summary.length > 0 && (
            <div>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-xs leading-relaxed">{resumeData.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {resumeData.workExperience.length > 0 && (
            <div>
              <SectionTitle>Experience</SectionTitle>
              {resumeData.workExperience.map((item, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold">{item.position}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`mod-work-date-${index}`}
                    />
                  </div>
                  <p className="text-xs" style={{ color: "var(--cv-primary)" }}>
                    {item.company}
                  </p>
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
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {resumeData.projects.map((item, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold">{item.name}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`mod-proj-date-${index}`}
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
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — right 1 col */}
        <div className="col-span-1 space-y-3">

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <SectionTitle>Skills</SectionTitle>
              {resumeData.skills.map(
                (skillGroup, index) =>
                  skillGroup.skills.length > 0 && (
                    <div key={index} className="mb-1.5">
                      <p className="text-xs font-semibold">{skillGroup.title}</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {skillGroup.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: "color-mix(in srgb, var(--cv-primary) 10%, transparent)",
                              color: "var(--cv-primary)",
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

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <SectionTitle>Education</SectionTitle>
              {resumeData.education.map((item, index) => (
                <div key={index} className="mb-1.5">
                  <p className="text-xs font-bold">{item.degree}</p>
                  <p className="text-xs text-gray-600">{item.school}</p>
                  <DateRange
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`mod-edu-date-${index}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {resumeData.languages.length > 0 && (
            <div>
              <SectionTitle>Languages</SectionTitle>
              <p className="text-xs">{resumeData.languages.join(", ")}</p>
            </div>
          )}

          {/* Certifications */}
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
      </div>
    </>
  );
};

const SectionTitle = ({ children }) => (
  <h2
    className="text-xs font-bold uppercase tracking-widest mb-1 pb-0.5 border-b"
    style={{ color: "var(--cv-primary)", borderColor: "var(--cv-section-border)" }}
  >
    {children}
  </h2>
);

export default ModernTemplate;
