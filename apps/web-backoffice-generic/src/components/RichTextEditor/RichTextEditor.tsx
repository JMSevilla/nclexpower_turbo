import React, { useState } from 'react'
import { EditorProvider } from '@tiptap/react'
import { Box } from '@mui/material'
import { useSanitizedInputs } from 'core-library/hooks'
import { CustomMenuBar } from './CustomMenus'
import { extensions } from './config/extentions-config'
import { CustomMenusType } from '../../core/types/editor-type'
import { Controller, FieldValues } from 'react-hook-form'
import { ControlledField } from 'core-library/types'

type RichTextEditorPropsType = CustomMenusType & {
    onChange?(html: string): void;
    containerClassName?: string;
    editorClassName?: string;
}

export type ControlledRichTextEditorProps<T extends FieldValues> = ControlledField<T> & RichTextEditorPropsType;

export function ControlledRichTextEditor<T extends FieldValues>({
    control,
    name,
    onChange: originalOnchange,
    editorFor,
    editorClassName,
    containerClassName
}: ControlledRichTextEditorProps<T>) {
    const { purifyInputs } = useSanitizedInputs({ config: { RETURN_TRUSTED_TYPE: true } })
    const handleChange = (html: string, onChange: (...event: any[]) => void) => {
        const purifiedInputs = purifyInputs(html) as string
        onChange(purifiedInputs)
        originalOnchange && originalOnchange(purifiedInputs)
    }

    return (<Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Box boxShadow={2} className={containerClassName}>
                <EditorProvider
                    slotBefore={<CustomMenuBar editorFor={editorFor} />}
                    editorProps={{
                        attributes: { class: `min-h-[100px] p-4 ${editorClassName}` }
                    }}
                    onUpdate={({ editor }) => {
                        handleChange(editor.getHTML(), onChange)
                    }}
                    extensions={extensions}
                    immediatelyRender={false}
                    content={value}
                />
            </Box>
        )}
    />
    )
}