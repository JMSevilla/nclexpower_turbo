import React, { useState } from 'react'
import { EditorProvider } from '@tiptap/react'
import { Box } from '@mui/material'
import { useSanitizedInputs } from 'core-library/hooks'
import { CustomMenuBar } from './CustomMenus'
import { extensions } from './content/extentions-config'
import { CustomMenusType } from '../../core/types/editor-type'

type RichTextEditorPropsType = CustomMenusType & {
    onChange?(html: string): void;
    containerClassName?: string;
    editorClassName?: string;
}

export const RichTextEditor = ({ editorFor, onChange, containerClassName }: RichTextEditorPropsType) => {
    const { purifyInputs } = useSanitizedInputs({ config: { RETURN_TRUSTED_TYPE: true } })

    const handleChange = (html: string) => {
        const purifiedInputs = purifyInputs(html) as string
        onChange && onChange(purifiedInputs)
    }

    return (
        <Box boxShadow={2} className={containerClassName}>
            <EditorProvider
                slotBefore={<CustomMenuBar editorFor={editorFor} />}
                editorProps={{ attributes: { class: "min-h-[100px]" } }}
                onUpdate={({ editor }) => handleChange(editor.getHTML())}
                extensions={extensions}
                immediatelyRender={false}
            />
        </Box >
    )
}