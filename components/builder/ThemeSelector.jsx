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
          className="rounded-full transition-all"
          style={{
            width: activeTheme === id ? "22px" : "18px",
            height: activeTheme === id ? "22px" : "18px",
            backgroundColor: theme.colors.primary,
            border: activeTheme === id
              ? "2.5px solid #1f2937"
              : "2px solid #e5e7eb",
          }}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
