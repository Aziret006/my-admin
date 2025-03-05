import React from "react";
import img5 from "../../img/img5.svg";
import { useSelector } from "react-redux";
export default function Schedule() {
  const { fieldsIdList, fieldsIdDetail } = useSelector((state) => state.fields);
  const week = [
    {
      id: 0,
      title: "Понедельник",
    },
    {
      id: 1,
      title: "Вторник",
    },
    {
      id: 2,
      title: "Среда",
    },
    {
      id: 3,
      title: "Четверг",
    },
    {
      id: 4,
      title: "Пятница",
    },
    {
      id: 5,
      title: "Суббота",
    },
    {
      id: 6,
      title: "Воскресенье",
    },
  ];
  console.log(fieldsIdDetail?.schedule);
  

  return (
    <>
      {fieldsIdDetail?.schedule?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
          <div className="">
            <div className="p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]">
              <h4 className="text-[16px] leading-[18px] font-bold">
                График работы
              </h4>
            </div>
            <div className=" bg-white rounded-b-[12px] shadow-md p-[20px]">
              <div className="flex flex-col gap-[30px]">
                {fieldsIdDetail?.schedule?.map((item, index) => {
                  const isLastItem =
                    index !== fieldsIdDetail?.schedule?.length - 1;
                  const weekDay = week?.find(
                    (el) => el.id === item?.day_of_week
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 last:text-[#DF2323]"
                    >
                      <div className="w-[12px] h-[12px] bg-[#222222] rounded-full flex justify-center items-start">
                        {isLastItem && (
                          <div className="w-[2px] h-[50px] bg-[#222222] rounded-full" />
                        )}
                      </div>
                      <p className="text-[14px] leading-[16px] text-[#222222]">
                        <span className="font-bold">{weekDay?.title} -</span>{" "}
                        <span>
                          {item?.start_time} - {item?.end_time}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[150px] text-[14px] leading-[16px] text-[#222222]">
          Нет данных
        </div>
      )}
    </>
  );
}
