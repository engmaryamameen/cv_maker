import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { templates } from "../templates/registry";

const TemplateSelector = () => {
  const { activeTemplate, setActiveTemplate } = useContext(ResumeContext);

  return (
    <div className="flex gap-2 mb-3 exclude-print">
      {Object.entries(templates).map(([id, template]) => (
        <button
          key={id}
          onClick={() => setActiveTemplate(id)}
          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
            activeTemplate === id
              ? "bg-fuchsia-600 text-white border-fuchsia-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-fuchsia-400"
          }`}
        >
          {template.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
