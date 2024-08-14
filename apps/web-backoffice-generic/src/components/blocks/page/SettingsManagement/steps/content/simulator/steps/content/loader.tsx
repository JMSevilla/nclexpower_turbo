import React from "react";
import { AnimatedBoxSkeleton } from "core-library/components";
import { Grid } from "@mui/material";

export const QuestionTypeSelectionLoader: React.FC = () => {
  return (
    <>
      <Grid
        sx={{ mt: 3 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <AnimatedBoxSkeleton height={135} light={true} />
        </Grid>
        <Grid item xs={6}>
          <AnimatedBoxSkeleton height={135} light={true} />
        </Grid>
      </Grid>
    </>
  );
};

export const CreateQuestionLoader: React.FC = () => {
  return (
    <div className="h-[850px] flex flex-col items-center p-5 gap-y-10">
      <div className="w-[20%] h-0">
        <AnimatedBoxSkeleton height={25} light={true} />
      </div>
      <div className="w-16">
        <AnimatedBoxSkeleton height={25} light={true} />
      </div>
      <div className="w-full">
        <div className="w-full h-full flex shadow-md border border-slate-300 rounded-lg">
          <div className="w-1/3 h-full flex flex-col gap-5 pl-10 pt-20">
            <AnimatedBoxSkeleton height={60} light={true} />
            <AnimatedBoxSkeleton height={60} light={true} />
            <AnimatedBoxSkeleton height={60} light={true} />
          </div>
          <div className="w-2/3 h-full flex flex-col items-end px-10 py-5">
            <div className="w-44">
              <AnimatedBoxSkeleton height={50} light={true} />
            </div>
            <div className="w-full">
              <div className="w-32 mb-1 mt-2 h-[-10]">
                <AnimatedBoxSkeleton height={20} light={true} />
              </div>
              <AnimatedBoxSkeleton height={150} light={true} />
            </div>
            <div className="w-full">
              <div className="w-32 mb-1 mt-2 h-[-10]">
                <AnimatedBoxSkeleton height={20} light={true} />
              </div>
              <AnimatedBoxSkeleton height={150} light={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/2 flex justify-start">
          <div className="w-32">
            <AnimatedBoxSkeleton height={25} light={true} />
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <div className="w-44">
            <AnimatedBoxSkeleton height={50} light={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
