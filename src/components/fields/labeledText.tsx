import React from "react";

interface LabeledInputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type: string;
  labelText?: string;
  required?: boolean;
  spanSize: number;
}

const LabeledInputText: React.FC<LabeledInputTextProps> = ({
  id,
  type,
  labelText,
  required = false,
  spanSize,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`col-span-6 sm:col-span-${spanSize.toString()}`}>
      {labelText && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-old-rose-700"
        >
          {labelText}
        </label>
      )}
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="shawdow-inner mt-1 w-full rounded-md border-old-rose-200 bg-old-rose-50 text-sm text-old-rose-700 shadow-sm shadow-old-rose-950 focus:border-old-rose-500 focus:ring-old-rose-500 sm:text-sm"
        {...props}
      />
    </div>
  );
};

export default LabeledInputText;
