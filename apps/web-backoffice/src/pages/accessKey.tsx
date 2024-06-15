import { Grid, Button, Box, Typography } from '@mui/material'
import * as yup from "yup"
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NonCMSTextField, TextField } from '@repo/core-library/components';



export const accessKey = () => {
    const AccessKeySchema = yup.object({
        accessKey: yup.string().required("This is Required").default(''),
    });
    type AccessKeyType = yup.InferType<typeof AccessKeySchema>;


    const form = useForm({
        mode: "onSubmit",
        resolver: yupResolver(AccessKeySchema),
        defaultValues: AccessKeySchema.getDefault(),
    });

    const { control, handleSubmit, formState } = form;

    function onSubmit(values: AccessKeyType) {
        console.log("values : ", values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                style={{ background: 'linear-gradient(to right bottom, #fff, #b5deff)' }}
                sx={{
                    flexGrow: 1,
                    gap: 3,
                    height: "100dvh",
                    width: "100dvw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Grid xs={6} sx={{ display: "flex", gap: 2 }} >
                    <Typography fontSize={25} sx={{ fontFamily: 'Arial', fontWeight: "600" }}>Enter Access Key</Typography>
                </Grid>
                <Grid container xs={6} spacing={2} columns={{ xs: 8, sm: 8, md: 8, lg: 12 }} sx={{ display: "flex", justifyContent: "center", alignContent: "start" }}>
                    <Grid item xs={12}>
                        <NonCMSTextField
                            control={control}
                            name="accessKey"
                            label="Enter Accessor Key"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#000",
                                    fontFamily: "Arial",
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#2e2e2e",
                                    fontWeight: "bold",
                                },
                            }}
                            style={{ width: "100%", height: "70px" }}
                            inputProps={{
                                style: {
                                    fontSize: 18,
                                    height: 70,
                                    width: "100%",
                                    padding: '0 14px',
                                    fontWeight: 'bold',
                                    background: "#eef7ff"
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            sx={{ width: "100%", height: "70px" }}
                            style={{ background: "#81c3f9" }}
                            variant="contained">Login</Button>
                    </Grid>
                </Grid>
            </Box >
        </form>

    )
}

export default accessKey