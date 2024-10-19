import { ZxcvbnResult } from "@zxcvbn-ts/core";
import { createPasswordLabel } from "../../utils/password-strength-meter";
import React from "react";

interface Props {
  result: ZxcvbnResult;
}

export const PasswordStrengthMeter: React.FC<Props> = ({ result }) => {
  return (
    <div className="password-strength-meter">
      <progress
        className={`password-strength-meter-progress strength-${createPasswordLabel({ result })}`}
        value={result.score}
        max="4"
      />
      <br />
      <label className="password-strength-meter-label">
        <strong>Password strength:</strong> {createPasswordLabel({ result })}
      </label>
    </div>
  );
};
