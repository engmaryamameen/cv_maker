import React, { useContext, useState } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
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
  const { resumeData } = useContext(ResumeContext);
  const [formClose, setFormClose] = useState(false);

  return (
    <>
      <Meta
        title="ATSResume | Get hired with an ATS-optimized resume"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
        keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
      />
      <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
        {!formClose && (
          <form className="p-4 bg-fuchsia-600 exclude-print md:max-w-[40%] md:h-screen md:overflow-y-scroll">
            <LoadUnload />
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
        <Preview />
      </div>
      <FormCP formClose={formClose} setFormClose={setFormClose} />
      <Print />
    </>
  );
}
