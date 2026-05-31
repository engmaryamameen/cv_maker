import React from "react";
import DateRange from "../../utility/DateRange";

const EducationSection = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="mb-1">
      <h2 className="section-title mb-1 border-b-2 border-gray-300">
        Education
      </h2>
      {education.map((item, index) => (
        <div key={index} className="mb-1">
          <p className="content i-bold">{item.degree}</p>
          <p className="content">{item.school}</p>
          <DateRange
            startYear={item.startYear}
            endYear={item.endYear}
            id={`education-start-end-date`}
          />
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
