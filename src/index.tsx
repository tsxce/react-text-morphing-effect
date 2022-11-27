import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MorphType } from "./type";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 80pt;
  top: 0;
  bottom: 0;
  filter: url(#threshold) blur(0.6px);
`;

const Mtext = styled.span`
  color: white;
  position: absolute;
  left: 50px;
  width: 100%;
  font-size: 80pt;

  text-align: center;

  user-select: none;
  font-weight: bold;
  filter: blur(
    ${(props: { f: number }) =>
      props.f > 0 ? Math.min(8 / props.f - 8, 100) : 100}px
  );
  opacity: ${(props: { f: number }) =>
    Math.pow(props.f > 0 ? props.f : 1, 0.4) * 100}%;
`;

const morphTime = 1;
const cooldownTime = 0.25;
let cooldown = cooldownTime;
let time = new Date();
let morph = 0;

const useAnimation = (callback: any) => {
  const reqIdRef = useRef(0);

  const loop = useCallback(() => {
    reqIdRef.current = requestAnimationFrame(loop);
    const newTime = new Date();
    const dt = (newTime.getTime() - time.getTime()) / 1000;
    time = newTime;
    cooldown -= dt;
    morph -= cooldown;
    cooldown = 0;
    const fraction = morph / morphTime;
    callback(fraction);
  }, [callback]);

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [loop]);
};

const Morph = ({ word1, word2, handleIndex }: MorphType) => {
  const [fraction, setFraction] = useState(0);

  const handleFraction = (f: number) => {
    if (f < 1) {
      setFraction(f);
    } else {
      setFraction(0);
      handleIndex();
      morph = 0;
      cooldown = cooldownTime;
    }
  };

  useAnimation(handleFraction);

  return (
    <div>
      <Container>
        <Mtext f={1 - fraction}>{word1}</Mtext>
        <Mtext f={fraction}>{word2}</Mtext>
      </Container>
      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                                      0 1 0 0 0
                                      0 0 1 0 0
                                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Morph;
