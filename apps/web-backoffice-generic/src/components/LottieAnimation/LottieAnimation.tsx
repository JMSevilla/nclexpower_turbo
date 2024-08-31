import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: any;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export function LottieAnimation({
  animationData,
  width = 300,
  height = 300,
  style = {},
}: LottieAnimationProps) {
  return (
    <Lottie animationData={animationData} style={{ width, height, ...style }} />
  );
}
