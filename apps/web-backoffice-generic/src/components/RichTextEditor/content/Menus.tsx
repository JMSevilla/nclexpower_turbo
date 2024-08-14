import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import React from 'react';
import { Editor } from '@tiptap/react'
import { MenuButtonType, CustomMenusType } from '../../../core/types/editor-type'

type MenuButtonPropsType = CustomMenusType & {
    editor: Editor
}

export const MenuButtons = ({ editor, editorFor }: MenuButtonPropsType) => {
    const editorFocus = editor.chain().focus()
    const editorCan = editor.can()

    const typographyStyles: MenuButtonType[] = [
        {
            label: 'Bold',
            icon: <FormatBoldIcon />,
            onClick: () => editorFocus.toggleBold().run(),
            disabled: !editorCan.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold')
        },
        {
            label: 'Italic',
            icon: <FormatItalicIcon />,
            onClick: () => editorFocus.toggleItalic().run(),
            disabled: !editorCan.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic')
        },
        {
            label: 'Underline',
            icon: <FormatUnderlinedIcon />,
            onClick: () => editorFocus.toggleUnderline().run(),
            disabled: !editorCan.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline')
        },


    ]

    const headings: MenuButtonType[] = [
        {
            label: 'Paragraph',
            onClick: () => editorFocus.setParagraph().run(),
            isActive: editor.isActive('paragraph')
        },
        {
            label: 'Heading',
            onClick: () => editorFocus.toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 })
        },

    ]


    const listStyles: MenuButtonType[] = [
        {
            label: 'Unordered list',
            onClick: () => editorFocus.toggleBulletList().run(),
            icon: <FormatListBulletedIcon />,
            isActive: editor.isActive('bulletList')
        },
        {
            label: 'Ordered list',
            onClick: () => editorFocus.toggleOrderedList().run(),
            icon: <FormatListNumberedIcon />,
            isActive: editor.isActive('orderedList')
        },
        {
            label: 'Sink list',
            onClick: () => editorFocus.sinkListItem('listItem').run(),
            disabled: !editor.can().sinkListItem('listItem')
        },
        {
            label: 'Lift list',
            onClick: () => editorFocus.liftListItem('listItem').run(),
            disabled: !editor.can().liftListItem('listItem')
        },

    ]

    const tableButtons: MenuButtonType[] = [
        {
            label: 'Insert Table',
            onClick: () => editorFocus.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        },
        {
            label: 'Add column before',
            onClick: () => editorFocus.addColumnBefore().run(),
            disabled: !editorCan.addColumnBefore()
        },
        {
            label: 'Add column after',
            onClick: () => editorFocus.addColumnAfter().run(),
            disabled: !editorCan.addColumnAfter()
        },
        {
            label: 'Delete column ',
            onClick: () => editorFocus.deleteColumn().run(),
            disabled: !editorCan.deleteColumn()
        },
        {
            label: 'Add row before',
            onClick: () => editorFocus.addRowBefore().run(),
            disabled: !editorCan.addRowBefore()
        },
        {
            label: 'Add row after',
            onClick: () => editorFocus.addRowAfter().run(),
            disabled: !editorCan.addRowAfter()
        },
        {
            label: 'Delete row',
            onClick: () => editorFocus.deleteRow().run(),
            disabled: !editorCan.deleteRow()
        },
        {
            label: 'Delete table',
            onClick: () => editorFocus.deleteTable().run(),
            disabled: !editorCan.deleteTable()
        },
        {
            label: 'Merge or Split',
            onClick: () => editorFocus.mergeOrSplit().run(),
            disabled: !editorCan.mergeOrSplit()
        },


    ]


    const revertButtons: MenuButtonType[] = [
        {
            label: 'Undo',
            icon: <UndoIcon />,
            onClick: () => editorFocus.undo().run(),
            disabled: !editorCan.chain().focus().undo().run()
        },
        {
            label: 'Redo',
            icon: <RedoIcon />,
            onClick: () => editorFocus.redo().run(),
            disabled: !editorCan.chain().focus().redo().run()
        }
    ]


    if (editorFor === "default") {
        return [...typographyStyles]
    }

    if (editorFor === "questions") {
        return [...typographyStyles, ...listStyles]
    }

    if (editorFor === "casestudy") {
        return [...typographyStyles, ...headings, ...listStyles, ...tableButtons, ...revertButtons]
    }

    return []

}