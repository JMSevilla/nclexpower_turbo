import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import React, { useMemo } from 'react';
import { Editor } from '@tiptap/react'
import { CustomMenusType, MenuButtonType } from '../../core/types/editor-type';

type MenuButtonPropsType = CustomMenusType & {
    editor: Editor
}

export const MenuButtons = ({ editor, editorFor }: MenuButtonPropsType) => {
    const editorFocus = editor.chain().focus()
    const editorCan = editor.can()


    const createButton = (label: string,
        onClick: () => void,
        icon?: React.ReactNode,
        disabled: boolean = false,
        isActive: boolean = false): MenuButtonType => ({
            label,
            icon,
            onClick,
            isActive,
            disabled
        });

    const typographyStyles = [
        createButton('bold', () => editorFocus.toggleBold().run(), <FormatBoldIcon />, !editorCan.chain().focus().toggleBold().run(), editor.isActive('bold')),
        createButton('Italic', () => editorFocus.toggleItalic().run(), <FormatItalicIcon />, !editorCan.chain().focus().toggleItalic().run(), editor.isActive('italic')),
        createButton('Underline', () => editorFocus.toggleUnderline().run(), <FormatUnderlinedIcon />, !editorCan.chain().focus().toggleUnderline().run(), editor.isActive('underline')),
    ]

    const headings = [
        createButton('Paragraph', () => editorFocus.setParagraph().run(), undefined, false, editor.isActive('paragraph')),
        createButton('Heading', () => editorFocus.toggleHeading({ level: 2 }).run(), undefined, false, editor.isActive('heading', { level: 2 }))
    ]


    const listStyles = [
        createButton('Unordered list', () => editorFocus.toggleBulletList().run(), <FormatListBulletedIcon />, false, editor.isActive('bulletList')),
        createButton('Ordered list', () => editorFocus.toggleOrderedList().run(), <FormatListNumberedIcon />, false, editor.isActive('orderedList')),
        createButton('Sink list', () => editorFocus.sinkListItem('listItem').run(), undefined, !editor.can().sinkListItem('listItem'), false),
        createButton('Lift list', () => editorFocus.liftListItem('listItem').run(), undefined, !editor.can().liftListItem('listItem'), false),
    ]

    const tableButtons: MenuButtonType[] = [
        createButton('Insert Table', () => editorFocus.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()),
        createButton('Add column before', () => editorFocus.addColumnBefore().run(), undefined, !editorCan.addColumnBefore()),
        createButton('Add column after', () => editorFocus.addColumnAfter().run(), undefined, !editorCan.addColumnAfter()),
        createButton('Delete column', () => editorFocus.deleteColumn().run(), undefined, !editorCan.deleteColumn()),
        createButton('Add row before', () => editorFocus.addRowBefore().run(), undefined, !editorCan.addRowBefore()),
        createButton('Add row after', () => editorFocus.addRowAfter().run(), undefined, !editorCan.addRowAfter()),
        createButton('Delete row', () => editorFocus.deleteRow().run(), undefined, !editorCan.deleteRow()),
        createButton('Delete table', () => editorFocus.deleteTable().run(), undefined, !editorCan.deleteTable()),
        createButton('Merge or Split', () => editorFocus.mergeOrSplit().run(), undefined, !editorCan.mergeOrSplit()),
    ];

    const revertButtons: MenuButtonType[] = [
        createButton('Undo', () => editorFocus.undo().run(), <UndoIcon />, !editorCan.chain().focus().undo().run()),
        createButton('Redo', () => editorFocus.redo().run(), <RedoIcon />, !editorCan.chain().focus().redo().run()),
    ];

    const getButtons = () => {
        switch (editorFor) {
            case 'default':
                return [...typographyStyles]
            case 'questions':
                return [...typographyStyles, ...listStyles]
            case 'casestudy':
                return [...typographyStyles, ...headings, ...listStyles, ...tableButtons, ...revertButtons]
            default:
                return []
        }
    }

    return getButtons()

}