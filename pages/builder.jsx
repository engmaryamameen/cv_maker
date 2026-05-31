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
import dynamic from "next/dynamic";
import Certification from "../components/form/certification";
import { ResumeContext, ResumeProvider } from "../context/ResumeContext";
import { themes, DEFAULT_THEME } from "../components/templates/themes";

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

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
    <div style={{ "--cv-primary": theme.colors.primary }}>
      <Meta
        title="ATSResume | Get hired with an ATS-optimized resume"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes."
        keywords="ATS-friendly, Resume optimization, resume builder, free resume builder, resume maker"
      />
      <BuilderHeader />
      <div className="f-col gap-4 md:flex-row justify-evenly max-w-[1600px] md:mx-auto md:h-[calc(100vh-52px)] mt-2 pb-16">
        {!formClose && (
          <form className="p-4 bg-gray-100 exclude-print md:max-w-[40%] md:h-full md:overflow-y-scroll">
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
          </form>
        )}
        <PreviewPanel />
      </div>
      <FormCP formClose={formClose} setFormClose={setFormClose} />
      <Print />
    </div>
  );
}
