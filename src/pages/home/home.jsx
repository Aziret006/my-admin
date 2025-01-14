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

const Home = () => {
  const { data, loading, error } = useSelector(
    (state) => state.analitOrdersFields
  );

  const { fields } = useSelector((state) => state.fields);
  useEffect(() => {
    dispatch(fetchFields());
  }, []);

  const [fieldDelete, setFieldDelete] = useState(false);
  const [deleteValue, setDeleteValue] = useState(null);

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
    const chartData = data?.data?.map((item) => ({
      x: new Date(item.day),
      y: item.new_clients,
    }));
    const chartData2 = totalIncomeData?.data?.map((item) => ({
      x: new Date(item.day),
      y: item.income,
    }));
    const chartData3 = numbersData?.data?.map((item) => ({
      x: new Date(item.day),
      y: item.bookings,
    }));
    setChartData(chartData);
    setChartData2(chartData2);
    setChartData3(chartData3);
  }, [data]);

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
      name: "New Clients",
      data: chartData,
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
              <h3>2.568</h3>
              <span>
                <p
                  style={{
                    color: "#4C8E4C",
                  }}
                >
                  +2.5%
                </p>
                по сравнению с прошлой неделей
              </span>
              <p>Расчёт с 1 по 6 Декабря 2024</p>
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
              <h3>$54.2K</h3>
              <span>
                <p
                  style={{
                    color: "#4C8E4C",
                  }}
                >
                  +2.5%
                </p>
                по сравнению с прошлой неделей
              </span>
              <p>Расчёт с 1 по 6 Декабря 2024</p>
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
              <p>18</p>
              <p>
                <span style={{ color: "#4C8E4C" }}>+2.5%</span> по сравнению с
                прошлой неделей
              </p>
            </span>
            <div className={s.ChartAll}>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={200}
              />
            </div>
          </div>
          <span className={s.Block2_Tab}>
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
          </span>
        </div>
        <div className={s.Block2_3}>
          <h2>Отзывы и рейтинг</h2>
          <div className={s.Block2_3_1}>
            <div className={s.BLock2_3Blocks}>
              <div className={s.Block3_3Blok1}>
                <select className={s.dropdown} name="" id="">
                  <option value="week">За неделю</option>
                  <option value="month">За месяц</option>
                  <option value="year">За год</option>
                  <option value="all">За все время</option>
                </select>
                <RatingComponent fieldId={1} days={7} />
                <div className={s.stats}>
                  <span
                    className={s.percentageChange}
                    style={{ color: "#4C8E4C" }}
                  >
                    +2.1% по сравнению с прошлой неделей
                  </span>
                  <p className={s.dateRange}>Расчёт с 1 по 6 Декабря 2024</p>
                </div>
              </div>
            </div>
            {fields?.results?.map(
              (item, index) =>
                index === 0 && (
                  <BookId
                    fieldDelete={fieldDelete}
                    setFieldDelete={setFieldDelete}
                    setDeleteValue={setDeleteValue}
                    key={item.id}
                    item={item}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
