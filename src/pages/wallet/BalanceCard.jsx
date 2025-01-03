import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { walletget, walletgetSorted } from "../../store/slice/wallet-slice.js";
const BalanceCard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.wallet);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [sortedData, setSortedData] = useState([]);

  const [filters, setFilters] = useState({
    operationType: "all",
    dateFrom: "",
    dateTo: "",
  });

  const dateInputRef1 = useRef(null);
  const dateInputRef2 = useRef(null);

  useEffect(() => {
    dispatch(walletget());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const sorted = sortData(data);
      setSortedData(sorted);
    }
  }, [data, sortConfig]);

  const handleOperationTypeChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      operationType: e.target.value,
    }));
  };

  const handleDateFromChange = (e) => {
    const date = e.target.value;
    setFilters((prev) => ({
      ...prev,
      dateFrom: date,
    }));
  };

  const handleDateToChange = (e) => {
    const date = e.target.value;
    setFilters((prev) => ({
      ...prev,
      dateTo: date,
    }));
  };

  const handleDatePickerClick = (ref) => {
    ref.current && ref.current.showPicker();
  };

  const formatDate = (dateStr, options) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ru-RU", options);
  };

  const handleSearch = () => {
    if (filters.dateFrom && filters.dateTo) {
      dispatch(
        walletgetSorted({ start: filters.dateFrom, end: filters.dateTo })
      );
    } else {
      dispatch(walletget());
    }
  };

  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderTransaction = (transaction, index) => (
    <tr key={transaction.id || index}>
      <td className="px-6 py-[4px] whitespace-nowrap">{transaction.type}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          {formatDate(transaction.create_date, {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div className="text-gray-500 text-sm">
          {formatDate(transaction.create_date, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          transaction.football_field_cost < 0
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {transaction.football_field_cost} сом
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{transaction.created_by}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {transaction.field_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center gap-x-[5px] px-2 py-1 rounded">
          <IoCalendarClearOutline />
          {transaction.payment_type}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="grid gap-y-[30px] rounded-[15px]">
      {/* Filter and search section */}
      <div className="gap-y-[20px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[16px] w-full rounded-[15px] bg-white p-[18px]">
        {/* Operation type filter */}
        <div className="flex items-center bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px]">
          <select
            className="outline-none w-full bg-[#F7F8F9]"
            onChange={handleOperationTypeChange}
            value={filters.operationType}
          >
            <option value="all">Все операции</option>
            <option value="booking">Бронирование</option>
            <option value="withdrawal">Вывод</option>
          </select>
        </div>
        {/* Date from filter */}
        <div
          className="relative flex justify-between bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px]"
          onClick={() => handleDatePickerClick(dateInputRef1)}
        >
          <div className="flex items-center space-x-1">
            <IoCalendarClearOutline
              className={`${
                filters.dateFrom ? "text-black" : "text-[#B8C0CC]"
              }`}
            />
            <input
              ref={dateInputRef1}
              type="date"
              value={filters.start}
              onChange={handleDateFromChange}
              className="h-[50px] bg-[#F7F8F9] rounded-[10px]"
            />
            <h4
              className={`${
                filters.dateFrom ? "text-black" : "text-[#B8C0CC]"
              }`}
            >
              {filters.dateFrom || "Период с"}
            </h4>
          </div>
          <IoMdArrowDropdown size={30} className="mt-[10px]" />
        </div>
        {/* Date to filter */}
        <div
          className="flex justify-between bg-[#F7F8F9] rounded-[10px] w-full h-[50px] px-[10px]"
          onClick={() => handleDatePickerClick(dateInputRef2)}
        >
          <div className="flex items-center space-x-1">
            <IoCalendarClearOutline
              className={`${filters.dateTo ? "text-black" : "text-[#B8C0CC]"}`}
            />
            <input
              ref={dateInputRef2}
              type="date"
              value={filters.end}
              onChange={handleDateToChange}
              className="h-[50px] bg-[#F7F8F9] rounded-[10px]"
            />
            <h4
              className={`${filters.dateTo ? "text-black" : "text-[#B8C0CC]"}`}
            >
              {filters.dateTo || "Период до"}
            </h4>
          </div>
          <IoMdArrowDropdown size={30} className="mt-[10px]" />
        </div>
        {/* Search button */}
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
      {/* Table section */}
      <div className="w-full overflow-x-auto rounded-[15px]">
        <table className="min-w-full bg-white rounded-[15px]">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => requestSort("type")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Тип операции{" "}
                {sortConfig.key === "type" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => requestSort("create_date")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Дата{" "}
                {sortConfig.key === "create_date" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => requestSort("football_field_cost")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Приход{" "}
                {sortConfig.key === "football_field_cost" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => requestSort("created_by")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Пользователь{" "}
                {sortConfig.key === "created_by" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => requestSort("payment_type")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Футбольное поле{" "}
                {sortConfig.key === "payment_type" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => requestSort("payment_type")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Платеж.система{" "}
                {sortConfig.key === "payment_type" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Загрузка...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">
                  Ошибка: {error}
                </td>
              </tr>
            ) : sortedData?.length ? (
              sortedData.map((transaction, index) =>
                renderTransaction(transaction, index)
              )
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Нет данных
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
