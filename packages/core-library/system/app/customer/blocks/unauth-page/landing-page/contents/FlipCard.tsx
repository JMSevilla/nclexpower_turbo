import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

interface FlipCardProps {
  frontImage: StaticImageData;
  backImage: StaticImageData;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  backImage,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Image
            src={frontImage}
            alt="FrontFaceCard"
            className="h-[400px] min-w-[220px] rounded-md"
          />
        </div>
        <div className="flip-card-back">
          <Image
            src={backImage}
            alt="BackFaceCard"
            className="h-[400px] min-w-[220px] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
