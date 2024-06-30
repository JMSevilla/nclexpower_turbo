import React, { useEffect, useState } from 'react'
import { useParsedHCPLabelKey } from '@/core/utils/useParsedHCPLabelKey'
import { useHighlightedProcessor } from '@/core/utils/useHighlightedProcessor'
import {
  handleHighlight,
  mergeArrayString,
  renderHighlightText,
  selectedWordType,
} from '@/core/utils/hcpUtils'
import { Controller, FieldValues } from 'react-hook-form'
import { ControlledField } from '@repo/core-library/types'

type HCPHighlighterProps = {
  highlightedTexts?: (value: string[]) => void
  textToHighlight: string | string[]
}

export const HCPHighlighter: React.FC<HCPHighlighterProps> = ({
  textToHighlight,
  highlightedTexts,
}) => {
  const [highlightedWords, setHighlightedWords] = useState<selectedWordType[]>(
    []
  )
  const mergedText = mergeArrayString(textToHighlight)
  const { styledExtractedValue: item } = useParsedHCPLabelKey(mergedText)
  const wordsInItem = item.split(' ')

  useEffect(() => {
    try {
      const handleMouse = handleHighlight(wordsInItem, setHighlightedWords)
      return handleMouse
    } catch (error) {
      console.error('There was an error in Highlighting Text', error)
    }
  }, [wordsInItem])

  useHighlightedProcessor({
    highlightedWords,
    returnHiglighted: (values) => {
      if (highlightedTexts) {
        highlightedTexts(values)
      }
    },
  })

  return renderHighlightText(wordsInItem, highlightedWords)
}

type Props = {
  content: string | string[]
}

type HighlighterProps<T extends FieldValues> = ControlledField<T> & Props

export function Highlighter<T extends FieldValues>({
  control,
  name,
  content,
}: HighlighterProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        return (
          <div>
            {content ? (
              <HCPHighlighter
                textToHighlight={content}
                highlightedTexts={onChange}
              />
            ) : null}
          </div>
        )
      }}
    />
  )
}
