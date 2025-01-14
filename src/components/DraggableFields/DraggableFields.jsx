import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, setBookings } from "../../store/slice/story";
import { FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import { format } from "date-fns";

export default function DraggableFields() {
  const { fieldsIdList, fieldsIdDetail } = useSelector((state) => state.fields);
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.story);
  const [selectValue, setSelectValue] = useState(
    fieldsIdList?.football_field_type[0]?.name || null
  );
  const [selectOptions, setSelectOptions] = useState(false);

  useEffect(() => {
    if (fieldsIdList?.football_field_type?.length > 0) {
      dispatch(fetchBookings(fieldsIdList?.football_field_type[0]?.id));
    } else {
      dispatch(setBookings(null));
    }
  }, []);

  return (
    <div>
      <div
        className={
          "bg-[#fff] max-h-[640px] p-[16px] md:p-[30px] rounded-[10px] flex flex-col gap-[20px] border-[1px] border-[#E9E9E9]"
        }
      >
        <div className={""}>
          <div className={"flex justify-between items-center gap-1"}>
            <h4
              className={"font-normal text-[24px] text-[#000] leading-normal"}
            >
              Calendar
            </h4>
            {fieldsIdList?.football_field_type?.length > 0 && (
              <div className="relative">
                <div
                  onClick={() => setSelectOptions(!selectOptions)}
                  className=" text-[16px] p-[10px] w-full rounded-[12px] text-[#000] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <p className="">{selectValue}</p>
                  <FaAngleDown className="w-4 h-4" />
                </div>
                {selectOptions && (
                  <div className="absolute top-[-30%] left-0 w-full bg-[#656565] rounded-[8px] z-50 py-[7px] shadow-lg">
                    {fieldsIdList?.football_field_type?.map((item) => {
                      return (
                        <div
                          key={item?.id}
                          onClick={() => {
                            setSelectOptions(!selectOptions);
                            setSelectValue(item?.name);
                            dispatch(fetchBookings(item?.id));
                          }}
                          className="text-[16px] text-[#fff] py-[6px] px-[12px] lg:px-[16px] hover:bg-[#4d4c4c] duration-300 cursor-pointer "
                        >
                          {item?.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <table
          className={
            "flex flex-col gap-2 overflow-y-auto webkit-scrollbar webkit-scrollbar-track:[#423e3e1a] webkit-scrollbar-thumb"
          }
        >
          <thead>
            <tr className={"grid grid-cols-4 gap-1"}>
              <td
                className={
                  "col-span-2 text-[#AEAEAE] text-[16px] leading-[19px] font-normal"
                }
              >
                Имя
              </td>
              <td className="text-[#AEAEAE] text-[16px] leading-[19px] font-normal">
                День
              </td>
              <td className="text-[#AEAEAE] text-[16px] leading-[19px] font-normal">
                Время
              </td>
            </tr>
          </thead>
          <tbody>
            {bookings?.results?.length > 0 ? (
              <>
                {bookings?.results?.map((res, i) => (
                  <tr
                    key={i}
                    className={
                      "border-b-[1px] border-[#423e3e1a] py-[13px] grid grid-cols-4 "
                    }
                  >
                    <td
                      className={
                        "text-[#404040] text-[14px] leading-[19px] font-normal col-span-2"
                      }
                    >
                      {res?.name}
                    </td>
                    <td
                      className={
                        "text-[#AEAEAE] text-[14px] leading-[19px] font-normal"
                      }
                    >
                      {format(res?.create_date, "dd.MM.yyyy")}
                    </td>
                    <td
                      className={
                        "text-[#AEAEAE] text-[14px] leading-[19px] font-normal"
                      }
                    >
                      {format(res?.start_date, "HH:mm")}-
                      {format(res?.end_date, "HH:mm")}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className={"flex items-center justify-center mt-[16px]"}>
                <td
                  colSpan={4}
                  className={
                    "text-[#404040] text-[14px] leading-[19px] text-center font-normal "
                  }
                >
                  Нет записей
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
