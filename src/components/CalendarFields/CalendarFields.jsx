import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CalendarFields() {
  const { bookings, status, error } = useSelector((state) => state.story);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (bookings) {
      setData(
        bookings.results?.map((item) => ({
          title: item?.name,
          start: item?.start_date,
          end: item?.end_date,
        }))
      );
    }
  }, [bookings]);

  return (
    <div
      className={
        "bg-[#fff] border-[1px] border-[#E9E9E9] lg:p-[20px] p-[5px] rounded-[10px]"
      }
    >
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Сегодня",
          week: "Неделя",
          day: "День",
          allday: "весь день",
        }}
        locale={"ru"}
        weekText="нед:"
        allDayText="Весь день"
        weekNumbers={false}
        events={data}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="w-full text-[#fff] text-[8px] lg:text-[10px] p-[1px]  rounded-md">
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
