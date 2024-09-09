import React, { useEffect, useMemo } from "react";
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import { EditorButtonGroup } from "./EditorButtonGroup";
import { CustomMenusType } from "../../types/editor-type";
import { MenuButtons } from "./Menus";

type CustomMenuBarPropsType = CustomMenusType & {
  content: string;
};

export const CustomMenuBar: React.FC<CustomMenuBarPropsType> = ({
  editorFor,
  content,
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const menus = useMemo(
    () => MenuButtons({ editor, editorFor }) ?? [],
    [editor]
  );

  useEffect(() => {
    const { setContent } = editor.commands;
    setContent(content, false, { preserveWhitespace: true });
  }, [content]);

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
          padding={3}
        >
          <EditorButtonGroup menus={menus} />
        </Box>
      );
    default:
      return null;
  }
};
