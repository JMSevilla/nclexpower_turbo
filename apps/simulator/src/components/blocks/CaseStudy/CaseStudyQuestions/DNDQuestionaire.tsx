

import { Grid } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useEffect, useState } from 'react'
import { Block, WordOne, WordTwo } from '@/components/blocks/CaseStudy/CaseStudyQuestions/DNDComponent';



export const DNDQuestionaire: React.FC<any> = ({ questionaire }) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    const [blockList, setBlocklist] = useState([])
    const [wordChoiceOne, setWordChoiceOne] = useState([])
    const [wordChoiceTwo, setWordChoiceTwo] = useState([])


    const updateBlockList = (currentBlock: any) => {
        setBlocklist((prevState) =>
            prevState.filter((block: any) => block?.id !== currentBlock?.id)
        )
    }

    useEffect(() => {
        questionaire.length > 0 && questionaire.map((question: any) => {
            question?.answer ? question?.answer?.length > 0 && question?.answer.map((answerContainer: any) => {
                setBlocklist(answerContainer?.DND1?.DND1WordChoices)
            }) : null
        })
    }, [questionaire])

    return (
        <div className=' h-full '>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <div className='w-full h-full p-5'>
                        <div className='w-full text-sm mb-4 pr-5'>
                            {questionaire?.length > 0 && questionaire.map((questionItem: any, questionIndex: number) => (
                                <div key={questionIndex} className='w-full text-sm mb-4 pr-5'>
                                    <p className="flex" >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: questionItem.question,
                                            }}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='w-full h-full '>
                            <div className='flex gap-1'>
                                {questionaire?.length > 0 && questionaire.map((questionItem: any) =>
                                    questionItem?.tabs?.length > 0 && questionItem.tabs.map((tab: any, tabIndex: number) => (
                                        <div key={tabIndex} className={` px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${activeTab === tabIndex ? ' underline bg-white ' : 'bg-slate-200'
                                            }`}
                                            onClick={() => setActiveTab(tabIndex)}>
                                            <p>{tab.tabsTitle}</p>
                                        </div>

                                    ))
                                )}
                            </div>
                            <div className='rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white'>
                                <div className='flex flex-col gap-y-4'>
                                    {questionaire?.length > 0 && questionaire.map((questionItem: any) =>
                                        questionItem?.tabs?.length > 0 && questionItem.tabs.map((tab: any, tabIndex: number) => (
                                            <div key={tab.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>
                                                {tab.contentUI === "Table" ?
                                                    <p>TABLE DISPLAY</p>
                                                    :
                                                    <div className='flex w-full gap-2'>
                                                        <p className='font-semibold min-w-[50px]'>{tab?.tabsId} :</p>
                                                        <div className='leading-6 text-sm'>{tab?.content}</div>
                                                    </div>
                                                }
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
                        {questionaire?.length > 0 && questionaire.map((questionItem: any) => (
                            questionItem?.answer ? questionItem?.answer.length > 0 && questionItem?.answer.map((answerItem: any, index: number) => (
                                <div key={index} className='h-fit leading-8 '>
                                    <p className='leading-5 my-2'>{answerItem?.note}</p>
                                    <p className="flex leading-5 my-2">
                                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pt-2 " />
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: answerItem.answerInstruction,
                                            }}
                                        />
                                    </p>

                                    <div className='w-full flex flex-wrap gap-2'>
                                        {answerItem?.DNDAnswer ? answerItem?.DNDAnswer.split(/\[\[(.*?)\]\]/).map((part: string, index: number) => {
                                            if (index % 2 === 0) {
                                                return <span key={index}>{part}</span>;
                                            } else {
                                                const word = part.split(':')[1].trim();
                                                return (
                                                    <span key={index} className='-mt-2 text-center'>
                                                        {index === 1 ?
                                                            <WordOne
                                                                blockList={blockList ?? []}
                                                                setAbove={setWordChoiceOne}
                                                                updateBlockList={updateBlockList}
                                                                setBlocklist={setBlocklist}
                                                                placeholder={word}
                                                                wordChoiceOne={wordChoiceOne}
                                                            /> :
                                                            <WordTwo
                                                                blockList={blockList}
                                                                setBelow={setWordChoiceTwo}
                                                                updateBlockList={updateBlockList}
                                                                setBlocklist={setBlocklist}
                                                                placeholder={word}
                                                            />
                                                        }
                                                    </span>
                                                );
                                            }
                                        }) : null}
                                    </div>
                                </div>
                            )) : null
                        ))}
                    </div>
                    <div >
                        {questionaire?.length > 0 && questionaire.map((questionItem: any) =>
                            questionItem?.answer ? questionItem?.answer.length > 0 && questionItem?.answer.map((answerItem: any) => (
                                <div className='h-fit leading-8' key={answerItem.answerId}>
                                    <ol className='w-fit flex flex-col gap-2 mt-5 shadow-md rounded-sm py-4 bg-slate-50 px-5'>
                                        <p className='font-bold'>Word Choices</p>
                                        {blockList.map((item: any) => {
                                            return (
                                                <Block
                                                    id={item?.id}
                                                    item={item}
                                                    key={`block-${item?.id}`}
                                                />
                                            )
                                        })}
                                    </ol>
                                </div>
                            )) : null)}
                    </div>
                </Grid>
            </Grid>
        </div>

    )
}

