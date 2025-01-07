import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { walletget } from "../../store/slice/wallet-slice.js";
import BalanceCard from "./BalanceCard";
import unio from "../../img/Union.svg";
import Map from "../../img/Map.jsx";
import icon from "../../img/icon.svg";
import image35 from "../../img/image 35.jpg";
import image36 from "../../img/image 36.jpg";
import image41 from "../../img/image 41.svg";
import { fetchWalletBalance } from "../../store/slice/balans-slice.js";

const schema = yup.object().shape({
  cardNumber: yup.string().when("selectedBank", {
    is: "Картой",
    then: () =>
      yup
        .string()
        .required("Введите номер карты")
        .matches(/^\d{16}$/, "Номер карты должен содержать 16 цифр"),
  }),
  phone: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^\+996\d{9}$/, "Формат: +996XXXXXXXXX"),
  expiry: yup.string().when("selectedBank", {
    is: "Картой",
    then: () =>
      yup
        .string()
        .required("Введите срок действия")
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Формат: MM/YY"),
  }),
  cvc: yup.string().when("selectedBank", {
    is: "Картой",
    then: () =>
      yup
        .string()
        .required("Введите CVC")
        .matches(/^\d{3}$/, "CVC должен содержать 3 цифры"),
  }),
  country: yup.string().required("Выберите страну"),
  amount: yup
    .number()
    .required("Введите сумму")
    .min(100, "Минимальная сумма 100 сом")
    .max(1000000, "Максимальная сумма 1,000,000 сом"),
  agreement: yup.boolean().oneOf([true], "Необходимо согласиться с условиями"),
});

export default function Wallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedBank, setSelectedBank] = useState("Картой");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedBank: "Картой",
      cardNumber: "",
      phone: "",
      expiry: "",
      cvc: "",
      country: "",
      amount: "",
      agreement: false,
    },
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      reset();
    }
  };

  const onSubmit = (data) => {
    toggleModal();
  };
  const dispatch = useDispatch();

  // Получаем состояние из Redux
  const { data, loading, error } = useSelector((state) => state.walletBalance);

  useEffect(() => {
    dispatch(fetchWalletBalance()); // Запрос данных при монтировании компонента
  }, [dispatch]);

  return (
    <>
      <div className="mt-[100px] mx-[20px]">
        <div className="mb-[20px]">
          <h4>Кошелек</h4>
        </div>
        <div className="grid grid-cols-1 gap-y-[20px] gap-x-[20px] sm:flex justify-between items-start">
          <div className="w-full sm:flex items-center md:w-[683px] h-[131px] bg-[#222222] text-white p-4 rounded-lg grid gap-y-[50px] relative">
            <div className="flex flex-col gap-y-[15px]">
              <p className="text-base font-normal leading-tight text-left opacity-70 text-[#FFFFFF]">
                У вас на балансе
              </p>
              <h1 className="mt-1 text-2xl font-medium text-left">
                {data?.balance} сом
              </h1>
            </div>
            <div className="absolute justify-end left-[270px] hidden sm:flex">
              <img
                className="relative left-[110px] top-[-15px]"
                src={unio}
                alt=""
              />
            </div>
            <button
              onClick={toggleModal}
              className="absolute bottom-[40px] right-[20px] h-[44px] px-[25px] flex justify-center bg-[#32CD32] items-center text-white rounded-[12px] text-lg"
            >
              <p className="text-base font-normal text-left text-[#ffffff]">
                Вывод средств
              </p>
            </button>
          </div>
        </div>
        <div className="grid gap-y-[20px] mt-[20px]">
          <h4>История платежей</h4>
          <BalanceCard />
        </div>
      </div>
      {isModalOpen && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[5000000]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-[20px] md:p-[51px] rounded-lg max-w-[90%] md:max-w-[606px] w-full"
          >
            <div
              style={{ whiteSpace: "nowrap" }}
              className="flex gap-x-[10px] overflow-x-auto "
            >
              <div
                onClick={() => setSelectedBank("Картой")}
                className={`w-[45%] md:w-[140px] flex flex-col justify-start mb-1 p-[8px] border rounded-lg bg-white 
          ${selectedBank === "Картой" ? "border-blue-700" : "border-gray-200"}
          hover:border-blue-500 cursor-pointer transition-colors`}
                style={{ flexShrink: 0 }}
              >
                <img
                  src={icon}
                  alt="Bank Logo"
                  className="w-[20px] h-[20px] mr-4"
                />
                <span className="text-[14px] font-normal leading-[20.3px] tracking-[0.04em] text-left">
                  Картой
                </span>
              </div>

              <div
                onClick={() => setSelectedBank("MBANK")}
                className={`w-[45%] md:w-[140px] flex flex-col justify-start mb-1 p-[8px] border rounded-lg bg-white 
          ${selectedBank === "MBANK" ? "border-blue-700" : "border-gray-200"}
          hover:border-blue-500 cursor-pointer transition-colors`}
                style={{ flexShrink: 0 }}
              >
                <img
                  src={image35}
                  alt="Bank Logo"
                  className="w-[20px] h-[20px] mr-4"
                />
                <span className="text-[14px] font-normal leading-[20.3px] tracking-[0.04em] text-left">
                  MBANK
                </span>
              </div>

              <div
                onClick={() => setSelectedBank("Optima")}
                className={`w-[45%] md:w-[140px] flex flex-col justify-start mb-1 p-[8px] border rounded-lg bg-white 
          ${selectedBank === "Optima" ? "border-blue-700" : "border-gray-200"}
          hover:border-blue-500 cursor-pointer transition-colors`}
                style={{ flexShrink: 0 }}
              >
                <img
                  src={image36}
                  alt="Bank Logo"
                  className="w-[20px] h-[20px] mr-4"
                />
                <span className="text-[14px] font-normal leading-[20.3px] tracking-[0.04em] text-left">
                  Optima
                </span>
              </div>

              <div
                onClick={() => setSelectedBank("Bakai")}
                className={`w-[45%] md:w-[140px] flex flex-col justify-start mb-1 p-[8px] border rounded-lg bg-white 
          ${selectedBank === "Bakai" ? "border-blue-700" : "border-gray-200"}
          hover:border-blue-500 cursor-pointer transition-colors`}
                style={{ flexShrink: 0 }}
              >
                <img
                  src={image41}
                  alt="Bank Logo"
                  className="w-[20px] h-[20px] mr-4"
                />
                <span className="text-[14px] font-normal leading-[20.3px] tracking-[0.04em] text-left">
                  Bakai
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 mt-[12px]"
            >
              <div className="grid gap-y-[10px]">
                {selectedBank === "Картой" && (
                  <div>
                    <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                      Номер карты
                    </label>
                    <div className="relative">
                      <InputMask
                        mask="9999 9999 9999 9999"
                        {...register("cardNumber")}
                        placeholder="1234 1234 1234 1234"
                        className={`w-full p-2 border rounded ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <span className="absolute right-[12px] top-[30%] transform -translate-y-1/2]">
                        <svg
                          width="51"
                          height="17"
                          viewBox="0 0 51 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1988_14110)">
                            <path
                              d="M22 0.5H2C0.89543 0.5 0 1.39543 0 2.5V14.5C0 15.6046 0.89543 16.5 2 16.5H22C23.1046 16.5 24 15.6046 24 14.5V2.5C24 1.39543 23.1046 0.5 22 0.5Z"
                              fill="#252525"
                            />
                            <path
                              d="M9 13.5C11.7614 13.5 14 11.2614 14 8.5C14 5.73858 11.7614 3.5 9 3.5C6.23858 3.5 4 5.73858 4 8.5C4 11.2614 6.23858 13.5 9 13.5Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M15 13.5C17.7614 13.5 20 11.2614 20 8.5C20 5.73858 17.7614 3.5 15 3.5C12.2386 3.5 10 5.73858 10 8.5C10 11.2614 12.2386 13.5 15 13.5Z"
                              fill="#F79E1B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12 4.5C13.2144 5.41221 14 6.86455 14 8.50037C14 10.1362 13.2144 11.5885 12 12.5007C10.7856 11.5885 10 10.1362 10 8.50037C10 6.86455 10.7856 5.41221 12 4.5Z"
                              fill="#FF5F00"
                            />
                          </g>
                          <g clip-path="url(#clip1_1988_14110)">
                            <path
                              d="M48.75 0.75H29.25C28.1454 0.75 27.25 1.64543 27.25 2.75V14.25C27.25 15.3546 28.1454 16.25 29.25 16.25H48.75C49.8546 16.25 50.75 15.3546 50.75 14.25V2.75C50.75 1.64543 49.8546 0.75 48.75 0.75Z"
                              fill="white"
                              stroke="black"
                              stroke-opacity="0.2"
                              stroke-width="0.5"
                            />
                            <path
                              d="M29.7877 6.41444C29.2646 6.12751 28.6675 5.89674 28 5.73659L28.028 5.61188H30.765C31.136 5.62489 31.437 5.73651 31.5349 6.13071L32.1298 8.96659L32.312 9.82073L33.978 5.61188H35.7768L33.1029 11.7775H31.304L29.7877 6.41444ZM37.1 11.7841H35.3988L36.4628 5.61188H38.1639L37.1 11.7841ZM43.2668 5.76277L43.0354 7.09559L42.8816 7.03004C42.5737 6.90525 42.1674 6.78054 41.6144 6.79371C40.9427 6.79371 40.6415 7.06277 40.6345 7.32546C40.6345 7.61441 40.9989 7.80484 41.5939 8.08725C42.574 8.52719 43.0286 9.06557 43.0218 9.76819C43.0081 11.0486 41.846 11.8761 40.0611 11.8761C39.2979 11.8694 38.5628 11.7181 38.1638 11.5476L38.4019 10.162L38.6259 10.2607C39.1789 10.4907 39.5428 10.589 40.222 10.589C40.7118 10.589 41.2369 10.3984 41.2436 9.98488C41.2436 9.71565 41.0199 9.51851 40.3617 9.21646C39.7178 8.92087 38.8568 8.42848 38.8708 7.54198C38.8781 6.34042 40.0611 5.5 41.741 5.5C42.399 5.5 42.9312 5.63789 43.2668 5.76277ZM45.5278 9.59749H46.9417C46.8718 9.28889 46.5496 7.81147 46.5496 7.81147L46.4307 7.27964C46.3467 7.50943 46.1999 7.88373 46.2069 7.87056C46.2069 7.87056 45.6678 9.2429 45.5278 9.59749ZM47.6276 5.61188L49 11.784H47.4249C47.4249 11.784 47.2708 11.0748 47.2219 10.8581H45.0378C44.9746 11.0222 44.6808 11.784 44.6808 11.784H42.8958L45.4226 6.12399C45.5977 5.72342 45.906 5.61188 46.3118 5.61188H47.6276Z"
                              fill="#1434CB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1988_14110">
                              <rect
                                width="24"
                                height="16"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                            <clipPath id="clip1_1988_14110">
                              <rect
                                width="24"
                                height="16"
                                fill="white"
                                transform="translate(27 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                    Номер телефона
                  </label>
                  <InputMask
                    mask="+999 999 999 999"
                    {...register("phone")}
                    placeholder="+996 555 555 555"
                    className={`w-full p-2 border rounded ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {selectedBank === "Картой" && (
                  <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
                    <div className="flex flex-col w-full">
                      <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                        Срок действия
                      </label>
                      <InputMask
                        mask="99/99"
                        {...register("expiry")}
                        placeholder="MM/YY"
                        className={`w-full p-2 border rounded ${
                          errors.expiry ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.expiry && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expiry.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                        CVC
                      </label>
                      <InputMask
                        mask="999"
                        {...register("cvc")}
                        type="password"
                        placeholder="***"
                        className={`w-full p-2 border rounded ${
                          errors.cvc ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cvc && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cvc.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                    Страна
                  </label>
                  <select
                    {...register("country")}
                    className={`w-full p-2 border rounded ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Выберите страну</option>
                    <option value="kg">Кыргызстан</option>
                    <option value="ru">Россия</option>
                    <option value="kz">Казахстан</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[14.88px] font-normal leading-[21.58px] text-left mb-[4px]">
                    Сумма
                  </label>
                  <input
                    type="number"
                    {...register("amount")}
                    placeholder="5 555 555 сом"
                    className={`w-full p-2 border rounded ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  {...register("agreement")}
                  className="mr-2"
                />
                <span className="text-sm">
                  Вы соглашаетесь с условиями вывода
                </span>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-sm">
                  {errors.agreement.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
              >
                Вывести средства
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
