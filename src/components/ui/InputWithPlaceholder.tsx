import React, { ChangeEvent } from "react";

interface InputWithPlaceholderProps {
  type: string;
  placeholder: string;
  onChange: (value: number | string) => void;
  errorField: string | null;
  fieldName: string;
}

const InputWithPlaceholder: React.FC<InputWithPlaceholderProps> = ({
  type,
  placeholder,
  onChange,
  errorField,
  fieldName,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      onChange(Number(e.target.value));
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className={`bg-slate-700 text-slate-400 p-2 rounded border ${
        errorField === fieldName ? "border-rose-600" : "border-slate-600"
      } focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg placeholder:text-slate-400`}
    />
  );
};

export default InputWithPlaceholder;
