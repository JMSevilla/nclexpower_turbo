import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

interface Props {
  isLengthValid: boolean;
  containsNumber: boolean;
  containsUppercase: boolean;
}

export const ValidationIndicators = ({
  isLengthValid,
  containsNumber,
  containsUppercase,
}: Props) => {
  return (
    <ul style={{ fontFamily: "Poppins", paddingLeft: "20px" }}>
      <li style={{ color: isLengthValid ? "green" : "red" }}>
        {isLengthValid ? (
          <CheckCircle sx={{ mr: 1 }} />
        ) : (
          <Cancel sx={{ mr: 1 }} />
        )}
        Minimum 6 characters
      </li>
      <li style={{ color: containsNumber ? "green" : "red" }}>
        {containsNumber ? (
          <CheckCircle sx={{ mr: 1 }} />
        ) : (
          <Cancel sx={{ mr: 1 }} />
        )}
        Contains a number
      </li>
      <li style={{ color: containsUppercase ? "green" : "red" }}>
        {containsUppercase ? (
          <CheckCircle sx={{ mr: 1 }} />
        ) : (
          <Cancel sx={{ mr: 1 }} />
        )}
        Contains an uppercase letter
      </li>
    </ul>
  );
};

export default ValidationIndicators;
