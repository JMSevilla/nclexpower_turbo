interface AccoundId {
  name: string;
  lastname: string;
}

interface Approver {
  id: string;
  accountId: string;
  createdDate: string;
  updatedDate: string;
}

export interface ContentApprover {
  id: string;
  contentId: string;
  content: string;
  approverId: string;
  approver: Approver;
  accountId: AccoundId;
}

export const mockData = {
  contentApprovers: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      content:
        "Classes below enable you to display the accordion without the default background color, borders and rounded corners. It also makes it stretch full width of their parent container. It comes useful when you want to embed the accordion in a different component i.e. inside of a Card or",
      approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      approver: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdDate: "2024-09-11T11:19:27.283Z",
        updatedDate: "2024-09-11T11:19:27.283Z",
      },
      accountId: {
        name: "USER1",
        lastname: "Doe",
      },
    },
    {
      id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
      contentId: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
      content:
        "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's al",
      approverId: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
      approver: {
        id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
        accountId: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
        createdDate: "2024-09-10T09:18:30.123Z",
        updatedDate: "2024-09-10T09:18:30.123Z",
      },
      accountId: {
        name: "USER2",
        lastname: "Doe",
      },
    },
    {
      id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
      contentId: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
      content:
        "Accordions are useful when you need to organize lots of information in a vertically limited space. The headers let the user scan through main subjects of the content, and choose which of the subjects they would like to examine in depth by clicking on it. It's very useful for FAQs and complex contact forms.",
      approverId: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
      approver: {
        id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
        accountId: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
        createdDate: "2024-09-09T08:17:35.456Z",
        updatedDate: "2024-09-09T08:17:35.456Z",
      },
      accountId: {
        name: "USER3",
        lastname: "Doe",
      },
    },
  ],
};
