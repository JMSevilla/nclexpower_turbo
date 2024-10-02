import { Box, Typography } from '@mui/material'
import React from 'react'
import { FieldErrors } from 'react-hook-form'
import { useMapErrors } from '../../hooks'

type ErrorMappingPropsType = {
    errors: FieldErrors
    parentPath?: string
}

export const ErrorMapping: React.FC<ErrorMappingPropsType> = ({ errors, parentPath }) => {
    const errorMap = useMapErrors(errors, parentPath)

    if (!errorMap) return

    return (
        <React.Fragment>
            {Object.keys(errorMap).length > 0 && (
                <Box m={3} p={3}>
                    <Box width="100%">
                        {Object.keys(errorMap).map((key, index) => (
                            <Box key={index}>
                                <Typography color="red" fontSize="11px">
                                    {errorMap[key]}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </React.Fragment >
    )
}