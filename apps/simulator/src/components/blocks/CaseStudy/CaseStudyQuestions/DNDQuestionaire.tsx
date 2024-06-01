import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Grid } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { DNDValidationAtom } from "@/core/schema/useAtomic";
import { useForm, useFormState } from "react-hook-form";
import { DNDValidationType, RowSchema } from "@/core/schema/dnd/validation";
import {
  AnswerProps,
  DND1WordChoicesUI,
  QuestionaireProps,
  SsrData,
} from "@/core/types/ssrData";
import { useFormSubmissionBindingHooks } from "@repo/core-library/hooks/useFormSubmissionBindingHooks";
import { DraggableWord } from "@/components/blocks/CaseStudy/CaseStudyQuestions/DNDComponent/DraggableWord";
import { WordDropContainer } from "@/components/blocks/CaseStudy/CaseStudyQuestions/DNDComponent/WordDropContainer";

export const DNDQuestionaire: React.FC<SsrData> = ({ questionaire }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [dndaAtom, setDndAtom] = useAtom(DNDValidationAtom);
  const [blockList, setBlocklist] = useState<DND1WordChoicesUI[]>([]);
  const [wordChoiceOne, setWordChoiceOne] = useState<DND1WordChoicesUI[]>([]);
  const [wordChoiceTwo, setWordChoiceTwo] = useState<DND1WordChoicesUI[]>([]);

  const form = useForm<DNDValidationType>({
    mode: "all",
    resolver: zodResolver(RowSchema),
  });

  const { control, setValue } = form;
  const formState = useFormState({ control: control });

  useFormSubmissionBindingHooks({
    key: "MCQSS",
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [dndaAtom],
  });

  useEffect(() => {
    setValue("wordChoice1", wordChoiceOne);
    setValue("wordChoice2", wordChoiceTwo);
  }, [wordChoiceOne, wordChoiceTwo]);

  useEffect(() => {
    questionaire.length > 0 &&
      questionaire.map((question: QuestionaireProps) => {
        if (question.answer) {
          question.answer?.length > 0 &&
            question.answer.map((answerContainer: AnswerProps) => {
              setBlocklist(answerContainer?.DND1?.DND1WordChoices ?? []);
            });
        }
      });
  }, [questionaire]);

  const handleDroppedItem = (item: DND1WordChoicesUI) => {
    const filteredBlocklist = blockList.filter((b) => b.id !== item.id);
    setBlocklist(filteredBlocklist);
  };

  const handleRemoveWord = (item: DND1WordChoicesUI) => {
    setBlocklist((prev) => [item, ...prev]);
  };

  async function handleSubmit(value: DNDValidationType) {
    console.log("submit", value);
  }

  return (
    <div className=" h-full ">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="w-full h-full p-5">
            <div className="w-full text-sm mb-4 pr-5">
              {questionaire?.length > 0 &&
                questionaire.map((questionItem, questionIndex: number) => (
                  <div key={questionIndex} className="w-full text-sm mb-4 pr-5">
                    <p className="flex">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: questionItem.question,
                        }}
                      />
                    </p>
                  </div>
                ))}
            </div>
            <div className="w-full h-full ">
              <div className="flex gap-1">
                {questionaire?.length > 0 &&
                  questionaire.map(
                    (questionItem) =>
                      questionItem?.tabs?.length > 0 &&
                      questionItem.tabs.map((tab, tabIndex: number) => (
                        <div
                          key={tabIndex}
                          className={` px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${
                            activeTab === tabIndex
                              ? " underline bg-white "
                              : "bg-slate-200"
                          }`}
                          onClick={() => setActiveTab(tabIndex)}
                        >
                          <p>{tab.tabsTitle}</p>
                        </div>
                      ))
                  )}
              </div>
              <div className="rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white">
                <div className="flex flex-col gap-y-4">
                  {questionaire?.length > 0 &&
                    questionaire.map(
                      (questionItem) =>
                        questionItem?.tabs?.length > 0 &&
                        questionItem.tabs.map((tab, tabIndex: number) => (
                          <div
                            key={tabIndex}
                            style={{
                              display:
                                activeTab === tabIndex ? "block" : "none",
                            }}
                          >
                            <div className="flex w-full gap-2">
                              <p className="font-semibold min-w-[50px]">
                                {tab.tabsId} :
                              </p>
                              <div className="leading-6 text-sm">
                                {tab.content as string}
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-fit w-full py-4 font-sans tracking-tight">
            {questionaire?.length > 0 &&
              questionaire.map((questionItem: QuestionaireProps) =>
                questionItem?.answer
                  ? questionItem?.answer.length > 0 &&
                    questionItem?.answer.map(
                      (answerItem: AnswerProps, answerItemIdx: number) => (
                        <div key={answerItemIdx} className="h-fit leading-8 ">
                          <p className="leading-5 my-2">{answerItem?.note}</p>
                          <p className="flex leading-5 my-2">
                            <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pt-2 " />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: answerItem.answerInstruction,
                              }}
                            />
                          </p>

                          <div className="w-full flex flex-wrap gap-2">
                            {answerItem.DNDAnswer
                              ? answerItem?.DNDAnswer.split(
                                  /\[\[(.*?)\]\]/
                                ).map((part: string, index: number) => {
                                  if (index % 2 === 0) {
                                    return <span key={index}>{part}</span>;
                                  } else {
                                    const word = part.split(":")[1].trim();
                                    return (
                                      <span
                                        key={index}
                                        className="-mt-2 text-center"
                                      >
                                        {index === 1 ? (
                                          <WordDropContainer
                                            onDelete={handleRemoveWord}
                                            onDropped={handleDroppedItem}
                                            placeholder={word}
                                            setWord={setWordChoiceOne}
                                            name={"wordChoice1"}
                                          />
                                        ) : (
                                          <WordDropContainer
                                            onDelete={handleRemoveWord}
                                            onDropped={handleDroppedItem}
                                            placeholder={word}
                                            setWord={setWordChoiceTwo}
                                            name={"wordChoice2"}
                                          />
                                        )}
                                      </span>
                                    );
                                  }
                                })
                              : null}
                          </div>
                        </div>
                      )
                    )
                  : null
              )}
          </div>
          <div>
            {questionaire?.length > 0 &&
              questionaire.map((questionItem) =>
                questionItem?.answer
                  ? questionItem?.answer.length > 0 &&
                    questionItem?.answer.map((answerItem) => (
                      <div
                        className="h-fit leading-8"
                        key={answerItem.answerId}
                      >
                        <ol className="w-fit flex flex-col gap-2 mt-5 shadow-md rounded-sm py-4 bg-slate-50 px-5">
                          <p className="font-bold">Word Choices</p>
                          {blockList.map((item: DND1WordChoicesUI) => (
                            <DraggableWord
                              id={item?.id}
                              item={item}
                              key={`block-${item?.id}`}
                            />
                          ))}
                        </ol>
                      </div>
                    ))
                  : null
              )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
