import image1 from "../images/avatars/akash.png";
import image2 from "../images/avatars/almas.png";
import image4 from "../images/avatars/ferdous.png";
import image5 from "../images/avatars/riyadh.png";
import image3 from "../images/avatars/sadh.png";
import image6 from "../images/avatars/salahuddin.png";
import image7 from "../images/avatars/sumit.png";

export const loadImage = (imageUrl) => {
  switch (imageUrl) {
    case "/images/avatars/akash.png":
      return image1;
    case "/images/avatars/almas.png":
      return image2;
    case "/images/avatars/sadh.png":
      return image3;
    case "/images/avatars/ferdous.png":
      return image4;
    case "/images/avatars/riyadh.png":
      return image5;
    case "/images/avatars/salahuddin.png":
      return image6;
    case "/images/avatars/sumit.png":
      return image7;
  }
};
