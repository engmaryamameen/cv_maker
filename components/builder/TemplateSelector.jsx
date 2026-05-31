import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { templates } from "../templates/registry";
import { themes, DEFAULT_THEME } from "../templates/themes";

const TemplateSelector = () => {
  const { activeTemplate, setActiveTemplate, activeTheme } = useContext(ResumeContext);
  const theme = themes[activeTheme] || themes[DEFAULT_THEME];

  return (
    <div className="flex gap-2">
      {Object.entries(templates).map(([id, template]) => (
        <button
          key={id}
          onClick={() => setActiveTemplate(id)}
          className={`flex flex-col items-start px-3 py-2 rounded-lg border-2 transition-colors text-left ${
            activeTemplate === id ? "" : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          style={
            activeTemplate === id
              ? {
                  borderColor: theme.colors.primary,
                  backgroundColor: `color-mix(in srgb, ${theme.colors.primary} 8%, white)`,
                }
              : undefined
          }
        >
          <span
            className={`text-sm font-semibold ${activeTemplate !== id ? "text-gray-800" : ""}`}
            style={activeTemplate === id ? { color: theme.colors.primary } : undefined}
          >
            {template.name}
          </span>
          <span className="text-xs text-gray-500">{template.description}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
