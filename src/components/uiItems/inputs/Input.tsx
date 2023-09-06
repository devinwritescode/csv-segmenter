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
  label, // The label for the input
  type, // The type of the input
  value, // The value of the input
  onChange, // The function to call when the value of the input changes
  errorField, // The field with an error
  fieldName, // The name of the input field with an error
}) => {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span>{label}:</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => {
          console.log("Current value of errorField in Input.tsx:", errorField);
          const parsedValue = parseInt(e.target.value);
          if (isNaN(parsedValue)) {
            onChange(null);
          } else {
            onChange(parsedValue);
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
