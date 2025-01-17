import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Avatar from "../../img/avatarNone.png";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearch,
  setUsers,
  clearUsers,
} from "../../store/slice/search-slice";

export default function AddUser({ user, setUser }) {
  const [search, setSearch] = useState("");
  const { users, loading, error } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search.trim()) {
        dispatch(fetchSearch(search));
      } else {
        dispatch(clearUsers());
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, dispatch]);

  return (
    <div>
      <div className="p-[20px] rounded-[10px] bg-[#fff] flex flex-col gap-[10px]">
        <p className="text-[15px] text-[#1C1C1C] font-normal leading-[18px] opacity-70">
          Добавить пользователя
        </p>
        {user ? (
          <div
            onClick={() => {
              setUser(null);
              dispatch(setUsers(null));
            }}
            className="p-[10px] bg-[#F3F3F3] rounded-[8px] flex justify-between items-center cursor-pointer hover:bg-[#b3b2b2] duration-300"
          >
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={user?.photo || Avatar}
                alt=""
              />
              <p className="text-[#222222] text-[15px] font-normal leading-[20px]">
                {user?.name} {user?.surname}
              </p>
            </div>
            <MdDelete className="w-6 h-6 cursor-pointer" />
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            <div className="px-[8px] flex items-center gap-x-[4px] bg-[#F3F3F3] rounded-[8px] w-full border-[1px] border-[#F3F3F3] focus-within:border-[2px] focus-within:border-[green]">
              <FaSearch className="w-[16px] h-[16px] opacity-40" />
              <input
                className="w-full p-[8px] outline-none bg-transparent"
                type="search"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {loading && <p className="text-center text-gray-500">Загрузка...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {users?.results?.length > 0 && (
          <div className="flex flex-col gap-[12px] max-h-[300px] overflow-y-auto">
            {users.results.map((user) => (
              <div
                onClick={() => {
                  setUser(user);
                  dispatch(setUsers(null));
                }}
                key={user?.id}
                className="p-[10px] bg-[#F3F3F3] rounded-[8px] flex justify-between items-center cursor-pointer hover:bg-[#b3b2b2] duration-300"
              >
                <div className="flex items-center gap-[10px]">
                  <img
                    className="w-[40px] h-[40px] object-cover rounded-full"
                    src={user?.photo || Avatar}
                    alt=""
                  />
                  <p className="text-[#222222] text-[15px] font-normal leading-[20px]">
                    {user?.name} {user?.surname}
                  </p>
                </div>
                <FaPlus className="w-6 h-6 cursor-pointer" />
              </div>
            ))}
          </div>
        )}

        {users?.results?.length === 0 && search && !loading && (
          <p className="text-[15px] text-center text-[#1C1C1C] font-normal leading-[18px] opacity-70">
            Пользователь не найден
          </p>
        )}
      </div>
    </div>
  );
}
