"use client";

// types
type InputFieldProps = {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({ label, id, value, onChange }: InputFieldProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm text-zinc-700 mb-1 font-bold"
      >
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full bg-zinc-900/10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2  transition-colors"
      />
    </>
  );
};
