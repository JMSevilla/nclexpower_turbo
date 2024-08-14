import React from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtons } from './content/Menus';
import { EditorButtonGroup } from './EditorButtonGroup';
import { CustomMenusType } from '../../core/types/editor-type'


type CustomMenuBarPropsType = CustomMenusType

export const CustomMenuBar = ({ editorFor }: CustomMenuBarPropsType) => {
    const { editor } = useCurrentEditor()

    if (!editor) return null;

    const menus = MenuButtons({ editor, editorFor })

    if (editorFor === "questions" || editorFor === "default") {
        return (
            <Box gap={1} display='flex' flexWrap={'wrap'} >
                {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <Box display={'flex'} gap={1} bgcolor={"white"} boxShadow={2} padding={1}>
                        <EditorButtonGroup menus={menus} />
                    </Box>
                </BubbleMenu>}
            </Box >
        )
    }
    else if (editorFor === "casestudy") {
        return (
            <Box gap={1} display='flex' flexWrap={'wrap'} borderBottom={1} borderColor={'#F0EEED'} padding={3}>
                <EditorButtonGroup menus={menus} />
            </Box >
        )
    }
}


