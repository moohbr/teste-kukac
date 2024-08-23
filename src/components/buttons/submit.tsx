import React from "react";

interface ButtonSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  labelText: string;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
  type = "submit",
  labelText,
  ...props
}) => {
  return (
    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
      <button
        className="inline-block shrink-0 rounded-md border bg-old-rose-600 px-12 py-3 text-sm font-medium text-old-rose-50 transition hover:bg-transparent hover:text-old-rose-600 focus:outline-none focus:ring active:text-old-rose-500"
        type={type}
        {...props}
      >
        {labelText}
      </button>
    </div>
  );
};

export default ButtonSubmit;
