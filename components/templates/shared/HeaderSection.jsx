import React from "react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import ContactInfo from "../../preview/ContactInfo";

const socialIcons = [
  { name: "github", icon: <FaGithub /> },
  { name: "linkedin", icon: <FaLinkedin /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "facebook", icon: <FaFacebook /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "website", icon: <CgWebsite /> },
];

const HeaderSection = ({
  name,
  position,
  profilePicture,
  contactInformation,
  email,
  address,
  socialMedia,
}) => {
  return (
    <div className="f-col items-center mb-1">
      {profilePicture && profilePicture.length > 0 && (
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-fuchsia-700">
          <Image
            src={profilePicture}
            alt="profile"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        </div>
      )}
      <h1 className="name">{name}</h1>
      <p className="profession">{position}</p>
      <ContactInfo
        mainclass="flex flex-row gap-1 mb-1 contact"
        linkclass="inline-flex items-center gap-1"
        teldata={contactInformation}
        emaildata={email}
        addressdata={address}
        telicon={<MdPhone />}
        emailicon={<MdEmail />}
        addressicon={<MdLocationOn />}
      />
      {socialMedia && socialMedia.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          {socialMedia.map((item, index) => (
            <a
              href={`http://${item.link}`}
              aria-label={item.socialMedia}
              key={index}
              title={item.socialMedia}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 social-media align-center justify-center"
            >
              {socialIcons.map((icon, iconIndex) => {
                if (icon.name === item.socialMedia.toLowerCase()) {
                  return <span key={iconIndex}>{icon.icon}</span>;
                }
              })}
              {item.link}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSection;
