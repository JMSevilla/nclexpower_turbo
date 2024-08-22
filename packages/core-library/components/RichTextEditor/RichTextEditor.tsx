import React, { useState } from "react";
import { EditorProvider } from "@tiptap/react";
import { Box } from "@mui/material";

import { CustomMenuBar } from "./CustomMenus";
import { extensions } from "./config/extentions-config";
import { CustomMenusType } from "../../types/editor-type";
import { Controller, FieldValues } from "react-hook-form";
import { ControlledField } from "../Textfield";
import { useSanitizedInputs } from "../../hooks";
import { FormHelperText } from "../FormHelperText/FormHelperText";

type RichTextEditorPropsType = CustomMenusType & {
  onChange?(html: string): void;
  editorClassName?: string;
};

export type ControlledRichTextEditorProps<T extends FieldValues> =
  ControlledField<T> & RichTextEditorPropsType;

export function ControlledRichTextEditor<T extends FieldValues>({
  control,
  name,
  onChange: originalOnchange,
  editorFor,
  editorClassName,
}: ControlledRichTextEditorProps<T>) {
  const { purifyInputs } = useSanitizedInputs({
    config: { RETURN_TRUSTED_TYPE: true },
  });
  const handleChange = (html: string, onChange: (...event: any[]) => void) => {
    const purifiedInputs = purifyInputs(html) as string;
    onChange(purifiedInputs);
    originalOnchange && originalOnchange(purifiedInputs);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <EditorProvider
          editorProps={{
            attributes: { class: `min-h-[100px] p-4  ${editorClassName}` },
          }}
          enableContentCheck={true}
          onUpdate={({ editor }) => {
            handleChange(editor.getHTML(), onChange);
          }}
          extensions={extensions}
          slotAfter={
            error?.message && (
              <FormHelperText error={!!error.message}>
                {error.message}
              </FormHelperText>
            )
          }
          immediatelyRender={false}
        >
          <CustomMenuBar
            editorFor={editorFor}
            content={value?.toString() ?? ""}
          />
        </EditorProvider>
      )}
    />
  );
}
