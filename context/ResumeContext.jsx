import React, { createContext, useState } from "react";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import { DEFAULT_TEMPLATE } from "../components/templates/registry";
import { DEFAULT_THEME } from "../components/templates/themes";
import { DEFAULT_FONT } from "../components/templates/fonts";

const ResumeContext = createContext(DefaultResumeData);

function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [activeTemplate, setActiveTemplate] = useState(DEFAULT_TEMPLATE);
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [activeFont, setActiveFont] = useState(DEFAULT_FONT);

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        handleProfilePicture,
        handleChange,
        activeTemplate,
        setActiveTemplate,
        activeTheme,
        setActiveTheme,
        activeFont,
        setActiveFont,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export { ResumeContext, ResumeProvider };
