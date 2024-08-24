import {
  Stack,
  TextField,
  TextFieldProps,
  StackProps,
  Typography,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import React, {
  useRef,
  RefObject,
  useEffect,
  createRef,
  useState,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react";
import { Controller, FieldValues } from "react-hook-form";
import { ControlledField } from ".";
import { InputLabel, FormHelperText } from "./TextField";
import { ProgressBar } from "../ProgressBar";

type Props = TextFieldProps &
  Pick<StackProps, "gap"> & {
    digits?: number;
    value?: string;
    helperText?: string;
    label?: string;
    error?: boolean;
    onChange?: (_value: string) => void;
    onBlur?: () => void;
    onResend?: () => Promise<void>;
    resendRemainingTime?: number;
    noLabel?: string;
  };

const OTP_DIGIT_COUNT = 6;

const isSingleDigitNumber = (value: string) => /^\d$/.test(value);

const ResendButton: React.FC<{
  onClick?: Props["onResend"];
  isLoading?: boolean;
}> = ({ onClick, isLoading }) => {
  const handleClick = async () => {
    await onClick?.();
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <ProgressBar isLoading={isLoading} />
      ) : (
        <Typography
          onClick={handleClick}
          alignSelf="start"
          fontSize="1.1rem"
          fontWeight="bold"
          mt={1}
          color="primary"
          sx={{
            cursor: "pointer",
          }}
        >
          Send new code
        </Typography>
      )}
    </React.Fragment>
  );
};

const FormattedTime: React.FC<{ seconds: number; hideCanResend: boolean }> = ({
  seconds: remainingSeconds,
  hideCanResend = false,
}) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = `${remainingSeconds % 60}`.padStart(2, "0");

  const formatted = `${minutes}:${seconds}`;
  const canResend = remainingSeconds <= 0;

  return (
    <FormHelperText
      sx={{
        fontWeight: 560,
        fontSize: "1rem",
        mt: 1,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      {!canResend
        ? `Can resend after : ${formatted}`
        : !hideCanResend && "Didn't receive the code?"}
    </FormHelperText>
  );
};

export const HelperText: React.FC<
  Pick<Props, "onResend" | "error" | "helperText"> & {
    seconds: number;
    hideCanResend: boolean;
    isLoading?: boolean;
  }
> = ({
  onResend,
  seconds: remainingSeconds,
  helperText,
  error,
  hideCanResend = false,
  isLoading = false,
}) => {
  const canResend = remainingSeconds <= 0;

  return (
    <Stack>
      <FormHelperText error={error}>{helperText}</FormHelperText>
      <FormattedTime seconds={remainingSeconds} hideCanResend={hideCanResend} />
      {!hideCanResend && canResend && (
        <ResendButton onClick={onResend} isLoading={isLoading} />
      )}
    </Stack>
  );
};

export const OtpField: React.FC<
  Props & { hideCanResend?: boolean; isResendLoading?: boolean }
> = ({
  error,
  digits = OTP_DIGIT_COUNT,
  value,
  helperText,
  onChange,
  onResend,
  variant = "outlined",
  label,
  gap = 1,
  resendRemainingTime = 0,
  sx,
  inputProps,
  noLabel = false,
  hideCanResend = false,
  isResendLoading = false,
  ...rest
}) => {
  const [pin, setPin] = useState<string[]>([]);
  const refs = useRef<RefObject<HTMLInputElement>[]>([]);
  const [remainingTime, setRemainingTime] = useState(resendRemainingTime);

  useEffect(() => {
    refs.current = Array(digits)
      .fill(0)
      .map(() => createRef());

    return () => {
      refs.current = [];
    };
  }, [digits]);

  useEffect(() => {
    const arr = value?.slice(0, digits + 1).split("") ?? [];
    const p = Array(digits)
      .fill(0)
      .map((_, i) => arr[i] ?? "");
    setPin(p);
  }, [value, digits]);

  useEffect(() => {
    setRemainingTime(resendRemainingTime);
  }, [resendRemainingTime]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingTime]);

  const handleChange =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      const text = event.target.value;
      const isNumberOrEmpty = isSingleDigitNumber(text) || text === "";

      if (!isNumberOrEmpty) {
        return event.preventDefault();
      }

      setPin((prevPin) => {
        const newValue = prevPin.map((val, i) => {
          if (index === i) return text;
          return val;
        });
        onChange?.(newValue.join(""));
        return newValue;
      });
    };

  const moveToNext =
    (index: number): KeyboardEventHandler<HTMLInputElement> =>
    (event) => {
      const { key } = event;

      if (key === "Backspace" || key === "Delete") {
        setPin((prevPin) => {
          const newPin = prevPin.map((v, i) => (index === i ? "" : v));
  
          const prev = index - 1;
          if (prev > -1 && prevPin[index] === "") {
            refs.current[prev]?.current?.focus();
          }
  
          onChange?.(newPin.join(""));
  
          return newPin;
        });
  
        return; 
      }

      if (!isSingleDigitNumber(key)) return;

      if (index < digits - 1) {
        refs.current[index + 1].current?.focus();
      }
    };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData
      .getData("text")
      .slice(0, digits)
      .split("")
      .filter(isSingleDigitNumber);

    setPin((prevPin) => {
      const newPin = prevPin.map((val, i) => paste[i] || val);
      onChange?.(newPin.join(""));
      return newPin;
    });

    paste.forEach((char, index) => {
      if (refs.current[index]) {
        refs.current[index]!.current!.value = char;
        refs.current[index]!.current!.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }
    });

    const lastFilledIndex = paste.length - 1;
    if (refs.current[lastFilledIndex]) {
      refs.current[lastFilledIndex].current!.focus();
    }
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="column" mx="auto">
        {label && <InputLabel error={error}>{label}</InputLabel>}
        <Stack
          maxWidth={550}
          gap={gap}
          mb={3}
          direction="row"
          justifyContent="space-round"
        >
          {pin.map((v, i) => (
            <TextField
              sx={{
                width: ["100%", "100%"],
                height: [50, 60],
                ...sx,
              }}
              tabIndex={i + 1}
              inputRef={refs.current[i]}
              inputProps={{
                autoComplete: "off",
                sx: {
                  px: 1,
                  py: 1.3,
                  height: 50,
                  width: "100%",
                  textAlign: "center",
                  border: "1px solid #007AB7",
                },
              }}
              variant={variant}
              key={i}
              autoFocus={i === 0}
              onKeyDown={moveToNext(i)}
              onChange={handleChange(i)}
              onPaste={handlePaste}
              value={v}
              error={error}
              {...rest}
            />
          ))}
        </Stack>
        {!noLabel && (
          <HelperText
            error={error}
            helperText={helperText}
            onResend={onResend}
            seconds={remainingTime}
            hideCanResend={hideCanResend}
            isLoading={isResendLoading}
          />
        )}
      </Stack>
    </Stack>
  );
};

type ControlledOtpFieldProps<T extends FieldValues> = ControlledField<T> &
  Props & { hideCanResend?: boolean; isResendLoading?: boolean };

export function ControlledOtpField<T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledOtpFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <OtpField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={Boolean(error?.message)}
            helperText={error?.message?.trim()}
            {...rest}
          />
        );
      }}
    />
  );
}
