import React from "react";
import Avatar from "../ui/Avatar";

const Member = ({ member }) => {
  const { name, avatar, id } = member;

  return (
    <div class="mt-3 space-y-4">
      <div class="checkbox-container">
        <Avatar imgUrl={avatar} />
        <p class="label">{name}</p>
      </div>
    </div>
  );
};

export default Member;
