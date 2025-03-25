import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Chart from "react-apexcharts";
import { Rating } from "@mui/material";
import BookId from "../../components/Cards/BookId/BookId";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalitOrdersFields } from "../../store/slice/analit-orders-fields";
import { fetchTotalIncome } from "../../store/slice/total-income";
import { fetchFields } from "../../store/slice/fields-slice";
import { fetchNumberOfNewClients } from "../../store/slice/number-of-new-clients";
import RatingComponent from "../../components/RatingComponent/RatingComponent";
import Reviews from "../../components/Reviews/Reviews";

const Home = () => {
  const { data, loading, error } = useSelector(
    (state) => state.analitOrdersFields
  );

  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const {
    loading: totalIncomeLoading,
    data: totalIncomeData,
    error: totalIncomeError,
  } = useSelector((state) => state.totalIncome);

  useEffect(() => {
    dispatch(fetchTotalIncome());
  }, [dispatch]);

  const { loading: numberLoading, data: numbersData } = useSelector(
    (state) => state.numberOfNewClients
  );

  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);

  useEffect(() => {
    dispatch(fetchNumberOfNewClients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnalitOrdersFields());
  }, [dispatch]);

  useEffect(() => {
    if (!data) return;
    const chartData = data?.current_week_data?.map((item) => ({
      x: new Date(item.day),
      y: item.new_clients,
    }));
    const chartData2 = totalIncomeData?.current_week_data?.map((item) => ({
      x: new Date(item.day),
      y: item.income,
    }));
    const chartData3 = numbersData?.current_week_data?.map((item) => ({
      x: new Date(item.day),
      y: item.bookings,
    }));
    setChartData(chartData);
    setChartData2(chartData2);
    setChartData3(chartData3);
  }, [data]);
  console.log(totalIncomeData, "data");

  const [active, setActive] = useState(1);

  const chartOptions = {
    chart: {
      id: "ordersChart",
      type: "line",
      animations: {
        enabled: false,
      },
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth" },
    xaxis: { type: "datetime" },
    yaxis: { max: 100 },
    legend: { show: false },
  };

  const [series3, setSeries3] = useState([
    {
      name: "Bookings",
      data: chartData3,
    },
  ]);

  const options = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "New Clients",
      data: chartData,
    },
  ];
  const series2 = [
    {
      name: "Total Income",
      data: chartData2,
    },
  ];

  const series4 = [
    {
      name: "Bookings",
      data: chartData3,
    },
  ];

  return (
    <div className={s.Home}>
      <div className={s.Titel}>
        <p>Обзор</p>
        <select name="" id="">
          <option value="">За неделю</option>
          <option value="">За месяц</option>
          <option value="">За год</option>
          <option value="">За все время</option>
        </select>
      </div>
      <div className={s.Blocks1}>
        <div className={s.Block1}>
          <div className={s.Block1Text}>
            <p className={s.Block1TextP}>Количество заказов</p>
            <div>
              <h3>{data?.current_week_data?.[0]?.new_clients ?? "0"}</h3>
              <span>
                <span
                  style={{
                    color:
                      typeof data?.growth_percentage === "number" &&
                      data.growth_percentage < 0
                        ? "#FF0000"
                        : "#4C8E4C",
                  }}
                >
                  {data?.growth_percentage ?? "0"}%
                </span>
                по сравнению с прошлой неделей
              </span>
              <p>Расчёт с {data?.current_week_start} по {data?.current_week_end}</p>
            </div>
          </div>
          <div className={s.Block1Chart}>
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={200}
            />
          </div>
        </div>
        <div className={s.Block1}>
          <div className={s.Block1Text}>
            <p className={s.Block1TextP}>Общая сумма дохода</p>
            <div>
              <h3> {totalIncomeData?.current_week_data?.[0]?.income} сом</h3>
              <span>
                <p
                  style={{
                    color: "#4C8E4C",
                  }}
                >
                  <span
                    style={{
                      color:
                        typeof totalIncomeData?.growth_percentage ===
                          "number" && totalIncomeData.growth_percentage < 0
                          ? "#FF0000"
                          : "#4C8E4C",
                    }}
                  >
                    {totalIncomeData?.growth_percentage ?? "0"}%
                  </span>
                </p>
                по сравнению с прошлой неделей
              </span>
              <p>
                Расчёт с{" "}
                {new Date(totalIncomeData?.current_week_start).toLocaleDateString(
                  "ru-RU"
                )}{" "}
                по{" "}
                {new Date(totalIncomeData?.current_week_end).toLocaleDateString(
                  "ru-RU"
                )}
              </p>
            </div>
          </div> 
          <div className={s.Block1Chart}>
            <Chart
              options={chartOptions}
              series={series2}
              type="line"
              height={200}
            />
          </div>
        </div>
      </div>
      <div className={s.Blocks2}>
        <div className={s.Block2}>
          <p>Кол-во новых клиентов</p>
          <div className={s.ChartBasic}>
            <span>
              <h3>{numbersData?.current_week_data?.[0]?.bookings ?? "0"}</h3>
              <p>
                <span
                  className={s.spanclients}
                  style={{
                    color:
                      typeof data?.growth_percentage === "number" &&
                      data.growth_percentage < 0
                        ? "#FF0000"
                        : "#4C8E4C",
                  }}
                >
                  {typeof data?.growth_percentage === "number" ? data?.growth_percentage.toFixed(1) + "%" : "0%"}
                </span>
                по сравнению с прошлой неделей
              </p>
            </span>
            <div className={s.ChartAll}>
              <Chart
                options={options}
                series={series4}
                type="bar"
                height={250}
              />
            </div>
          </div>
          {/* <span className={s.Block2_Tab}>
            <p onClick={() => setActive(1)}>
              <div
                style={{
                  backgroundColor: active === 1 ? "#5A6ACF" : "#D8D9DB",
                }}
              ></div>
              За последние 6 дней
            </p>
            <p onClick={() => setActive(2)}>
              <div
                style={{
                  backgroundColor: active === 2 ? "#5A6ACF" : "#D8D9DB",
                }}
              ></div>
              прошлую неделю
            </p>
          </span> */}
        </div>
        <div className={s.Block2_3}>
          <h2>Отзывы и рейтинг</h2>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default Home;
