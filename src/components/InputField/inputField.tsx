import React, { FocusEventHandler } from "react";
interface propsType {
  type: string;
  name: string;
  id?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: FocusEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  className?: string;
}
export default function InputField({
  id,
  name,
  value,
  type,
  onBlur,
  onChange,
  className,
  placeholder,
}: propsType) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      className={`text-sColor focus:outline-sColor font-bold  p-2 max-w-[150px] input-change  ${className}`}
    />
  );
}
