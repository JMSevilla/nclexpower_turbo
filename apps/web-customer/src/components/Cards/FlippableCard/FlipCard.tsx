import Image, { StaticImageData } from 'next/image';
import React from 'react'

interface FlipCardProps {
    frontImage: StaticImageData;
    backImage: StaticImageData;
}

export const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage }) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <Image src={frontImage} alt="FrontFaceCard" className="h-[400px] min-w-[220px] rounded-md" />
                </div>
                <div className="flip-card-back">
                    <Image src={backImage} alt="BackFaceCard" className="h-[400px] min-w-[220px] rounded-md" />
                </div>
            </div>
        </div>
    )
}