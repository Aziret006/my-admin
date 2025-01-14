import React from "react";
import Icon from "../../img/avatarNone.png";
import StarTime from "../../img/wallet-money.svg";
import StarTime2 from "../../img/wallet-money2.svg";
import Avatar from "../../img/avatarNone.png";
import { useSelector } from "react-redux";
import { FaInstagram, FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import Grass from "../../img/grass.svg";
import { NavLink } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Review() {
  const { fieldsIdList, fieldsIdDetail } = useSelector((state) => state.fields);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
      {fieldsIdList?.advantages?.length > 0 ? (
        <div className="">
          <div className="p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]">
            <h4 className="text-[16px] leading-[18px] font-bold">
              Преимущества
            </h4>
          </div>
          <div className="px-[20px] py-[5px] bg-white rounded-b-[12px] ">
            {fieldsIdList?.advantages?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-[8px] pt-[10px] pb-[5px]"
                >
                  <div className="min-w-[40px] min-h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full">
                    <img
                      className="w-[24px] h-[24px]"
                      src={item?.advantages?.icon || Icon}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] leading-[17px] text-[#222222] font-bold">
                      {item?.advantages?.name}
                    </h4>
                    <p className="text-[13px] leading-[16px] text-[#222222]  font-normal opacity-70">
                      {item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {fieldsIdDetail?.construction_type?.length > 0 ||
      fieldsIdDetail?.price?.length > 0 ||
      fieldsIdList?.address ? (
        <div className="">
          <div className="p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]">
            <h4 className="text-[16px] leading-[18px] font-bold">Описание</h4>
          </div>
          <div className="px-[20px] py-[5px] bg-white rounded-b-[12px] ">
            <div className="flex items-center gap-[8px] pt-[10px] pb-[5px]">
              <div className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full">
                <img className="w-[24px] h-[24px]" src={Grass} alt="" />
              </div>
              <div>
                <h4 className="text-[15px] leading-[17px] text-[#222222] font-bold">
                  Тип поля
                </h4>
                <p className="text-[13px] leading-[16px] text-[#222222]  font-normal opacity-70 flex items-center gap-2 ">
                  {fieldsIdDetail?.construction_type?.map((item, index) => {
                    return <span key={index}>{item?.name}</span>;
                  })}
                </p>
              </div>
            </div>
            {fieldsIdDetail?.price &&
              fieldsIdDetail?.price?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-[8px] pt-[10px] pb-[5px]"
                  >
                    <div className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full">
                      <img
                        className="w-[24px] h-[24px]"
                        src={
                          item?.start_time >= "18:00:00" ? StarTime2 : StarTime
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="text-[15px] leading-[17px] text-[#222222] font-bold">
                        Цена с {item?.start_time} до {item?.end_time}
                      </h4>
                      <p className="text-[13px] leading-[16px] text-[#222222]  font-normal opacity-70">
                        {item?.price} сом / час
                      </p>
                    </div>
                  </div>
                );
              })}
            {fieldsIdList?.address && (
              <div className="flex items-center gap-[8px] pt-[10px] pb-[5px]">
                <div className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full">
                  <FaMapMarkerAlt className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <h4 className="text-[15px] leading-[17px] text-[#222222] font-bold">
                    Адрес
                  </h4>
                  <p className="text-[13px] leading-[16px] text-[#222222]  font-normal opacity-70 flex items-center gap-2 ">
                    {fieldsIdList?.address}
                  </p>
                </div>
              </div>
            )}
            <p className="text-[15px] leading-[21px] text-[#222222] font-normal opacity-80 py-[10px] text-justify">
              {fieldsIdDetail?.description}
            </p>
          </div>
        </div>
      ) : null}
      {fieldsIdList?.administrator ? (
        <div className="">
          <div className="p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]">
            <h4 className="text-[16px] leading-[18px] font-bold">Контакты</h4>
          </div>
          <div className="px-[20px] py-[5px] bg-white rounded-b-[12px] ">
            <div className="flex items-center gap-[8px] pt-[10px] pb-[5px]">
              <div className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full">
                <img
                  className="w-full h-full"
                  src={fieldsIdList?.administrator?.photo || Avatar}
                  alt=""
                />
              </div>
              <div>
                <h4 className="text-[15px] leading-[17px] text-[#222222] font-bold">
                  {fieldsIdList?.administrator?.name}{" "}
                  {fieldsIdList?.administrator?.surname}
                </h4>
                <p className="text-[13px] leading-[16px] text-[#222222]  font-normal opacity-70">
                  Администратор
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[10px] py-[15px]">
              {fieldsIdDetail?.administrator?.whatsup &&
                fieldsIdDetail?.administrator?.whatsup?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1"
                    >
                      <NavLink
                        target="_blank"
                        to={`https://wa.me/${el}`}
                        className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full"
                      >
                        <FaWhatsapp className="w-[24px] h-[24px]" />
                      </NavLink>
                      <p className="text-[13px] leading-[16px] text-[#222222]  font-normal">
                        Whats’App
                      </p>
                    </div>
                  );
                })}
              {fieldsIdDetail?.administrator?.telegram &&
                fieldsIdDetail?.administrator?.telegram?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1"
                    >
                      <NavLink
                        target="_blank"
                        to={`https://t.me/${el}  `}
                        className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full"
                      >
                        <FaTelegram className="w-[24px] h-[24px]" />
                      </NavLink>
                      <p className="text-[13px] leading-[16px] text-[#222222]  font-normal">
                        Telegram
                      </p>
                    </div>
                  );
                })}
              {fieldsIdDetail?.administrator?.contact?.map((el, index) => {
                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <NavLink
                      target="_blank"
                      to={`tel:+${el}`}
                      className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full"
                    >
                      <FaPhone className="w-[24px] h-[24px]" />
                    </NavLink>
                    <p className="text-[13px] leading-[16px] text-[#222222]  font-normal">
                      Позвонить
                    </p>
                  </div>
                );
              })}
              {fieldsIdDetail?.administrator?.instagram &&
                fieldsIdDetail?.administrator?.instagram?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1"
                    >
                      <NavLink
                        target="_blank"
                        to={`https://www.instagram.com/${el}/`}
                        className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full"
                      >
                        <FaInstagram className="w-[24px] h-[24px]" />
                      </NavLink>
                      <p className="text-[13px] leading-[16px] text-[#222222]  font-normal">
                        Instagram
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
