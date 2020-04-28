import React from "react";

import { UncontrolledCarousel } from "reactstrap";

import Img1 from "../Assets/Serengeti-Pioneer-Camp-696x409.jpg";
import Img2 from "../Assets/did_you_know_eiffel_tower.jpg";
import Img3 from "../Assets/boats-river-nile-aswan-egypt-1920x1080.jpg";
import Img4 from "../Assets/boats-river-nile-aswan-egypt-1920x1080.jpg";
import Img5 from "../Assets/asie_-_vietnam_-_2020-714x489.jpg";
import Img6 from "../Assets/best-palawan-guide-travel-to-el-nido-coron-puerto-princesa-1.jpg";
import Img7 from "../Assets/GOPR3503.jpg";
import Img8 from "../Assets/kayangan-lake-coron-island-palawan-philippines-shutterstock_1404164243-1024x683.jpg";
import Img9 from "../Assets/Philippines-Back-view-of-the-young-woman-in-straw-hat-relaxing-on-the-boat-and-looking-forward-into-lagoon.-Travelling-tour-in-Asia-1000x667.jpg";
// import Img5 from "../Assets/fond-transparent-png-3.png";

const items = [
  {
    src: Img1,
    altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: Img2,
    altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: Img3,
    altText: "Slide 3",
    // caption: "Slide 3",
  },
  {
    src: Img4,
    altText: "Slide 4",
    // caption: "Slide 3",
  },
  {
    src: Img5,
    altText: "Slide 5",
    // caption: "Slide 3",
  },
  {
    src: Img6,
    altText: "Slide 6",
    // caption: "Slide 3",
  },
  {
    src: Img7,
    altText: "Slide 7",
    // caption: "Slide 3",
  },
  {
    src: Img8,
    altText: "Slide 8",
    // caption: "Slide 3",
  },
  {
    src: Img9,
    altText: "Slide 9",
    // caption: "Slide 3",
  },
];

const shuffle = (a: Object[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export interface CarouselProps {}

const MyCarousel = () => (
  <UncontrolledCarousel controls={false} indicators={false} items={shuffle(items)} />
);

export default MyCarousel;
