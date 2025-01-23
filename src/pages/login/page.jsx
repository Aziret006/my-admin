import React, { useEffect, useState } from "react";
import cm from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slice/user.slice";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.value) {
      setEmail((i) => ({ ...i, error: "Email is required" }));
    }
    if (!password.value) {
      setPassword((i) => ({ ...i, error: "Password is required" }));
    }
    dispatch(fetchUser({ identifier: email.value, password: password.value }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/");
    }
  }, [status]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#f5f5f5]">
      <div className="flex flex-col gap-[24px] justify-center items-center md:max-w-[475px] rounded-[10px] h-[auto] w-[90%] md:w-full bg-[#ffff] md:px-[30px] px-[18px] py-[40px] md:py-[60px] shadow-md">
        <p className="md:text-[20px] text-[16px] font-[500] text-center ">
          Войти вы можете только зарегистрированным пользователем
        </p>
        {error?.detail && (
          <p className="font-[500] text-[#f93a0b] text-[14px]">
            {error.detail}
          </p>
        )}
        <label className="flex flex-col gap-[5px] w-full">
          <p className="md:text-[16px] text-[14px] font-normal ">Email</p>
          <input
            onChange={(e) => setEmail((i) => ({ value: e.target.value }))}
            value={email.value}
            type="email"
            placeholder="Email"
            className={cm(
              "bg-[#e0dddd] rounded-[5px] md:p-[10px] p-[8px] placeholder:text-[#6c6c6c] outline-none focus-within:border-[green] focus-within:border-[2px] placeholder:text-[14px]",
              { "border-[#f93a0b] border-[2px]": email.error }
            )}
          />
          {email.error && (
            <p className="font-[500] text-[#f93a0b] text-[14px]">
              {email.error}
            </p>
          )}
        </label>
        <label className="flex flex-col gap-[5px] w-full">
          <p className="md:text-[16px] text-[14px] font-normal ">Password</p>
          <div
            className={cm(
              "relative bg-[#e0dddd] rounded-[5px] w-full md:p-[10px] p-[8px] focus-within:border-[green] focus-within:border-[2px]",
              { "border-[#f93a0b] border-[2px]": password.error }
            )}
          >
            <input
              onChange={(e) => setPassword((i) => ({ value: e.target.value }))}
              value={password.value}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className={
                "placeholder:text-[#6c6c6c] outline-none bg-transparent placeholder:text-[14px]"
              }
            />
            <span
              className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className="w-[18px] h-[18px]" />
              ) : (
                <FaEyeSlash className="w-[18px] h-[18px]" />
              )}
            </span>
          </div>
          {password.error && (
            <p className="font-[500] text-[#f93a0b] text-[14px]">
              {password.error}
            </p>
          )}
        </label>
        <button
          className={`w-full bg-[#f93a0b] text-[#fff] duration-300 rounded-[5px] p-[10px] ${
            email?.value?.length > 0 && password?.value?.length > 0
              ? "opacity-100 hover:bg-[#c4300b]"
              : "opacity-50"
          }`}
          type="submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;
