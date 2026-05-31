import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { themes } from "../templates/themes";

const ThemeSelector = () => {
  const { activeTheme, setActiveTheme } = useContext(ResumeContext);

  return (
    <div className="flex items-center gap-1.5">
      {Object.entries(themes).map(([id, theme]) => (
        <button
          key={id}
          onClick={() => setActiveTheme(id)}
          title={theme.name}
          className={`w-5 h-5 rounded-full border-2 transition-transform ${
            activeTheme === id
              ? "border-gray-800 scale-125"
              : "border-gray-300 hover:scale-110"
          }`}
          style={{ backgroundColor: theme.colors.primary }}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
