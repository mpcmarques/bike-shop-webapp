"use client";

import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type Props = {
  label: React.ReactNode;
  error?: string;
  inputProps: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
};

const FormTextArea = ({ label, error, inputProps }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex gap-2 items-center">{label}</label>
      <textarea {...inputProps} className="input-default" />
      <div className="text-red-500">{error ? error : null}</div>
    </div>
  );
};

export default FormTextArea;
