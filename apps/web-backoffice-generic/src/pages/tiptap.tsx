import { ControlledRichTextEditor } from '@/components'
import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function tiptap() {
    const Schema = yup.object({
        test: yup.string()
    })


    type SchemaType = yup.InferType<typeof Schema>


    const form = useForm<SchemaType>({
        resolver: yupResolver(Schema)
    })
    const { control } = form




    return (
        <div><ControlledRichTextEditor name='test' control={control} editorFor='questions' /></div>
    )
}
