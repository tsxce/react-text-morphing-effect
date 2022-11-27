import React, { useState } from "react";
import Morphing from "./components/Morphing";
import { MorphPropsType } from "./type";

const Morph = ({ array }: MorphPropsType) => {
  const [index, setindex] = useState(0);
  const handleIndex = () => {
    if (index < array.length - 1) {
      setindex(index + 1);
    } else {
      setindex(0);
    }
  };
  return (
    <Morphing
      word1={array[index]}
      word2={array[index + 1]}
      handleIndex={handleIndex}
    />
  );
};

export default Morph;
