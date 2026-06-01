import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { templates } from "../templates/registry";
import { themes, DEFAULT_THEME } from "../templates/themes";

const TemplateSelector = () => {
  const { activeTemplate, setActiveTemplate, activeTheme } = useContext(ResumeContext);
  const theme = themes[activeTheme] || themes[DEFAULT_THEME];

  return (
    <div className="flex gap-1.5">
      {Object.entries(templates).map(([id, template]) => (
        <button
          key={id}
          onClick={() => setActiveTemplate(id)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            activeTemplate === id
              ? "text-white"
              : "text-gray-600 bg-gray-100 hover:bg-gray-200"
          }`}
          style={
            activeTemplate === id
              ? { backgroundColor: theme.colors.primary }
              : undefined
          }
        >
          {template.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
