import FormButton from "./FormButton";
import MonthYearPicker from "./MonthYearPicker";
import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="f-col border border-gray-200 rounded-lg p-3 bg-gray-50/50">
          <label className="field-label">Project Name</label>
          <input
            type="text"
            placeholder="TaskForge"
            name="name"
            className="w-full other-input"
            value={project.name}
            onChange={(e) => handleProjects(e, index)}
          />
          <label className="field-label">Link</label>
          <input
            type="text"
            placeholder="github.com/username/project"
            name="link"
            className="w-full other-input"
            value={project.link}
            onChange={(e) => handleProjects(e, index)}
          />
          <label className="field-label">Description</label>
          <textarea
            placeholder="Brief project description..."
            name="description"
            className="w-full other-input h-20"
            value={project.description}
            maxLength="250"
            onChange={(e) => handleProjects(e, index)}
          />
          <label className="field-label">Key Achievements (one per line)</label>
          <textarea
            placeholder="Built task creation and status tracking..."
            name="keyAchievements"
            className="w-full other-input h-32"
            value={project.keyAchievements}
            onChange={(e) => handleProjects(e, index)}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <MonthYearPicker
                label="Start Date"
                name="startYear"
                value={project.startYear}
                onChange={(e) => handleProjects(e, index)}
              />
            </div>
            <div className="flex-1">
              <MonthYearPicker
                label="End Date"
                name="endYear"
                value={project.endYear}
                onChange={(e) => handleProjects(e, index)}
                showPresent
              />
            </div>
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.projects.length}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
