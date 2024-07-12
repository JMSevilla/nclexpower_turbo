import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

interface ValidationChecks {
  isLengthValid: boolean;
  containsNumber: boolean;
  containsUppercase: boolean;
}

interface Props {
  validationChecks: ValidationChecks;
}

export const ValidationIndicators = ({ validationChecks }: Props) => {
  return (
    <ul style={{ fontFamily: "Poppins", paddingLeft: "20px" }}>
      <li style={{ color: validationChecks.isLengthValid ? "green" : "red" }}>
        {validationChecks.isLengthValid ? (
          <CheckCircle sx={{ mr: 1 }} />
        ) : (
          <Cancel sx={{ mr: 1 }} />
        )}
        Minimum 6 characters
      </li>
      <li style={{ color: validationChecks.containsNumber ? "green" : "red" }}>
        {validationChecks.containsNumber ? (
          <CheckCircle sx={{ mr: 1 }} />
        ) : (
          <Cancel sx={{ mr: 1 }} />
        )}
        Contains a number
      </li>
      <li
        style={{ color: validationChecks.containsUppercase ? "green" : "red" }}
      >
        {validationChecks.containsUppercase ? (
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
