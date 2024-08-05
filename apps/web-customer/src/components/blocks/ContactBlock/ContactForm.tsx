import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextField } from "core-library/components";
import { ContactFormType } from "@/core";
import { Control, UseFormHandleSubmit } from "react-hook-form";

interface FormValues {
  control: Control<ContactFormType>;
  handleSubmit: UseFormHandleSubmit<ContactFormType>;
  onSubmit: (data: ContactFormType) => void;
}

export const ContactForm: React.FC<FormValues> = ({
  control,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="absolute w-full h-screen z-0 bg-pricing "></div>
      <Grid container sx={{ width: "60%", zIndex: 1 }}>
        <Grid item xl={12} sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}>
          <div className="flex items-center p-12 justify-center flex-col bg-white border rounded-md">
            <div className="text-center mb-5">
              <Typography
                variant="h3"
                component="span"
                sx={{
                  color: "#007AB7",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Connect with us
              </Typography>
              <p>The NCLEX team would love to hear from you.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <Grid item lg={12} sx={{ marginY: 2, display: "flex", gap: 1 }}>
                <TextField
                  name="firstName"
                  control={control}
                  label="First Name"
                />
                <TextField
                  name="lastName"
                  control={control}
                  label="Last Name"
                />
              </Grid>
              <Grid item lg={12} sx={{ marginY: 2 }}>
                <TextField name="email" control={control} label="Email" />
              </Grid>
              <Grid item lg={12} sx={{ marginY: 2 }}>
                <TextField
                  multiline
                  rows={5}
                  control={control}
                  name="message"
                  label="Message"
                  placeholder="Kindly enter your message here..."
                />
              </Grid>
              <Box
                sx={{
                  gridColumn: "span 10",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ px: 4, py: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};
