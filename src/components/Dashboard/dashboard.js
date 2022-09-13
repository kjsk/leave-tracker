import React from "react"
import { Column } from "@ant-design/plots"
import { DashboardContainer } from "./styles"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import Avatar from "../Avatar/index"
import { nameProf } from "../../utils/functions"

const Dashboard = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //     asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //     fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
  //         .then((response) => response.json())
  //         .then((json) => setData(json))
  //         .catch((error) => {
  //             console.log('fetch data failed', error);
  //         });
  // };
  // console.log("data", data)

  const data = [
    {
      day: "1",
      value: 7,
      type: "Sick leave",
    },
    {
      day: "2",
      value: 2,
      type: "Causal leave",
    },
    {
      day: "3",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "4",
      value: 3.5,
      type: "Causal leave",
    },
    {
      day: "5",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "6",
      value: 4.9,
      type: "Sick leave",
    },
    {
      day: "7",
      value: "",
      type: "Causal leave",
    },
    {
      day: "7",
      value: "",
      type: "Sick leave",
    },
    {
      day: "8",
      value: "",
      type: "Sick leave",
    },
    {
      day: "9",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "10",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "11",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "12",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "13",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "14",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "14",
      value: 10,
      type: "Causal leave",
    },
    {
      day: "15",
      value: "",
      type: "Sick leave",
    },
    {
      day: "16",
      value: "",
      type: "Sick leave",
    },
    {
      day: "17",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "18",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "19",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "20",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "21",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "22",
      value: "",
      type: "Sick leave",
    },
    {
      day: "23",
      value: "",
      type: "Sick leave",
    },
    {
      day: "24",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "25",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "26",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "27",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "28",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "29",
      value: 5,
      type: "Sick leave",
    },
    {
      day: "29",
      value: 2,
      type: "Causal leave",
    },
    {
      day: "30",
      value: 2,
      type: "Causal leave",
    },
  ]
  const config = {
    data,
    isStack: true,
    xField: "day",
    yField: "value",
    seriesField: "type",
    columnStyle: { r: 1 },
    label: {
      position: "bottom",
    },
    legend: {
      position: "bottom-left",
    },
    color: ["#F0BD70", "#8E95E9", "#FA7272", "#9FDEB3"],
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
    columnBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
  }
  return (
    <DashboardContainer>
      <div id="dashboard">
        <div id="dashboard_container">
          <div id="dashboard_nav">
            <LeftOutlined />
            <span>September 2022</span>
            <RightOutlined />
          </div>
          <Column {...config} />
        </div>
      </div>
      <div className="dashboard_detail">
        <h1>September 05 ,2022</h1>
        <div className="dashboard_detail_cards">
          <div className="card">
            <div className="card_container1">
              <Avatar name="M" nameProf={nameProf} />
            </div>
            <div className="card_container2">
              <div className="card_name_container">
                <div className="card_name_container1">
                  <div className="leave_tag">Sick leave</div>
                  <p>Bobbili praveen</p>
                </div>
                <h2>
                  Approved by:<span>Hr@fidisys</span>
                </h2>
              </div>
              <h3 className="detail">
                Suffering from fever leave from sep 6 th to sep 8 th 2022{" "}
              </h3>
              <span className="day_tag">3 days off</span>
            </div>
          </div>
          <div className="card">
            <div className="card_container1">
              <Avatar name="M" nameProf={nameProf} />
            </div>
            <div className="card_container2">
              <div className="card_name_container">
                <div className="card_name_container1">
                  <div className="leave_tag">Sick leave</div>
                  <p>Bobbili praveen</p>
                </div>
                <h2>
                  Approved by:<span>Hr@fidisys</span>
                </h2>
              </div>
              <h3 className="detail">
                Suffering from fever leave from sep 6 th to sep 8 th 2022{" "}
              </h3>
              <span className="day_tag">3 days off</span>
            </div>
          </div>
          <div className="card">
            <div className="card_container1">
              <Avatar name="M" nameProf={nameProf} />
            </div>
            <div className="card_container2">
              <div className="card_name_container">
                <div className="card_name_container1">
                  <div className="leave_tag">Sick leave</div>
                  <p>Bobbili praveen</p>
                </div>
                <h2>
                  Approved by:<span>Hr@fidisys</span>
                </h2>
              </div>
              <h3 className="detail">
                Suffering from fever leave from sep 6 th to sep 8 th 2022{" "}
              </h3>
              <span className="day_tag">3 days off</span>
            </div>
          </div>
          <div className="card">
            <div className="card_container1">
              <Avatar name="M" nameProf={nameProf} />
            </div>
            <div className="card_container2">
              <div className="card_name_container">
                <div className="card_name_container1">
                  <div className="leave_tag">Sick leave</div>
                  <p>Bobbili praveen</p>
                </div>
                <h2>
                  Approved by:<span>Hr@fidisys</span>
                </h2>
              </div>
              <h3 className="detail">
                Suffering from fever leave from sep 6 th to sep 8 th 2022{" "}
              </h3>
              <span className="day_tag">3 days off</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  )
}

export default Dashboard
