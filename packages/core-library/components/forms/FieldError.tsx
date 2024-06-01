import { Typography } from "@mui/material";
import { useGlobalsContext, InterpolationTokens } from "../../contexts";

interface Props {
  tokens?: InterpolationTokens;
  messageKey: string;
  bolded?: boolean;
}

export const FieldError: React.FC<Props> = ({
  messageKey,
  bolded = true,
  tokens,
}) => {
  const { errorByKey } = useGlobalsContext();

  return (
    <Typography color="error" fontWeight={bolded ? "bold" : "normal"}>
      {errorByKey(messageKey, tokens)}
    </Typography>
  );
};
