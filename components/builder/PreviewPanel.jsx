import React, { useContext } from "react";
import {
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUnderline,
} from "react-icons/fa";
import { ResumeContext } from "../../context/ResumeContext";
import { A4Wrapper } from "../templates/shared";
import { HighlightMenu } from "react-highlight-menu";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { templates, DEFAULT_TEMPLATE } from "../templates/registry";
import { themes, DEFAULT_THEME, getThemeCSSVariables } from "../templates/themes";
import TemplateSelector from "./TemplateSelector";
import ThemeSelector from "./ThemeSelector";
import dynamic from "next/dynamic";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

const MenuButton = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 hover:bg-gray-200 rounded font-semibold"
  >
    {icon}
  </button>
);

const PreviewPanel = () => {
  const { resumeData, setResumeData, activeTemplate, activeTheme } = useContext(ResumeContext);
  const entry = templates[activeTemplate] || templates[DEFAULT_TEMPLATE];
  const TemplateComponent = entry.component;
  const theme = themes[activeTheme] || themes[DEFAULT_THEME];
  const themeVars = getThemeCSSVariables(theme);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const toggleBold = () => formatText("bold");
  const toggleItalic = () => formatText("italic");
  const toggleUnderline = () => formatText("underline");
  const changeFontSize = (size) => formatText("fontSize", size);
  const alignText = (alignment) => formatText(`justify${alignment}`);

  useKeyboardShortcut("b", true, toggleBold);
  useKeyboardShortcut("i", true, toggleItalic);
  useKeyboardShortcut("u", true, toggleUnderline);

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen" style={themeVars}>
      <div className="flex items-center justify-between mb-3 exclude-print">
        <TemplateSelector />
        <ThemeSelector />
      </div>
      <A4Wrapper>
        <HighlightMenu
          styles={{
            borderColor: "#374151",
            backgroundColor: "#374151",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            borderRadius: "5px",
            padding: "3px",
          }}
          allowedPlacements={["top", "bottom"]}
          offset={8}
          target=".preview"
          menu={() => (
            <>
              <MenuButton
                title="Bold (Ctrl+B)"
                icon={<FaBold />}
                onClick={toggleBold}
              />
              <MenuButton
                title="Italic (Ctrl+I)"
                icon={<FaItalic />}
                onClick={toggleItalic}
              />
              <MenuButton
                title="Underline (Ctrl+U)"
                icon={<FaUnderline />}
                onClick={toggleUnderline}
              />
              <MenuButton
                title="Increase Font Size"
                icon={<FaPlus />}
                onClick={() => changeFontSize(4)}
              />
              <MenuButton
                title="Decrease Font Size"
                icon={<FaMinus />}
                onClick={() => changeFontSize(2)}
              />
              <MenuButton
                title="Align Left"
                icon={<FaAlignLeft />}
                onClick={() => alignText("Left")}
              />
              <MenuButton
                title="Align Center"
                icon={<FaAlignCenter />}
                onClick={() => alignText("Center")}
              />
              <MenuButton
                title="Align Right"
                icon={<FaAlignRight />}
                onClick={() => alignText("Right")}
              />
            </>
          )}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <TemplateComponent resumeData={resumeData} />
        </DragDropContext>
      </A4Wrapper>
    </div>
  );
};

export default PreviewPanel;
