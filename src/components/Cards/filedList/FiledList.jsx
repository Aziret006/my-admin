import React from "react";
import pie from "../../../img/pie.svg";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
export default function FiledList({
  item,
  index,
  fieldDelete,
  setFieldDelete,
  setDeleteValue,
}) {
  return (
    <div>
      <nav className="grid grid-cols-11 items-center gap-1 w-full  px-[10px] py-[20px] border-b-[2px] border-gray-100">
        <div className="col-span-1 text-left">{index + 1}</div>
        <NavLink
          to={`/fields/${item?.id}`}
          className="col-span-2 text-left hover:text-[#DF2323] duration-300"
        >
          {item?.name}
        </NavLink>
        <div className="col-span-2 text-left">Спортивное поле</div>
        <div className="col-span-2 flex items-center justify-start gap-[10px]">
          {item?.advantages?.map((el) => (
            <img
              className={"w-[20px] h-[20px]"}
              src={el?.advantages?.icon}
              alt=""
            />
          ))}
        </div>
        <div className="col-span-2 flex items-center gap-[2px]">
          <p className="text-base font-normal leading-4 tracking-tighter text-left whitespace-nowrap">
            {item?.rates?.avg_rating?.toFixed(1)} ({item?.rating_num})
          </p>
          <div className="flex items-center">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={item?.rates?.avg_rating}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-end gap-x-[12px]">
          <div className="w-[36px] h-[36px] rounded-[12px] flex justify-center items-center bg-[#7384E8] hover:scale-105 duration-300 cursor-pointer">
            <NavLink to={`/fields/${item?.id}`}>
              <MdOutlineRemoveRedEye className="w-[20px] h-[20px] fill-white" />
            </NavLink>
          </div>
          <div className="w-[36px] h-[36px] rounded-[12px] flex justify-center items-center  bg-[#E5E5E5] hover:scale-105 duration-300 cursor-pointer">
            <NavLink to={`/fields/editType/${item?.id}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.05 3.00002L4.20829 10.2417C3.94996 10.5167 3.69996 11.0584 3.64996 11.4334L3.34162 14.1334C3.23329 15.1084 3.93329 15.775 4.89996 15.6084L7.58329 15.15C7.95829 15.0834 8.48329 14.8084 8.74162 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
                  stroke="#1C1C1C"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.90833 4.20837C10.2667 6.50837 12.1333 8.26671 14.45 8.50004"
                  stroke="#1C1C1C"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 18.3334H17.5"
                  stroke="#1C1C1C"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
          </div>
          <div
            onClick={() => {
              setFieldDelete(!fieldDelete);
              setDeleteValue(item?.id);
            }}
            className="w-[36px] h-[36px] rounded-[12px] flex justify-center items-center bg-[#FFDEDE] hover:scale-105 duration-300 cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="#1C1C1C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.08337 4.14163L7.26671 3.04996C7.40004 2.25829 7.50004 1.66663 8.90837 1.66663H11.0917C12.5 1.66663 12.6084 2.29163 12.7334 3.05829L12.9167 4.14163"
                stroke="#1C1C1C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7083 7.6167L15.1666 16.0084C15.075 17.3167 15 18.3334 12.675 18.3334H7.32496C4.99996 18.3334 4.92496 17.3167 4.83329 16.0084L4.29163 7.6167"
                stroke="#1C1C1C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.60828 13.75H11.3833"
                stroke="#1C1C1C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.91663 10.4166H12.0833"
                stroke="#1C1C1C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  );
}
