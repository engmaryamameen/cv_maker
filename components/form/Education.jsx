import FormButton from "./FormButton";
import MonthYearPicker from "./MonthYearPicker";
import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };

    const addEducation = () => {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          { school: "", degree: "", startYear: "", endYear: "" },
        ],
      });
    };

    const removeEducation = (index) => {
      const newEducation = [...resumeData.education];
      newEducation[index] = newEducation[newEducation.length - 1];
      newEducation.pop();
      setResumeData({ ...resumeData, education: newEducation });
    };

    return (
      <div className="flex-col-gap-2">
        <h2 className="input-title">Education</h2>
        {resumeData.education.map((education, index) => (
          <div key={index} className="f-col border border-gray-200 rounded-lg p-3 bg-gray-50/50">
            <label className="field-label">Degree</label>
            <input
              type="text"
              placeholder="Bachelor of Computer Science"
              name="degree"
              className="w-full other-input"
              value={education.degree}
              onChange={(e) => handleEducation(e, index)} />
            <label className="field-label">School / University</label>
            <input
              type="text"
              placeholder="State University of Technology"
              name="school"
              className="w-full other-input"
              value={education.school}
              onChange={(e) => handleEducation(e, index)} />
            <div className="flex gap-2">
              <div className="flex-1">
                <MonthYearPicker
                  label="Start Date"
                  name="startYear"
                  value={education.startYear}
                  onChange={(e) => handleEducation(e, index)}
                />
              </div>
              <div className="flex-1">
                <MonthYearPicker
                  label="End Date"
                  name="endYear"
                  value={education.endYear}
                  onChange={(e) => handleEducation(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
        <FormButton size={resumeData.education.length} add={addEducation} remove={removeEducation} />
      </div>
    )
  }

export default Education;
