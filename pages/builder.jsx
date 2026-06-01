import React, { useContext, useState, useEffect } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import BuilderHeader from "../components/builder/BuilderHeader";
import PreviewPanel from "../components/builder/PreviewPanel";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import { ResumeContext, ResumeProvider } from "../context/ResumeContext";
import { themes, DEFAULT_THEME } from "../components/templates/themes";

export default function Builder(props) {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}

function BuilderContent() {
  const { resumeData, activeTheme } = useContext(ResumeContext);
  const [formClose, setFormClose] = useState(false);
  const theme = themes[activeTheme] || themes[DEFAULT_THEME];

  useEffect(() => {
    document.documentElement.style.setProperty("--cv-primary", theme.colors.primary);
  }, [theme.colors.primary]);

  return (
    <div className="min-h-screen bg-gray-50" style={{ "--cv-primary": theme.colors.primary }}>
      <Meta
        title="CV Maker | Build your professional resume"
        description="Create a professional, ATS-friendly resume in minutes with multiple templates, themes, and fonts."
        keywords="resume builder, CV maker, ATS resume, free resume builder, professional resume templates"
      />
      <BuilderHeader />
      <div className="flex gap-0 max-w-[1600px] mx-auto" style={{ height: "calc(100vh - 58px)" }}>
        {!formClose && (
          <form className="w-[500px] flex-shrink-0 exclude-print bg-white border-r border-gray-200 overflow-y-auto p-4 space-y-1">
            <PersonalInformation />
            <SocialMedia />
            <Summary />
            <Education />
            <WorkExperience />
            <Projects />
            {resumeData.skills.map((skill, index) => (
              <Skill title={skill.title} key={index} />
            ))}
            <Language />
            <Certification />
            <div className="h-16" />
          </form>
        )}
        <div className="flex-1 min-w-0">
          <PreviewPanel />
        </div>
      </div>
      <FormCP formClose={formClose} setFormClose={setFormClose} />
    </div>
  );
}
