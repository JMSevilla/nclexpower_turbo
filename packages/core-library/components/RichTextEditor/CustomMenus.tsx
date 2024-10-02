import React, { useEffect } from "react";
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import { EditorButtonGroup } from "./EditorButtonGroup";
import { CustomMenusType } from "../../types/editor-type";
import { MenuButtons } from "./Menus";

type CustomMenuBarPropsType = CustomMenusType & {
  content: string;
  customDependency?: string | number;
};

export const CustomMenuBar: React.FC<CustomMenuBarPropsType> = ({
  editorFor,
  content,
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const menus = MenuButtons({ editor, editorFor });

  useEffect(() => {
    if (!editor) return;
    let { from, to } = editor.state.selection;
    editor.commands.setContent(content, false, {
      preserveWhitespace: "full",
    });
    editor.commands.setTextSelection({ from, to });
  }, [editor, content]);

  switch (editorFor) {
    case "default":
    case "questions":
      return (
        <Box gap={1} display="flex" flexWrap={"wrap"}>
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  borderRadius: 6,
                  backgroundColor: "white",
                  padding: 2,
                }}
                boxShadow={4}
              >
                <EditorButtonGroup menus={menus} />
              </Box>
            </BubbleMenu>
          )}
        </Box>
      );
    case "casestudy":
      return (
        <Box
          gap={1}
          display="flex"
          flexWrap={"wrap"}
          borderBottom={1}
          borderColor={"#F0EEED"}
        >
          <EditorButtonGroup menus={menus} />
        </Box>
      );
    default:
      return null;
  }
};
