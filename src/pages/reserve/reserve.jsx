import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReserveDatepicker from "../../components/ReserveDatepicker/ReserveDatepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchFieldsIdDetail, setFootballId, setSelectValue } from "../../store/slice/fields-slice";
import { fetchReverse, fetchbookingCreate } from "../../store/slice/reserve-slice";
import { differenceInMinutes, parse, format, addDays } from 'date-fns';
import { fetchArbitrators } from '../../store/slice/arbitrators';
import Arbitrators from "../../components/Arbitrators/Arbitrators";
import AddUser from "../../components/AddUser/AddUser";
import NewUser from "../../components/NewUser/NewUser";

function Reserve() {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const { footballId, fieldsIdList, fieldsIdDetail } = useSelector((state) => state.fields);
  const { reverse } = useSelector((state) => state.reserveSlice);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(null);
  const [arbitrator, setArbitrator] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    dispatch(fetchArbitrators());
  }, []);

  console.log(time)

  useEffect(() => {
    dispatch(fetchReverse({ footballId, startDate }));
  }, [footballId, startDate]);


  const dayOfWeek = fieldsIdDetail?.schedule?.find((el) => el?.day_of_week === startDate.getDay());

  const startTime = dayOfWeek?.start_time?.slice(0, 5) || '';
  const endTime = dayOfWeek?.end_time?.slice(0, 5) || '';
  const start = parse(startTime, 'HH:mm', startDate);
  const end = addDays(parse(endTime, 'HH:mm', startDate), 1);
  const minutesDifference = differenceInMinutes(end, start);
  const intervals = minutesDifference / 30;
  const intervalsArray = [];

  for (let i = 0; i < intervals; i++) {
    const intervalStart = new Date(start.getTime() + i * 30 * 60 * 1000);
    const intervalEnd = new Date(intervalStart.getTime() + 30 * 60 * 1000);
    intervalsArray.push({
      start: format(intervalStart, 'HH:mm'),
      end: format(intervalEnd, 'HH:mm'),
      dayStart: format(intervalStart, 'dd.MM.yyyy HH:mm'),
      dayEnd: format(intervalEnd, 'dd.MM.yyyy HH:mm'),
    });
  }

  const isPastInterval = (intervalStart) => {
    const currentTime = new Date();
    const intervalDate = new Date(startDate);
    const [hours, minutes] = intervalStart.split(':');
    intervalDate.setHours(hours, minutes, 0, 0);
    return intervalDate < currentTime;
  };

  const handleClick = () => {
    dispatch(fetchbookingCreate({
      booking: state?.reserve,
      data: {
        phone: phone,
        name: name,
        repeat: repeat,
        status: '',
        start_time: time?.start,
        end_time: time?.end,
        day_of_week: dayOfWeek?.day_of_week,
        booking_date: startDate,
        field_type: footballId,
        duration: '',
        football_field_cost: ''
      }
    }))
  };


  return (
    <div className="my-[85px] md:my-[90px] flex flex-col gap-[20px] xl:px-5 lg:px-4 px-3">
      <div
        className={
          "p-[15px] xl:p-[20px] rounded-[10px] bg-[#fff] flex justify-between items-center flex-col lg:flex-row  gap-[10px] "
        }
      >
        <div className="flex flex-col lg:flex-row items-center gap-[10px] w-full lg:w-auto">
          {fieldsIdList?.football_field_type?.map((item) => (
            <button
              onClick={() => {
                dispatch(fetchFieldsIdDetail(item?.id))
                dispatch(setFootballId(item?.id))
              }}
              className={`w-full lg:w-auto px-3 xl:px-4 py-[6px] xl:py-2 font-normal text-[12px] xl:text-[14px] leading-[20px] hover:opacity-100 hover:border-[2px] duration-300 text-[#1C1C1C] border-[#222222] rounded-[8px] ${footballId === item?.id ? "opacity-100 border-[2px]" : "opacity-80 border-[1px]"
                }`
              }
            >
              {item?.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[20px] lg:gap-[20px]">
        <div className="">
          <div className="p-[20px] rounded-t-[10px] bg-[#fff]">
            <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px]">
              Выберите дату и время
            </p>
          </div>
          <div>
            <ReserveDatepicker setStartDate={setStartDate} startDate={startDate} />
          </div>
          <div className="p-[20px] rounded-b-[10px] bg-[#fff] flex flex-col gap-[10px] overflow-y-auto max-h-[500px]">
            {intervalsArray?.length > 0 ?
              <>
                {intervalsArray?.map((res, i) => {
                  const isReserved = reverse?.some((el) => el?.start_time === res?.start);
                  const isReservedPast = reverse?.some((el) => el?.end_time === res?.end);
                  const activeTimeStart = time?.start === res?.start;
                  const isActive = time?.start <= res?.start && time?.end >= res?.end;
                  const finds = reverse?.find((el) => el?.start_time <= res?.start && el?.end_time >= res?.end)

                  console.log(finds, 'finds')

                  const isPast = finds?.start_time <= res?.start && finds?.end_time >= res?.end;


                  console.log(isPast, 'isPast')

                  return (
                    <div key={i}
                      onClick={() => {
                        if (isPastInterval(res?.start) || isReserved || isReservedPast) {

                        } else {
                          if (time && time.start < res?.start) {
                            setTime({ ...time, end: res?.end });
                          } else {
                            setTime({ start: res?.start });
                          }
                        }
                      }}
                      className={`px-[20px] py-[10px] rounded-[10px] ${isPastInterval(res?.start) || isPast
                        ? "bg-[#fff] border-[1px] border-[#2222221A] opacity-70"
                        : activeTimeStart || isActive ? "bg-[#1ec219]" : "bg-[#F5F5F5] cursor-pointer hover:bg-[#cccbcb] duration-300 hover:shadow-md"
                        } `}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex flex-col gap-[6px]">
                          <p className="text-[12px] text-[#222222 font-normal leading-[14px] opacity-70">
                            Время:
                          </p>
                          <p className="text-[15px] text-[#222222] font-normal leading-[18px]">
                            {res?.start} - {res?.end}
                          </p>
                        </div>
                        {isPastInterval(res?.start) ? (
                          <p className="text-[14px] text-[#222222] font-normal leading-[16px]">
                            Занято
                          </p>
                        ) : (
                          <>
                            {isPast ? (
                              <p className="text-[14px] text-[#222222] font-normal leading-[16px]">
                                Занято
                              </p>
                            ) : (
                              <div className="flex flex-col gap-[6px]">
                                <p className="text-[12px] text-[#222222 font-normal leading-[14px] opacity-70">
                                  Цена:
                                </p>
                                <p className="text-[15px] text-[#222222] font-normal leading-[18px]">
                                  1000 сом
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}</>
              :
              <p className="text-[15px] text-center text-[#1C1C1C] font-normal leading-[18px]">Нет доступного времени</p>
            }
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          {state?.reserve === "existing" ? (
            <>
              <AddUser user={user} setUser={setUser} />
              <Arbitrators setArbitrator={setArbitrator} arbitrator={arbitrator} />
              <div className="p-[20px]  rounded-[10px] bg-[#fff] flex justify-between items-center gap-2">
                <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px]">
                  Повтор
                </p>
                <select
                  className="text-[15px] text-[#1C1C1C] font-normal leading-[18px] outline-none "
                  name=""
                  id=""
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  <option value="0">Никогда</option>
                  <option value="1">Каждую неделю</option>
                  <option value="2">Каждые месяц недели </option>
                  <option value="3">Каждые год недели</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <NewUser setPhone={setPhone} setName={setName} />
            </>
          )}
          <div className="p-[20px] rounded-[10px] bg-[#fff] flex flex-col gap-[10px]">
            <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px] opacity-70">
              Способ оплаты
            </p>
            <div className="flex items-center gap-x-[30px]">
              <div className="flex items-center gap-x-[10px]">
                <input type="radio" name="radio" value={"наличные"} onChange={(e) => setPayment(e.target.value)} />
                <label className="font-normal text-[16px] leading-[19px] text-[#222222]">
                  Наличными
                </label>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <input type="radio" name="radio" value={"онлайн"} onChange={(e) => setPayment(e.target.value)} />
                <label className="font-normal text-[16px] leading-[19px] text-[#222222]">
                  Онлайн
                </label>
              </div>
            </div>
          </div>
          <button onClick={() => handleClick()} className="w-full p-[8px] rounded-[8px]  border bg-[#7384E8] hover:bg-[#304add] duration-300 font-normal text-white text-[16px] leading-[19px]">
            Забронировать поле
          </button>
        </div>
      </div>
    </div >
  );
}

export default Reserve;
