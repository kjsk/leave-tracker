import React, { useEffect, useState } from "react"
import { Column } from "@ant-design/plots"
import { DashboardContainer } from "./styles"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import Avatar from "../Avatar/index"
import { nameProf } from "../../utils/functions"
import axios from "axios"
import { baseURL } from "../../utils/urls"

const Dashboard = ({ headers }) => {
  useEffect(() => {
    getGraphData()
    // eslint-disable-next-line
  }, [])
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const [month, setMonth] = useState(currentMonth + 1)
  const [graphData, setGraphData] = useState()
  console.log("month", month)

  // Get leave graph data
  const getGraphData = () => {
    axios({
      url: `${baseURL}/api/v2/dashboard?month=${month}&year=${currentYear}`,
      method: "GET",
      headers: headers,
    })
      .then(res => setGraphData(res?.data?.data))
      .catch(err => console.log("err", err))
  }
  console.log("graphData", graphData)

  const data = graphData
    ? graphData?.days
    : [
        {
          day: "09",
          value: 1,
          type: "cos",
        },
      ]
  // Graph configuration
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
  if (month >= 12) {
    setMonth(1)
  }

  const newDate = graphData?.edate.split(" ")[0]
  console.log(typeof newDate)

  const newDate2 = newDate <= 10 ? newDate[1] : newDate
  console.log("newDate2", newDate2)
  let newDateArr = []

  var newDay
  for (var i = 1; i <= newDate2; i++) {
    newDay = i
    newDateArr.push({
      day: newDay,
      value: 0,
      type: "",
    })
  }
  // console.log("newDay", newDay)

  console.log("newDateArr", newDateArr)
  return (
    <DashboardContainer>
      <div id="dashboard">
        <div id="dashboard_container">
          <div id="dashboard_nav">
            <LeftOutlined
              onClick={() => {
                setMonth(month - 1)
                getGraphData()
              }}
            />
            <span>
              {graphData &&
                graphData.sdate.split(" ")[1] +
                  ", " +
                  graphData.sdate.split(" ")[2]}
            </span>
            <RightOutlined
              onClick={() => {
                setMonth(month + 1)
                getGraphData()
              }}
            />
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
