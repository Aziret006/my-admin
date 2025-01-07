import React, { useEffect, useState } from "react";
import BookId from "../../components/Cards/BookId/BookId";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchFields } from "../../store/slice/fields-slice";
import { NavLink } from "react-router-dom";
import FiledList from "../../components/Cards/filedList/FiledList";
import Element3 from "../../img/element3";
import Elemnt3 from "../../img/Elemnt3";
import FieldsDelete from "../../components/Modal/FieldsDelete";
import Loader from "../../components/Loader/Loader";

export default function Fields() {
  const dispatch = useDispatch();
  const { fields, loading } = useSelector((state) => state.fields);

  const [pages, setPages] = useState("about");
  const [fieldDelete, setFieldDelete] = useState(false);
  const [deleteValue, setDeleteValue] = useState(null);

  useEffect(() => {
    dispatch(fetchFields());
  }, []);

  return (
    <>
      {fieldDelete && (
        <FieldsDelete
          setFieldDelete={setFieldDelete}
          deleteValue={deleteValue}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div
          className={
            "flex flex-col gap-[20px] my-[85px] lg:my-[95px] xl:px-5 lg:px-4 px-3"
          }
        >
          <div
            className={
              "flex md:flex-row flex-col justify-between md:items-center gap-[15px]"
            }
          >
            <h4 className="text-xl font-bold leading-5 text-left text-gray-700">
              Футбольные поля
            </h4>
            <div className="flex items-center gap-x-[12px]">
              <div
                onClick={() => setPages("about")}
                className={`w-[36px] h-[36px] rounded-[12px] p-[8px] ${
                  pages === "about"
                    ? "bg-[#000]"
                    : "bg-[#E5E5E5] cursor-pointer"
                }`}
              >
                <Element3 pages={pages} />
              </div>
              <div
                onClick={() => setPages("home")}
                className={`w-[36px] h-[36px] rounded-[12px] p-[8px] ${
                  pages === "home" ? "bg-[#000]" : "bg-[#E5E5E5] cursor-pointer"
                }`}
              >
                <Elemnt3 pages={pages} />
              </div>
              <NavLink to="/fields/add">
                <button
                  className={
                    "px-3 py-2 bg-[#7384E8] rounded-[12px] flex justify-center items-center gap-2 "
                  }
                >
                  <GoPlus color="#fff" className="w-[24px] h-[24px]" />
                  <p className="text-[14px] font-bold leading-5 text-white">
                    Добавить футбольное поле
                  </p>
                </button>
              </NavLink>
            </div>
          </div>
          {pages === "about" ? (
            fields && fields?.results?.length > 0 ? (
              <div
                className={
                  "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] 3xl:grid-cols-4"
                }
              >
                {fields?.results?.map((item) => (
                  <BookId
                    fieldDelete={fieldDelete}
                    setFieldDelete={setFieldDelete}
                    setDeleteValue={setDeleteValue}
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <p
                className={
                  "text-[14px] font-normal leading-5 text-[#222222] opacity-50 text-center mt-[10%]"
                }
              >
                По вашему запросу ничего не найдено
              </p>
            )
          ) : (
            <>
              {fields?.results?.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <div className="w-[900px] xl:w-[100%]">
                    <div className="w-full py-[20px] px-[30px] bg-[#F0F0F0] rounded-t-[15px]">
                      <div className="w-full grid grid-cols-11 items-center gap-1">
                        <div className="col-span-1 list-none text-[16px] font-normal text-left">
                          №
                        </div>
                        <div className="col-span-2 list-none text-[14px] font-normal leading-5 text-left">
                          Название
                        </div>
                        <div className="col-span-2 list-none text-[14px] font-normal leading-5 text-left text-[#1C1C1C]">
                          Тип
                        </div>
                        <div className="col-span-2 list-none text-[14px] font-normal leading-5 text-left text-[#1C1C1C]">
                          Преимущества
                        </div>
                        <div className="col-span-2 list-none text-[14px] font-normal leading-5 text-left text-[#1C1C1C]">
                          Оценка
                        </div>
                        <div className="col-span-2 list-none text-[14px] font-normal leading-5 text-center text-[#1C1C1C]">
                          Действие
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-[20px] pb-[20px] rounded-bl-lg rounded-br-lg bg-[#FFFFFF]">
                      {fields?.results?.map((res, index) => (
                        <div key={index}>
                          <FiledList
                            fieldDelete={fieldDelete}
                            setFieldDelete={setFieldDelete}
                            setDeleteValue={setDeleteValue}
                            index={index}
                            item={res}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p
                  className={
                    "text-[14px] font-normal leading-5 text-[#222222] opacity-50 text-center mt-[10%]"
                  }
                >
                  По вашему запросу ничего не найдено
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
