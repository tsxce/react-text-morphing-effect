import React, { useState } from "react";
import Morph from "../index";

const array = ["", "Shinjuku", "Shinjuku yuyuan", "Ueno", "Asakusa"];

export const Morphing = () => {
  const [index, setindex] = useState(0);
  const handleIndex = () => {
    if (index < array.length - 1) {
      setindex(index + 1);
    } else {
      setindex(0);
    }
  };
  return <Morph array={array} />;
};
