import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Personal Information</h2>
      <div className="grid-4">
        <div>
          <label className="field-label">Full Name</label>
          <input
            type="text"
            placeholder="Jane Smith"
            name="name"
            className="pi w-full"
            value={resumeData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="field-label">Job Title</label>
          <input
            type="text"
            placeholder="Full Stack Developer"
            name="position"
            className="pi w-full"
            value={resumeData.position}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="field-label">Phone</label>
          <input
            type="text"
            placeholder="+1-555-123-4567"
            name="contactInformation"
            className="pi w-full"
            value={resumeData.contactInformation}
            onChange={handleChange}
            minLength="10"
            maxLength="15"
          />
        </div>
        <div>
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="jane@example.com"
            name="email"
            className="pi w-full"
            value={resumeData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="field-label">Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            name="address"
            className="pi w-full"
            value={resumeData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="field-label">Profile Picture</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="profileInput w-full"
            onChange={handleProfilePicture}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
