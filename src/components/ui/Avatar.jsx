import React, { useEffect, useState } from "react";

const Avatar = ({ imgUrl }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadImage() {
      const imageModule = await import(
        /* @vite-ignore */ `../../${imgUrl.slice(1)}`
      );
      const url = imageModule.default;

      setImage(url);
    }
    loadImage();
  }, [imgUrl]);

  return image && <img src={image} class="team-avater" />;
};

export default Avatar;
