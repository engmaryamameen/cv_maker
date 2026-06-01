import React, { useContext } from "react";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";
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
    <header className="exclude-print bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-[1600px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left — Template */}
          <div>
            <Label>Template</Label>
            <TemplateSelector />
          </div>

          {/* Center — Theme + Font */}
          <div className="flex items-center gap-6">
            <div>
              <Label>Theme</Label>
              <ThemeSelector />
            </div>
            <div>
              <Label>Font</Label>
              <FontSelector />
            </div>
          </div>

          {/* Right — File actions */}
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md cursor-pointer bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <FaCloudUploadAlt />
              Load
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={(event) =>
                handleDownload(
                  resumeData,
                  resumeData.name + " by ATSResume.json",
                  event
                )
              }
            >
              <FaCloudDownloadAlt />
              Save
            </button>
            <button
              aria-label="Export PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-md themed-btn transition-colors"
              onClick={() => window.print()}
            >
              <MdPictureAsPdf />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Label = ({ children }) => (
  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
    {children}
  </p>
);

export default BuilderHeader;
