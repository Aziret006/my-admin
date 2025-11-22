import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Select({ setName, name }) {
  const [select, setSelect] = useState(false);
  const { typeName } = useSelector((state) => state.createFoobol);

  const handleSelect = (option) => {
    setName({
      name: option.name,
      slug: option.slug,
    });
    setSelect(false);
  };

  const options = [
    { name: "Стандарт", slug: "standart" },
    { name: "Футзал", slug: "futzal" },
    { name: "Мини зал", slug: "mini-zal" },
  ];

  return (
    <div className="flex flex-col gap-y-[8px]">
      <p className="text-[14px] text-[#1C1C1C] font-normal leading-normal">
        Добавьте типы футбольных полей
      </p>
      <div className="relative">
        <div
          onClick={() => setSelect(!select)}
          className="flex justify-between items-center py-[10px] px-[14px] bg-[#F0F0F0] rounded-[10px] cursor-pointer border-[2px] border-[#1C1C1C0D]"
        >
          <p className="text-[16px] text-[#1C1C1C] font-normal leading-normal">
            {typeof slug === "string" ? name : name?.slug || "Выберите тип"}
          </p>
          <IoIosArrowDown className="w-6 h-6" />
        </div>
        {select && (
          <>
            <div
              onClick={() => setSelect(false)}
              className="w-full h-full fixed top-0 left-0 bg-[rgba(255,255,255,0.3)] z-40"
            ></div>
            <div className="absolute w-[50%] right-0 top-[40px] h-auto bg-[#fff] rounded-[14px] p-[14px] shadow-md z-50 flex flex-col gap-y-[10px]">
              {options.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`flex justify-between items-center px-[17px] py-[5px] rounded-[10px] cursor-pointer ${
                    item.name === (typeof slug === "string" ? name : name?.slug)
                      ? "bg-[#F0F0F0]"
                      : ""
                  }`}
                >
                  <p className="text-[15px] text-[#0E1422] font-normal leading-[26px]">
                    {item.slug}
                  </p>
                  {item.name ===
                    (typeof name === "string" ? name : name?.name) && (
                    <FaCheck className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
