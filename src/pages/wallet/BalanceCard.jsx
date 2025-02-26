import React, { useRef, useEffect } from "react";

import { useState } from "react";

import { IoMdArrowDropdown } from "react-icons/io";

import { IoCalendarClearOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { walletget } from "../../store/slice/wallet-slice";
import { getBookings } from "../../store/slice/sorting-slice";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const day = date.getDate();

  const month = months[date.getMonth()];

  const hours = date.getHours().toString().padStart(2, "0");

  const minutes = date.getMinutes().toString().padStart(2, "0");

  return {
    date: `${day} ${month}`,

    time: `${hours}:${minutes}`,
  };
};

const BalanceCard = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.wallet);
  const { sortedData } = useSelector((state) => state.sorting);

  useEffect(() => {
    dispatch(walletget());
  }, [dispatch]);

  const handleButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const transactions = sortedData.length > 0 ? sortedData : data || [];

  const [testValue, setTestValue] = useState(null);

  const dateInputRef = useRef(null);

  const isDateSelected = testValue !== null;

  const handleButtonClick2 = () => {
    if (dateInputRef2.current) {
      dateInputRef2.current.showPicker();
    }
  };

  const [testValue2, setTestValue2] = useState(null);

  const dateInputRef2 = useRef(null);

  const isDateSelected2 = testValue2 !== null;

  const renderTransaction = (transaction, index) => (
    <tr key={transaction.id || index}>
      <td className="px-6 py-[4px] whitespace-nowrap">
        {transaction.type || transaction.type}
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-gray-900">
            {formatDate(transaction.date || transaction.create_date).date}
          </span>

          <span className="text-gray-500 text-sm">
            {formatDate(transaction.date || transaction.create_date).time}
          </span>
        </div>
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-${
          transaction.amount < 0 ? "red-500" : "green-500"
        }`}
      >
        +{transaction.amount || transaction.football_field_cost} сом
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {transaction.user || transaction.created_by || "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {transaction.field || transaction.field_type || "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center gap-x-[5px] px-2 py-1 rounded">
          <IoCalendarClearOutline />
          {transaction.paymentSystem || transaction.payment_type || "-"}
        </span>
      </td>
    </tr>
  );

  const handleSearch = () => {
    if (testValue && testValue2) {
      dispatch(
        getBookings({
          startDate: testValue,
          endDate: testValue2,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className=" grid gap-y-[30px] rounded-[15px]">
      <div className="gap-y-[20px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[16px] w-full rounded-[15px] bg-[#fff]  p-[18px]">
        <div className="flex items-center bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px] ">
          <select className="outline-none flex justify-between w-full bg-[#F7F8F9]">
            <option>Все операции</option>
            <option>Бронирование</option>
            <option>Вывод</option>
          </select>
        </div>
        <div className="flex justify-between bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px] ">
          <div
            className="flex items-center justify-between w-full"
            onClick={handleButtonClick}
          >
            <div className="flex items-center space-x-1">
              <IoCalendarClearOutline
                className={`text-${isDateSelected ? "black" : "[#B8C0CC]"}`}
              />

              <input
                ref={dateInputRef}
                type="date"
                onChange={(e) => setTestValue(e.target.value)}
                className="h-[50px] bg-[#F7F8F9] flex items-center rounded-[10px]"
              />

              <h4 className={`text-${isDateSelected ? "black" : "[#B8C0CC]"}`}>
                {testValue !== null ? testValue : "Период с"}
              </h4>
            </div>

            <IoMdArrowDropdown
              size={30}
              onChange={(e) => setTestValue(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px] ">
          <div
            className="flex items-center justify-between w-full"
            onClick={handleButtonClick2}
          >
            <div className="flex items-center space-x-1">
              <IoCalendarClearOutline
                className={`text-${isDateSelected2 ? "black" : "[#B8C0CC]"}`}
              />

              <input
                ref={dateInputRef2}
                onChange={(e) => setTestValue2(e.target.value)}
                type="date"
                className="h-[50px] bg-[#F7F8F9] flex items-center rounded-[10px]"
              />

              <h4 className={`text-${isDateSelected2 ? "black" : "[#B8C0CC]"}`}>
                {testValue2 !== null ? testValue2 : "Период до"}
              </h4>
            </div>

            <IoMdArrowDropdown
              size={30}
              onChange={(e) => setTestValue2(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold h-[50px] px-[10px] rounded-[10px] inline-flex gap-x-[8px] justify-center items-center"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.16634 14C11.6641 14 14.4997 11.1645 14.4997 7.66671C14.4997 4.1689 11.6641 1.33337 8.16634 1.33337C4.66854 1.33337 1.83301 4.1689 1.83301 7.66671C1.83301 11.1645 4.66854 14 8.16634 14Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M15.1663 14.6667L13.833 13.3334"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Поиск
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-[15px]">
        <table className="min-w-full bg-white rounded-[15px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип операции
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Приход
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Футбольное поле
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Платеж.система
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) =>
                renderTransaction(transaction, index)
              )
            ) : (
              <tr>
                <td colSpan="100%" className="text-center py-4 text-[#000]">
                  Данных нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceCard;
