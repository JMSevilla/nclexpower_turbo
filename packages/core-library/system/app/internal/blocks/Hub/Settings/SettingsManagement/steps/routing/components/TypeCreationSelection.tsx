import { Card } from "../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { MenuType } from "../../../types";

interface Props {
  setCreateMainType: (value: MenuType) => void;
}

export const TypeCreationSelection = ({ setCreateMainType }: Props) => {
  const { setValue } = useFormContext();

  const handleContinue = (type: MenuType) => {
    setCreateMainType(type);
    setValue("type", type);
  };

  return (
    <Box
      sx={{
        width: "70%",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
        Select Menu Type
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          bgcolor: "#fefefe",
          marginTop: "15px",
        }}
      >
        <Card
          onClick={() => handleContinue("Main")}
          sx={{
            width: "50%",
            paddingY: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "10px",
            cursor: "pointer",
            maxWidth: "350px",
          }}
        >
          Menu
        </Card>
        <Card
          onClick={() => handleContinue("SubMenu")}
          sx={{
            width: "50%",
            paddingY: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "10px",
            cursor: "pointer",
            maxWidth: "350px",
          }}
        >
          Menu with Sub Menu
        </Card>
      </Box>
    </Box>
  );
};
