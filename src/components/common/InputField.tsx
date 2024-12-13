import { InputFieldProps } from "../../types/types";

function InputField({
  value,
  handleChange,
  type,
  name,
  label,
  minLength,
  maxLength,
}: InputFieldProps) {
  return (
    <label className="block text-nord3">
      {label}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        minLength={minLength || undefined}
        maxLength={maxLength || undefined}
        required
        className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
      />
    </label>
  );
}

export default InputField;
