import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import { SvgIconProps } from "@mui/material/SvgIcon";
import ClearIcon from '@mui/icons-material/Clear';

interface ValidationCriteria {
  isValid: boolean;
  message: string;
}

interface Props {
  criteria: ValidationCriteria[];
  validColor?: string;
  invalidColor?: string;
  iconSize?: SvgIconProps["fontSize"];
}

export const ValidationIndicators = ({
  criteria,
  validColor = "green",
  invalidColor = "red",
  iconSize = "medium",
}: Props) => {
  return (
    <ul style={{ fontFamily: "Poppins", paddingLeft: "20px" }}>
      {criteria.map((criterion, index) => (
        <li
          key={index}
          style={{ color: criterion.isValid ? validColor : invalidColor }}
        >
          {criterion.isValid ? (
            <CheckCircle sx={{ mr: 1 }} fontSize={iconSize} />
          ) : (
            <Cancel sx={{ mr: 1, fontWeight: 700 }} fontSize={iconSize} />
          )}
          <span className="pt-sans-narrow-regular text-lg">{criterion.message}</span>
        </li>
      ))}
    </ul>
  );
};

export default ValidationIndicators;
