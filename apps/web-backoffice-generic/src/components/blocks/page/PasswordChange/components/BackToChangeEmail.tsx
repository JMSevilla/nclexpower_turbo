import { Link } from "core-library/components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface BackToChangeEmailProps {
  href: string;
  text: string;
}

export function BackToChangeEmail({ href, text }: BackToChangeEmailProps) {
  return (
    <Link
      sx={{
        fontSize: "16px",
        color: "blue",
        textDecoration: "none",
      }}
      href={href}
    >
      <ArrowBackIosNewIcon fontSize="inherit" /> {text}
    </Link>
  );
}
