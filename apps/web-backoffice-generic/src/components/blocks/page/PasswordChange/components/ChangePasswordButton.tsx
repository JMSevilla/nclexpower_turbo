import { Button } from "core-library/components";

interface ChangePasswordButtonProps {
  handleButtonClick: () => void;
  validSecQAndSecA: boolean;
  watch: (name: string) => any;
}

export function ChangePasswordButton({
  handleButtonClick,
  validSecQAndSecA,
  watch,
}: ChangePasswordButtonProps) {
  return (
    <div className="mt-4">
      <Button
        variant="contained"
        fullWidth
        disabled={!watch("securityQuestion") || !watch("securityAnswer")}
        onClick={handleButtonClick}
        sx={{
          px: 4,
          py: 2,
          borderRadius: "10px",
          backgroundColor: "#0F2A71",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        {validSecQAndSecA ? "Change Password" : "Submit"}
      </Button>
    </div>
  );
}
