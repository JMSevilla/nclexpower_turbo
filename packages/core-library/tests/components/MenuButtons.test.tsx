import { Editor } from "@tiptap/react";
import { render, screen, fireEvent } from "../common";
import { MenuButtons } from "../../components/RichTextEditor/Menus";
import { EditorButtonGroup } from "../../components/RichTextEditor/EditorButtonGroup";
import { MenuButtonType } from "../../types/editor-type";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/icons-material/FormatBold", () => () => <div>BoldIcon</div>);
jest.mock("@mui/icons-material/FormatItalic", () => () => (
  <div>ItalicIcon</div>
));
jest.mock("@mui/icons-material/FormatUnderlined", () => () => (
  <div>UnderlineIcon</div>
));
jest.mock("@mui/icons-material/FormatListBulleted", () => () => (
  <div>ListBulletedIcon</div>
));
jest.mock("@mui/icons-material/FormatListNumbered", () => () => (
  <div>ListNumberedIcon</div>
));
jest.mock("@mui/icons-material/Undo", () => () => <div>UndoIcon</div>);
jest.mock("@mui/icons-material/Redo", () => () => <div>RedoIcon</div>);

jest.mock("../../components/RichTextEditor/Menus", () => ({
  MenuButtons: jest.fn(() => [
    {
      label: "Bold",
      icon: <div>BoldIcon</div>,
      onClick: jest.fn(),
      isActive: false,
    },
    {
      label: "Italic",
      icon: <div>ItalicIcon</div>,
      onClick: jest.fn(),
      isActive: false,
    },
    {
      label: "Underline",
      icon: <div>UnderlineIcon</div>,
      onClick: jest.fn(),
      isActive: false,
    },
  ]),
}));

const mockEditor = {
  chain: () => ({
    focus: () => ({
      toggleBold: jest.fn().mockReturnValue({ run: jest.fn() }),
      toggleItalic: jest.fn().mockReturnValue({ run: jest.fn() }),
      toggleUnderline: jest.fn().mockReturnValue({ run: jest.fn() }),
    }),
  }),
  can: () => ({
    chain: () => ({
      focus: () => ({
        toggleBold: jest.fn().mockReturnValue(true),
        toggleItalic: jest.fn().mockReturnValue(true),
        toggleUnderline: jest.fn().mockReturnValue(true),
      }),
    }),
  }),
  isActive: jest.fn(() => false),
} as unknown as Editor;

describe("EditorButtonGroup", () => {
  it('should render default buttons for the "default" editorFor prop', () => {
    const menus: MenuButtonType[] = MenuButtons({
      editor: mockEditor,
      editorFor: "default",
    });

    render(<EditorButtonGroup menus={menus} />);

    expect(screen.getByText("BoldIcon")).toBeInTheDocument();
    expect(screen.getByText("ItalicIcon")).toBeInTheDocument();
    expect(screen.getByText("UnderlineIcon")).toBeInTheDocument();
  });

  it('should render additional buttons for the "questions" editorFor prop', () => {
    const menus: MenuButtonType[] = [
      ...MenuButtons({ editor: mockEditor, editorFor: "default" }),
      {
        label: "List Bulleted",
        icon: <div>ListBulletedIcon</div>,
        onClick: jest.fn(),
        isActive: false,
      },
      {
        label: "List Numbered",
        icon: <div>ListNumberedIcon</div>,
        onClick: jest.fn(),
        isActive: false,
      },
    ];

    render(<EditorButtonGroup menus={menus} />);

    expect(screen.getByText("ListBulletedIcon")).toBeInTheDocument();
    expect(screen.getByText("ListNumberedIcon")).toBeInTheDocument();
  });

  it("should call onClick handlers when buttons are clicked", () => {
    const onClickBold = jest.fn();
    const menus: MenuButtonType[] = [
      {
        label: "Bold",
        icon: <div>BoldIcon</div>,
        onClick: onClickBold,
        isActive: false,
      },
    ];

    render(<EditorButtonGroup menus={menus} />);

    fireEvent.click(screen.getByText("BoldIcon"));

    expect(onClickBold).toHaveBeenCalled();
  });

  it("should render active buttons with the correct style", () => {
    const menus: MenuButtonType[] = [
      {
        label: "Bold",
        icon: <div>BoldIcon</div>,
        onClick: jest.fn(),
        isActive: true,
      },
    ];

    render(<EditorButtonGroup menus={menus} />);

    const boldButton = screen.getByText("BoldIcon").parentElement;
    expect(boldButton).toHaveClass(
      "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1aq5xwy-MuiButtonBase-root-MuiIconButton-root"
    );
  });

  it("should not render buttons when menus array is empty", () => {
    render(<EditorButtonGroup menus={[]} />);

    expect(screen.queryByText("BoldIcon")).not.toBeInTheDocument();
  });
});
