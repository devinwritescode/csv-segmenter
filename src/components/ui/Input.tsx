import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: number | string | null;
  onChange: (value: number | null) => void;
  errorField: string | null;
  fieldName: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  errorField,
  fieldName,
}) => {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span>{label}:</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => {
          const parsedValue = parseInt(e.target.value);
          if (!isNaN(parsedValue)) {
            onChange(parsedValue);
          } else {
            onChange(null);
          }
        }}
        className={`bg-slate-700 text-slate-400 p-2 rounded border ${
          errorField === fieldName ? "border-rose-600" : "border-slate-600"
        } focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg`}
      />
    </div>
  );
};

export default Input;
