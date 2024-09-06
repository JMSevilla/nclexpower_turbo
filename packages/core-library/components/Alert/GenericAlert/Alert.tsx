import React from "react";
import { Alert as MuiAlert, AlertProps, AlertTitle } from "@mui/material";
import { Button } from "../../Button/Button";

interface Props {
  severity: AlertProps["severity"];
  title: string;
  description?: string;
  isExpired?: boolean
  remainingDays?:number
  remainingMonths?: number
  validUntil?: string
}

export const Alert: React.FC<Props> = ({ severity, isExpired, ...props }) => {
  const { title, description, remainingDays, remainingMonths, validUntil } = props;

  const validRemainingMonths= remainingMonths !== undefined && `${remainingMonths} month${remainingMonths > 1 ? 's' : ''},`
  const validRemainingDays= remainingDays !== undefined && ` ${remainingDays} day${remainingDays > 1 ? 's' : ''} remaining`
  const isExpiring = remainingMonths && remainingMonths <= 2 && !isExpired;

  return (
    <MuiAlert severity={severity}>
       <AlertTitle>{title}</AlertTitle>
      {description}
      {isExpiring && (
        <React.Fragment>
          <div className="flex flex-col">
          <span>Valid Until: {validUntil}</span>
          <div className="flex-row">
          {remainingMonths > 0 && <span>{validRemainingMonths}</span>}
          <span>{validRemainingDays}</span>
          </div>
          </div>
        </React.Fragment>
    )}
    {isExpired && (
      <React.Fragment>
        <span>Expired on: {validUntil}</span>
        <br />
        <Button >Purchase Another Product</Button>
      </React.Fragment>
    )}
  </MuiAlert>
)}

