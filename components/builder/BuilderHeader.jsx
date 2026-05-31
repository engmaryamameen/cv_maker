import React, { useContext } from "react";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { ResumeContext } from "../../context/ResumeContext";
import TemplateSelector from "./TemplateSelector";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";

const BuilderHeader = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setResumeData(data);
    };
    reader.readAsText(file);
  };

  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <header className="exclude-print bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-20">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Left — Load / Save */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-md cursor-pointer themed-btn">
            <FaCloudUploadAlt />
            Load Data
            <input
              aria-label="Load Data"
              type="file"
              className="hidden"
              onChange={handleLoad}
              accept=".json"
            />
          </label>
          <button
            aria-label="Save Data"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-md themed-btn"
            onClick={(event) =>
              handleDownload(
                resumeData,
                resumeData.name + " by ATSResume.json",
                event
              )
            }
          >
            <FaCloudDownloadAlt />
            Save Data
          </button>
        </div>

        {/* Center — Template Selector */}
        <TemplateSelector />

        {/* Right — Font + Theme */}
        <div className="flex items-center gap-3">
          <FontSelector />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;
