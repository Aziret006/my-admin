import React, { useState } from "react";
import blockimage from "../../../img/blockimage.svg";
import edit from "../../../img/edit.svg";
import { NavLink } from "react-router-dom";
import trash from '../../../img/trash.svg'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
export default function BookId({ item }) {

  return (
    <div>
      <div className={''}>
        <div className={'w-[100%] relative shadow-lg top-0 left-0 right-0 rounded-[15px]'}>
          <div className={'w-[100%]'}>
            <div className={'w-[100%]'}>
              <div className={'absolute top-[12px] right-[12px] flex items-center gap-[10px] '}>
                <img className={'w-[24px] h-[24px] cursor-pointer'} src={trash} alt="" />
                <img className={'w-[24px] h-[24px] cursor-pointer'} src={edit} alt="" />
              </div>
              <NavLink className={'w-[100%]'} to={`/fields/${item?.id}`}>
                <img className={'w-[100%] h-[160px] object-cover rounded-t-[15px]'} src={item?.main_foto || blockimage} alt="" />
              </NavLink>
              <div className={'absolute top-[115px] left-0 z-10 bg-[#FFFFFF4D]  py-[6px] pl-[14px] pr-[20px] rounded-r-[6px]'}>
                <h4 className={'text-[14px] leading-[16px] font-[500] text-[#fff]'}>{item?.min_price} сом / час</h4>
              </div>
            </div>
          </div>
          <div className="px-[14px] py-[10px]">
            <div className={'flex flex-col gap-[10px]'}>
              <div className={''}>
                <h4 className="text-[16px] leading-[19px] font-[500] text-[#222222] ">{item?.name}</h4>
                <p className="text-[#222222] text-[12px] leading-[16px] font-[500] opacity-70">Спортивный комплекс</p>
              </div>
              <div className={'flex justify-start items-center gap-[10px]'}>
                {item?.advantages?.map((el) => (
                  <img className={'w-[20px] h-[20px]'} src={el?.icon} alt="" />
                ))}
              </div>
              <div className={'flex justify-start items-center gap-1'}>
                <p className="text-[#222222] text-[14px] leading-[16px] font-[500]">{item?.avg_rating} ({item?.rating_num})</p>
                <Stack spacing={1}>
                  <Rating name="half-rating-read" defaultValue={item?.avg_rating} precision={0.5} readOnly />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
