import { AuthorizedContentsResponseType } from "../../../../../../../../../api/types"

export const data:AuthorizedContentsResponseType[] =[
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                content: "Approval for educational article",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                    accountId: "approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
            accountId: "author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afab",
                type: "Article",
                mainType: "Text",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afac",
                        cognitiveLevel: "High",
                        clientNeeds: "Educational Material",
                        contentArea: "Science",
                        question: "What is the scientific method?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afad",
                                answer: "A systematic process for experimentation.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afae",
            highlights: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afaf",
                    highlightedText: "scientific method",
                    comment: "Important concept to clarify.",
                    startPosition: 0,
                    endPosition: 17
                }
            ],
            revisionStatus: 1,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afag",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afah",
            type: "Article",
            mainType: "Text",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afai",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Knowledge Acquisition",
                    contentArea: "Mathematics",
                    question: "How do you calculate the area of a circle?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afaj",
                            answer: "Use the formula πr².",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
  ]
  