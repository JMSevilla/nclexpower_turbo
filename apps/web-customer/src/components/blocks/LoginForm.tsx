import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  LoginFormType,
} from " core-library/components/blocks/LoginFormBlock/validation";
import { TextField } from " core-library/components";
import CoreZigma from "../images/CoreZigma.png";
import { MedicineLoginBG } from "../icons/MedicineLoginBG";

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  return (
    <Grid
      container
      sx={{
        minHeight: { lg: "100vh" },
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Grid
        item
        xs={12}
        lg={5}
        xl={7}
        sx={{ order: { lg: 2 }, height: "100vh" }}
      >
        <MedicineLoginBG />
      </Grid>
      <Grid
        item
        xs={12}
        lg={7}
        xl={5}
        sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}
      >
        <Box sx={{ maxWidth: { xs: "xl", lg: "3xl" } }}>
          <div className="flex items-center justify-center">
            <Box
              component="img"
              src={CoreZigma.src}
              alt="CoreZigma"
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: "#007AB7",
                marginLeft: 1,
                fontFamily: "Arial, sans-serif",
              }}
            >
              NCLEX Power
            </Typography>
          </div>

          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
          >
            Welcome to the <span style={{ color: "#007AB7" }}>Core-Zigma</span>{" "}
            System
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField control={control} label="Username" name="username" />
            </Grid>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField
                control={control}
                label="Password"
                type="password"
                name="password"
              />
            </Grid>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ marginY: 2 }}
            />
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
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
