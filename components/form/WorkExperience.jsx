import FormButton from "./FormButton";
import MonthYearPicker from "./MonthYearPicker";
import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const WorkExperience = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  const handleWorkExperience = (e, index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index] = newworkExperience[newworkExperience.length - 1];
    newworkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Work Experience</h2>
      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="f-col border border-gray-200 rounded-lg p-3 bg-gray-50/50">
          <label className="field-label">Company</label>
          <input
            type="text"
            placeholder="Acme Technologies"
            name="company"
            className="w-full other-input"
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="field-label">Job Title</label>
          <input
            type="text"
            placeholder="Full Stack Developer"
            name="position"
            className="w-full other-input"
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="field-label">Description</label>
          <textarea
            placeholder="Brief role description..."
            name="description"
            className="w-full other-input h-20"
            value={workExperience.description}
            maxLength="250"
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="field-label">Key Achievements (one per line)</label>
          <textarea
            placeholder="Developed and maintained 5+ web applications..."
            name="keyAchievements"
            className="w-full other-input h-32"
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <MonthYearPicker
                label="Start Date"
                name="startYear"
                value={workExperience.startYear}
                onChange={(e) => handleWorkExperience(e, index)}
              />
            </div>
            <div className="flex-1">
              <MonthYearPicker
                label="End Date"
                name="endYear"
                value={workExperience.endYear}
                onChange={(e) => handleWorkExperience(e, index)}
              />
            </div>
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  );
};

export default WorkExperience;
