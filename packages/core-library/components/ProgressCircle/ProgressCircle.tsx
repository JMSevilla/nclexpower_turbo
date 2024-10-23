 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from 'react';

type ProgressCircleProps = {
  progress: number;
  showProgress?: boolean;
};

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, showProgress}) => {
  const validProgress = Math.min(100, Math.max(0, progress));

  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (validProgress / 100) * circumference;

  return (
    <div className="absolute left-0 ml-[-20px] flex items-center justify-center w-16 h-16 rounded-full">
      <svg className="w-full h-full transform -rotate-90">

        <circle
          className="text-gray"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />

        <circle
          className="text-yellow"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showProgress && (
        <>
            <div className="absolute text-sm font-semibold">{validProgress}%</div>
        </>
      )}
    </div>
  );
};
