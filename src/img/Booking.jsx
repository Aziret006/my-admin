import React from "react";

function Booking({ isActive }) {
  return (
    <>
      <svg
        className="w-[20px] h-[20px]"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.83398 12.5C5.83398 13.4205 5.08779 14.1667 4.16732 14.1667C3.24684 14.1667 2.50065 13.4205 2.50065 12.5C2.50065 11.5796 3.24684 10.8334 4.16732 10.8334C5.08779 10.8334 5.83398 11.5796 5.83398 12.5Z"
          fill="#737B8B"
          fillOpacity="0.1"
        />
        <path
          d="M0.838274 17.5H7.49636C7.49873 17.5 7.50065 17.4981 7.50065 17.4958C7.50065 15.6572 6.0059 14.1667 4.16732 14.1667C2.32874 14.1667 0.833984 15.6572 0.833984 17.4958C0.833984 17.4981 0.835905 17.5 0.838274 17.5Z"
          fill="#737B8B"
          fillOpacity="0.1"
        />
        <path
          d="M4.16732 14.1667C5.08779 14.1667 5.83398 13.4205 5.83398 12.5C5.83398 11.5796 5.08779 10.8334 4.16732 10.8334C3.24684 10.8334 2.50065 11.5796 2.50065 12.5C2.50065 13.4205 3.24684 14.1667 4.16732 14.1667ZM4.16732 14.1667C6.0059 14.1667 7.50065 15.6572 7.50065 17.4958C7.50065 17.4981 7.49873 17.5 7.49636 17.5H0.838274C0.835905 17.5 0.833984 17.4981 0.833984 17.4958C0.833984 15.6572 2.32874 14.1667 4.16732 14.1667ZM8.33398 10V6.66671M11.6673 13.3334L11.6673 6.66671M15.0007 13.3334V8.33337M1.66732 8.33337V5.00004C1.66732 4.07957 2.41351 3.33337 3.33398 3.33337H16.6673C17.5878 3.33337 18.334 4.07957 18.334 5.00004V15C18.334 15.9205 17.5878 16.6667 16.6673 16.6667H10.0007"
          stroke={isActive ? "#f73a0b" : "#737B8B"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

export default Booking;
