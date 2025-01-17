import React from "react";
import blockimage from "../../../img/blockimage.svg";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";

export default function BookId({
  item,
  setFieldDelete,
  fieldDelete,
  setDeleteValue,
}) {
  return (
    <div>
      <div className={""}>
        <div
          className={
            "w-[100%] relative shadow-lg top-0 left-0 right-0 rounded-[15px]"
          }
        >
          <div className={"w-[100%]"}>
            <div className={"w-[100%]"}>
              <div
                className={
                  "absolute top-[12px] right-[12px] flex items-center gap-[10px] "
                }
              >
                <NavLink
                  to={`/fields/${item?.id}`}
                  className="w-[36px] h-[36px] cursor-pointer bg-[#fff] backdrop-blur-sm rounded-full flex justify-center items-center bg-opacity-30 duration-300	hover:scale-105"
                >
                  <MdOutlineRemoveRedEye className="w-[20px] h-[20px] fill-white " />
                </NavLink>
                <div
                  onClick={() => {
                    setFieldDelete(!fieldDelete);
                    setDeleteValue(item?.id);
                  }}
                  className="w-[36px] h-[36px] cursor-pointer bg-[#fff] backdrop-blur-sm rounded-full flex justify-center items-center bg-opacity-30 duration-300	hover:scale-105"
                >
                  <MdDeleteOutline className="w-[20px] h-[20px] fill-white " />
                </div>
                <div className="w-[36px] h-[36px] cursor-pointer bg-[#fff] backdrop-blur-sm rounded-full flex justify-center items-center bg-opacity-30 duration-300	hover:scale-105">
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
                        stroke="#ffffff"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.90833 4.20837C10.2667 6.50837 12.1333 8.26671 14.45 8.50004"
                        stroke="#ffffff"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.5 18.3334H17.5"
                        stroke="#ffffff"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </NavLink>
                </div>
              </div>
              <NavLink className={"w-[100%]"} to={`/fields/${item?.id}`}>
                <img
                  className={"w-[100%] h-[160px] object-cover rounded-t-[15px]"}
                  src={item?.main_foto || blockimage}
                  alt=""
                />
              </NavLink>
              {item?.min_price && (
                <div
                  className={
                    "absolute top-[115px] left-0 z-10 bg-[#FFF]  py-[6px] pl-[14px] pr-[20px] rounded-r-[6px] backdrop-blur-sm bg-opacity-30"
                  }
                >
                  <h4
                    className={
                      "text-[14px] leading-[16px] font-[500] text-[#fff]"
                    }
                  >
                    {item?.min_price} сом / час
                  </h4>
                </div>
              )}
            </div>
          </div>
          <div className="px-[14px] py-[10px]">
            <div className={"flex flex-col gap-[10px]"}>
              <div>
                <h4 className="text-[16px] leading-[19px] font-[500] text-[#222222] dark:text-[#fff]">
                  {item?.name}
                </h4>
                <p className="text-[#222222] text-[12px] leading-[16px] font-[500] opacity-70 dark:text-[#fff]">
                  {item?.sport_complex_type?.title}
                </p>
              </div>
              {item?.advantages?.length > 0 && (
                <div className={"flex justify-start items-center gap-[10px]"}>
                  {item?.advantages?.map((el, index) => (
                    <img
                      key={index}
                      className={"w-[20px] h-[20px] dark:full-[#fff]"}
                      src={el?.advantages?.icon}
                      alt=""
                    />
                  ))}
                </div>
              )}
              <div className={"flex justify-start items-center gap-1"}>
                <p className="text-[#222222] text-[14px] leading-[16px] font-[500]">
                  {item?.rates?.avg_rating?.toFixed(1)} (
                  {item?.rates?.rating_num})
                </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
