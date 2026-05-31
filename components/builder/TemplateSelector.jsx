import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { templates } from "../templates/registry";

const TemplateSelector = () => {
  const { activeTemplate, setActiveTemplate } = useContext(ResumeContext);

  return (
    <div className="flex gap-2">
      {Object.entries(templates).map(([id, template]) => (
        <button
          key={id}
          onClick={() => setActiveTemplate(id)}
          className={`flex flex-col items-start px-3 py-2 rounded-lg border-2 transition-colors text-left ${
            activeTemplate === id
              ? "border-fuchsia-600 bg-fuchsia-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <span className={`text-sm font-semibold ${
            activeTemplate === id ? "text-fuchsia-700" : "text-gray-800"
          }`}>
            {template.name}
          </span>
          <span className="text-xs text-gray-500">{template.description}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
