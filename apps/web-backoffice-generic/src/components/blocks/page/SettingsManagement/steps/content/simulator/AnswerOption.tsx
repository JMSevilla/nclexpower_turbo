import React from "react";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";

const AnswerOption: React.FC = () => {
  return (
    <div className="w-full">
      <p className="text-md font-semibold">Answer Options :</p>
      <div className="w-full h-[200px] bg-slate-200 rounded-md p-2 flex flex-col gap-2 overflow-y-auto">
        <div
          //   key={index}
          className="w-full min-h-10 rounded-md flex text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-between"
        >
          <input
            className="h-5 text-sm rounded-sm p-2 bg-[#aedbde] w-80 border-none"
            // defaultValue={`Question ${index}`}
            // value={
            //   formHandler[selectedPageIndex]?.answers_option[index].label || ""
            // }
          />
          <input type="checkbox" />
        </div>
        <PrimaryButton
          //   onClick={addAnswer}
          //   disabled={answerOptionLimit}
          className="w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold disabled:saturate-0"
        >
          <span>
            <AddIcon />
          </span>
          <p>Add Answer Option</p>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AnswerOption;
