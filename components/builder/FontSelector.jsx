import React, { useContext, useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ResumeContext } from "../../context/ResumeContext";
import { fonts } from "../templates/fonts";

const FontSelector = () => {
  const { activeFont, setActiveFont } = useContext(ResumeContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const activeEntry = fonts.find((f) => f.id === activeFont) || fonts[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
        style={{ fontFamily: activeEntry.family, minWidth: "130px" }}
      >
        <span className="flex-1 text-left">{activeEntry.name}</span>
        <FaChevronDown size={10} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 overflow-y-auto" style={{ width: "170px", maxHeight: "260px" }}>
          {fonts.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => {
                setActiveFont(font.id);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                activeFont === font.id
                  ? "font-semibold text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                fontFamily: font.family,
                ...(activeFont === font.id
                  ? { backgroundColor: "var(--cv-primary)" }
                  : {}),
              }}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSelector;
