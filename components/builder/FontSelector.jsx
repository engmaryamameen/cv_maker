import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { fonts } from "../templates/fonts";

const FontSelector = () => {
  const { activeFont, setActiveFont } = useContext(ResumeContext);

  return (
    <select
      value={activeFont}
      onChange={(e) => setActiveFont(e.target.value)}
      className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-700 cursor-pointer focus:outline-none focus:border-gray-400"
      style={{ fontFamily: fonts.find((f) => f.id === activeFont)?.family }}
    >
      {fonts.map((font) => (
        <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
          {font.name}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
