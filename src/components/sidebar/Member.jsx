import React from "react";
import { loadImage } from "../../utils/loadImage";

const Member = ({ member }) => {
  const { name, avatar, id } = member;

  return (
    <div class="mt-3 space-y-4">
      <div class="checkbox-container">
        <img src={loadImage(avatar)} class="team-avater" />
        <p class="label">{name}</p>
      </div>
    </div>
  );
};

export default Member;
