import { DesktopDatePicker } from "@mui/x-date-pickers";
import { CircularProgress, OutlinedInputProps } from "@mui/material";
import { BaseTextFieldProps } from "@mui/material/TextField/TextField";
import React, { useRef } from "react";
import { formatDate } from "../../../core";

interface Props {
  id?: string;
  minDate?: Date;
  maxDate?: Date;
  isLoading?: boolean;
  value?: Date | null;
  label?: string;
  buttonAriaLabel?: string;
  onFocus?: OutlinedInputProps["onFocus"];
  onBlur?: OutlinedInputProps["onBlur"];
  disabled?: boolean;
  placeholder?: string;
  inputProps?: BaseTextFieldProps & { "data-testid"?: string };
  onYearChange?(date: Date | null): void;
  onOpen?(): void;
  onMonthChange?(): void;
  onChange(date: Date | null, rawValue: string | null): void;
  onAccept?(date: Date | null): void;
  onClose?(): void;
}

export const defaultDatePickerFormat = "dd-MM-yyyy";
const NUMERIC_REGEX = /^[0-9]+$/;

const defaultDatePickerProps = {
  inputFormat: defaultDatePickerFormat,
  mask: "__-__-____",
  renderLoading: () => <CircularProgress color="primary" />,
  allowSameDateSelection: true,
};

export const DatePicker: React.FC<Props> = ({
  id,
  buttonAriaLabel,
  minDate,
  value,
  maxDate,
  isLoading,
  label,
  onChange,
  onClose,
  onAccept,
  onBlur,
  onFocus,
  onOpen,
  onMonthChange,
  onYearChange,
  disabled,
  placeholder,
  inputProps,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <DesktopDatePicker
      {...defaultDatePickerProps}
      value={value as any}
      loading={isLoading}
      disabled={disabled}
      minDate={minDate as any}
      maxDate={maxDate as any}
      onAccept={onAccept}
      onChange={(value, raw) => {
        const rawValue =
          typeof raw === "string"
            ? raw
            : value && formatDate(value, defaultDatePickerProps.inputFormat);
        onChange(value, rawValue ?? null);
      }}
      onOpen={() => {
        onOpen?.();
        setTimeout(addMissingAriaProps, 200);
      }}
      onYearChange={(date: Date) => {
        onYearChange?.(date);
        setTimeout(enableTabNavigationOnDays, 200);
        setTimeout(addMissingAriaProps, 200);
      }}
      onMonthChange={() => {
        onMonthChange?.();
        setTimeout(enableTabNavigationOnDays, 200);
        setTimeout(addMissingAriaProps, 200);
      }}
      onClose={onClose}
      inputRef={inputRef as any}
    />
  );

  function enableTabNavigationOnDays() {
    const daysButtons = popperRef.current?.querySelectorAll<HTMLButtonElement>(
      'div[role="cell"]  > button:not([disabled])'
    );
    Array.from(daysButtons ?? []).forEach((btn) =>
      btn.setAttribute("tabIndex", "0")
    );
  }

  function addMissingAriaProps() {
    const presentationBox = popperRef.current?.querySelector<HTMLDivElement>(
      'div[role="presentation"]'
    );
    presentationBox?.setAttribute("id", "monthShowing");
    const calendarGrid =
      popperRef.current?.querySelector<HTMLDivElement>('div[role="grid"]');
    calendarGrid?.setAttribute("aria-labelledby", "monthShowing");
    calendarGrid?.setAttribute("aria-controls", "dateGrid");
    calendarGrid?.setAttribute("aria-live", "polite");
    calendarGrid?.setAttribute("id", "dateGrid");
  }
};
