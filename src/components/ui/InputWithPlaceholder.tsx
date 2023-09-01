import React, { ChangeEvent } from "react";

// Define the props interface for InputWithPlaceholder
interface InputWithPlaceholderProps {
  type: string;
  placeholder: string;
  onChange: (value: number | string) => void;
  errorField: string | null;
  fieldName: string;
}

// Create a new component called InputWithPlaceholder
const InputWithPlaceholder: React.FC<InputWithPlaceholderProps> = ({
  type,
  placeholder,
  onChange,
  errorField,
  fieldName,
}) => {
  // Create a handleChange function that takes a ChangeEvent
  // and calls the onChange function from props with the value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (type === "number") {
      onChange(Number(value));
    } else {
      onChange(value);
    }
  };

  // Return an input element with a placeholder and onChange handler
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className={`bg-slate-700 text-slate-400 p-2 rounded border ${
        // If an errorField is passed in and it matches the fieldName from
        // props, then apply a red border, otherwise apply a gray border
        errorField === fieldName ? "border-rose-600" : "border-slate-600"
      } focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg placeholder:text-slate-400`}
    />
  );
};

export default InputWithPlaceholder;
