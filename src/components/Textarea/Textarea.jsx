import React from "react";

export default function Textarea({
  value,
  onchange,
  label,
  placeholder,
  error,
}) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <p className="text-[14px] text-[#1C1C1C] font-normal leading-normal">
        {label}
      </p>
      {error && (
        <p className="text-red-500 text-[14px] font-normal leading-normal ">
          {error}
        </p>
      )}
      <textarea
        onChange={(e) => {
          onchange(e.target.value);
        }}
        value={value}
        className="rounded-[10px] p-[10px] bg-[#f0f0f0] border-[2px] border-[#1C1C1C0D] outline-none focus:border-[2px] focus:border-[green]"
        name=""
        id=""
        rows="5"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
