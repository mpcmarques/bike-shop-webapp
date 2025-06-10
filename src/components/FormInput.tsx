"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  label: React.ReactNode;
  error?: string;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const FormInputField = ({ label, error, inputProps }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {inputProps.type === "checkbox" ? (
        <div className="flex gap-8">
          <label className="flex gap-2 items-center">{label}</label>
          <input {...inputProps} className="input-default" />
        </div>
      ) : (
        <>
          <label className="flex gap-2 items-center">{label}</label>
          <input {...inputProps} className="input-default" />
        </>
      )}

      <div className="text-red-500">{error ? error : null}</div>
    </div>
  );
};

export default FormInputField;
