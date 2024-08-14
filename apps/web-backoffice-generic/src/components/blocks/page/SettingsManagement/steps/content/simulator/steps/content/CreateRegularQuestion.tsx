import { ContainedRegularQuestionType } from "@/components/blocks/page/SettingsManagement/steps/content/simulator/types";
import { Button, MultipleSelectField } from "core-library/components";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { FormValueType } from "@/components/blocks/page/SettingsManagement/types";
import { useBusinessQueryContext } from "core-library/contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRegularSATAQuestionSchema } from "@/core/schema/RegularSata/createRegularSATAQuestionSchema";
import { CreateQuestionLoader } from "./loader";
import { answerForm, questionForm } from "@/core/constant/RegularQuestionForm";
import AnswerOption from "../../AnswerOption";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
}

export const CreateRegularQuestion: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [formHandler, setFormHandler] = useState<FormValueType[]>([
    questionForm,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(createRegularSATAQuestionSchema),
  });
  const { control, handleSubmit } = form;

  const { businessQueryGetRegularQuestionDDCategory } =
    useBusinessQueryContext();
  const { data: ClientNeeds } = businessQueryGetRegularQuestionDDCategory(
    ["getClientNeeds"],
    2
  );
  const { data: ContentArea } = businessQueryGetRegularQuestionDDCategory(
    ["getContentArea"],
    3
  );
  const { data: CognitiveLevel } = businessQueryGetRegularQuestionDDCategory(
    ["getCognitiveLevel"],
    4
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const { value } = e.target;
    const updatedForm = [...formHandler];
    updatedForm[selectedPageIndex] = {
      ...updatedForm[selectedPageIndex],
      [name]: value,
    };
    setFormHandler(updatedForm);
  };

  const addForm = () => {
    setFormHandler([...formHandler, questionForm]);
    setSelectedPageIndex(formHandler.length);
    form.reset();
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPageIndex(value - 1);
  };

  const answerOption = formHandler[selectedPageIndex]?.answers_option || [];
  const formLimit = formHandler.length >= 10;
  const answerOptionLimit = answerOption.length >= 5;

  const addAnswer = () => {
    const updatedForm = [...formHandler];
    updatedForm[selectedPageIndex].answers_option = [
      ...answerOption,
      answerForm,
    ];
    setFormHandler(updatedForm);
  };

  if (isLoading) {
    return <CreateQuestionLoader />;
  }

  const onSubmit = () => {
    console.log("Submitted Successfully");
    form.reset();
  };

  return (
    <div className="h-[850px] flex flex-col items-center p-5 gap-y-10">
      <p className="text-center font-bold">
        Create regular question <br /> ({props.values.type})
      </p>
      <form className="w-full" {...form}>
        {formHandler[selectedPageIndex] && (
          <div className="w-full h-full flex shadow-md border border-slate-300 rounded-lg">
            <div className="w-1/3 h-full flex flex-col gap-5 pl-10 pt-24">
              <MultipleSelectField
                control={control}
                onChange={(e) => handleInputChange(e, "client_needs")}
                sx={{ width: "100%", mb: 2 }}
                name="client_needs"
                label="CLIENT NEEDS CATEGORY :"
                options={ClientNeeds ?? []}
                value={formHandler[selectedPageIndex]?.client_needs || ""}
              />
              <MultipleSelectField
                control={control}
                onChange={(e) => handleInputChange(e, "content_area")}
                sx={{ width: "100%", mb: 2 }}
                name="content_area"
                label="CONTENT AREA :"
                options={ContentArea ?? []}
                value={formHandler[selectedPageIndex]?.content_area || ""}
              />
              <MultipleSelectField
                control={control}
                onChange={(e) => handleInputChange(e, "cognitive_level")}
                sx={{ width: "100%", mb: 2 }}
                name="cognitive_level"
                label="COGNITIVE LEVEL :"
                options={CognitiveLevel ?? []}
                value={formHandler[selectedPageIndex]?.cognitive_level || ""}
              />
            </div>
            <div className="w-2/3 h-full flex flex-col items-end px-10 py-5">
              <Button
                onClick={handleSubmit(addForm)}
                disabled={formLimit}
                className="bg-[#37BEC7] items-center py-2 w-44 text-sm text-white font-semibold rounded-xl leading-3 disabled:saturate-0"
              >
                <span>
                  <AddIcon />
                </span>
                <p>Add New Form</p>
              </Button>

              <div className="w-full">
                <p className="text-md font-semibold">Question :</p>
                <textarea
                  onChange={(e) => handleInputChange(e, "question")}
                  name="question"
                  value={formHandler[selectedPageIndex]?.question || ""}
                  className="border rounded-lg p-5 bg-slate-200 w-full"
                  rows={5}
                  placeholder="Enter Question"
                />
              </div>
              <AnswerOption />
            </div>
          </div>
        )}
      </form>
      <div className="w-full flex">
        <div className="w-1/2 flex justify-start">
          <Pagination
            count={formHandler.length}
            onChange={handleChange}
            page={selectedPageIndex + 1}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
        <div className="w-1/2 flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#37BEC7] py-5 w-44 text-sm text-white font-semibold rounded-xl leading-3"
          >
            <p>Continue</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
