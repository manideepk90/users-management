import React from "react";
import { profileImage } from "../../assets/images";

function ProfileImage({ src = profileImage }) {
  return (
    <img
      src={src}
      alt="user"
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        border: "2px solid #000",
        overflow: "hidden",
      }}
    />
  );
}

export default ProfileImage;
