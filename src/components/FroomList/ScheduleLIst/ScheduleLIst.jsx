import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DaySchedule = ({ day, dayState, setDayState }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "time") {
      const [hours, minutes] = value.split(":").map(Number);
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return;
      }
    }

    setDayState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return (
    <div
      className={
        "flex gap-3 justify-between items-center rounded-[8px] py-[10px] px-[14px] bg-[#f0f0f0] border-[2px] border-[#E8E8E8]"
      }
    >
      <p className="text-[16px] font-normal text-left leading-[18px]">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </p>
      <div className="flex gap-3 items-center">
        <div className={"flex gap-[6px] md:gap-[10px] items-center"}>
          <input
            className=" md:w-full  font-normal text-[14px] md:text-[18px] leading-[17px] text-left  bg-transparent outline-none"
            type="time"
            name="startTime"
            value={dayState[day].startTime}
            onChange={handleChange}
          />
          <input
            className="md:w-full  font-normal text-[14px] md:text-[18px] leading-[17px] text-left outline-none bg-transparent"
            type="time"
            name="endTime"
            value={dayState[day].endTime}
            onChange={handleChange}
          />
        </div>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="checkbox"
            checked={dayState[day].checkbox}
            onChange={handleChange}
            class="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-[#78788029] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>
    </div>
  );
};

const ScheduleList = ({ setSchedule }) => {
  const { fieldsIdList, fieldsIdDetail, footballId } = useSelector(
    (state) => state.fields
  );

  const [dayState, setDayState] = useState({
    понедельник: {
      day_of_week: 0,
      endTime: "",
      startTime: "",
      checkbox: false,
    },
    вторник: { day_of_week: 1, endTime: "", startTime: "", checkbox: false },
    среда: { day_of_week: 2, endTime: "", startTime: "", checkbox: false },
    четверг: { day_of_week: 3, endTime: "", startTime: "", checkbox: false },
    пятница: { day_of_week: 4, endTime: "", startTime: "", checkbox: false },
    суббота: { day_of_week: 5, endTime: "", startTime: "", checkbox: false },
    воскресенье: {
      day_of_week: 6,
      endTime: "",
      startTime: "",
      checkbox: false,
    },
  });

  const updateDayStateWithSchedule = (schedule, setDayState, dayState) => {
    const updatedDayState = { ...dayState };
    const scheduledDays = new Set(schedule.map((day) => day.day_of_week));
    Object.keys(updatedDayState).forEach((dayName) => {
      const dayInfo = updatedDayState[dayName];
      if (!scheduledDays.has(dayInfo.day_of_week)) {
        updatedDayState[dayName] = {
          ...dayInfo,
          startTime: "00:00",
          endTime: "00:00",
          checkbox: false,
        };
      }
    });
    schedule.forEach((day) => {
      const { day_of_week, start_time, end_time } = day;
      const dayName = Object.keys(dayState).find(
        (key) => dayState[key].day_of_week === day_of_week
      );
      if (dayName) {
        updatedDayState[dayName] = {
          ...updatedDayState[dayName],
          startTime: start_time,
          endTime: end_time,
          checkbox: true,
        };
      }
    });

    setDayState(updatedDayState);
  };

  useEffect(() => {
    if (fieldsIdDetail?.schedule?.length > 0) {
      updateDayStateWithSchedule(
        fieldsIdDetail?.schedule,
        setDayState,
        dayState
      );
    }
  }, [fieldsIdDetail]);

  useEffect(() => {
    const newData = {};
    for (const day in dayState) {
      if (
        dayState[day].checkbox &&
        dayState[day].endTime &&
        dayState[day].startTime &&
        dayState[day].endTime !== "00:00" &&
        dayState[day].startTime !== "00:00"
      ) {
        newData[day] = { ...dayState[day] };
        delete newData[day].checkbox;
      }
    }

    const schedule = Object.values(newData)
      .map((entry) => {
        return {
          day_of_week: entry.day_of_week,
          start_time: entry.startTime,
          end_time: entry.endTime,
        };
      })
      .sort((a, b) => a.day_of_week - b.day_of_week);

    if (schedule.length > 0) {
      setSchedule(schedule);
    }
  }, [dayState, setSchedule]);

  return (
    <div className={"flex flex-col gap-[10px] p-[16px] md:p-[20px]"}>
      {Object.keys(dayState).map((day) => {
        return (
          <DaySchedule
            key={day}
            day={day}
            dayState={dayState}
            setDayState={setDayState}
          />
        );
      })}
    </div>
  );
};

export default ScheduleList;
