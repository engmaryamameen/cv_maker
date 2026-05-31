import React, { createContext, useState } from "react";
import DefaultResumeData from "../components/utility/DefaultResumeData";

const ResumeContext = createContext(DefaultResumeData);

function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);

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
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export { ResumeContext, ResumeProvider };
