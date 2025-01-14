import React from "react";
import { InputMask } from "@react-input/mask";

export default function NewUser({ setPhone, setName }) {
  return (
    <>
      <div className="p-[20px] rounded-[10px] bg-[#fff] flex flex-col gap-[10px]">
        <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px] opacity-70">
          Добавить пользователя
        </p>
        <div className="px-[8px] flex items-center gap-x-[4px] bg-[#F3F3F3] rounded-[8px] w-full border-[1px] border-[#F3F3F3] focus-within:border-[2px] focus-within:border-[green]">
          <input
            className="w-full p-[8px]  outline-none  bg-transparent "
            type="text"
            placeholder="ФИО"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="p-[20px] rounded-[10px] bg-[#fff] flex flex-col gap-[10px]">
        <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px] opacity-70">
          Номер телефона
        </p>
        <div className="px-[8px] flex items-center gap-x-[4px] bg-[#F3F3F3] rounded-[8px] w-full border-[1px] border-[#F3F3F3] focus-within:border-[2px] focus-within:border-[green]">
          <InputMask
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-[8px] outline-none  bg-transparent "
            placeholder="Номер телефона"
            mask="+996 (___) __-__-__"
            replacement={{ _: /\d/ }}
          />
        </div>
      </div>
    </>
  );
}
