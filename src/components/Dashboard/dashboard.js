import React, { useEffect, useState } from "react"
import { Column } from "@ant-design/plots"
import { DashboardContainer } from "./styles"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import Avatar from "../Avatar/index"
import EmptyRoster from "../EmptyRoster"
import { nameProf } from "../../utils/functions"
import axios from "axios"
import { baseURL } from "../../utils/urls"

const Dashboard = ({ headers, CompoLoader }) => {
  const [loader, setLoader] = useState(false)
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const [month, setMonth] = useState(currentMonth + 1)
  const [graphData, setGraphData] = useState()
  const [getDay, setGetDay] = useState("")
  useEffect(() => {
    getGraphData()
    // eslint-disable-next-line
  }, [month])
  if (month >= 12) {
    setMonth(1)
  }
  // Get leave graph data
  const newDate = month <= 10 ? 0 + "" + month : month
  const getGraphData = () => {
    setLoader(true)
    axios({
      url: `${baseURL}/api/v2/dashboard?month=${newDate}&year=${currentYear}`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        setLoader(false)
        setGraphData(res?.data?.data)
      })
      .catch(err => console.log("err", err))
  }

  const data = graphData
    ? graphData?.days
    : [
        {
          day: "09",
          value: 50,
          type: "cos",
        },
      ]

  // Graph configuration
  const config = {
    data,
    isStack: true,
    xField: "day",
    yField: "value",
    yAxis: {
      max: 30,
    },
    seriesField: "type",
    columnStyle: {
      radius: [50, 50, 0, 0],
    },
    label: {
      position: "bottom",
    },
    legend: {
      position: "bottom-left",
      marker: {
        symbol: "circle", // shape of the marker
        radius: 5, // radius of the circle
      },
    },
    onReady: plot => {
      plot.on("element:click", args => {
        console.log("args", args?.data?.data)
        setGetDay(args?.data?.data?.day)
      })
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

  // const newDate2 = graphData?.edate.split(" ")[0]

  // const newDate22 = newDate2 <= 10 ? newDate2[1] : newDate2
  // let newDateArr = []

  // var newDay
  // for (var i = 1; i <= newDate2; i++) {
  //   newDay = i
  //   newDateArr.push({
  //     day: newDay,
  //   })
  // }

  // console.log("newDateArr", newDateArr)

  useEffect(() => {
    getLeaveDetails()
    // eslint-disable-next-line
  }, [getDay])
  const [empLeaveData, setEmpLeaveData] = useState([])
  const getLeaveDetails = () => {
    axios({
      url: `${baseURL}/api/v2/dashboard?month=${newDate}&year=${currentYear}&day=${getDay}`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        setEmpLeaveData(res?.data?.data?.leaves)
      })
      .catch(err => console.log("err", err))
  }

  console.log("empLeaveData", empLeaveData)
  return (
    <DashboardContainer>
      <div id="dashboard">
        <div id="dashboard_container">
          <div id="dashboard_nav">
            <LeftOutlined
              onClick={() => {
                setMonth(month - 1)
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
              }}
            />
          </div>
          {loader ? (
            <CompoLoader />
          ) : graphData?.days?.length === 0 ? (
            <EmptyRoster
              text={`No leave's applied for ${graphData.sdate.split(" ")[1]}`}
            />
          ) : (
            <Column {...config} />
          )}
        </div>
      </div>
      <div className="dashboard_detail">
        <h1>
          {graphData &&
            getDay +
              " " +
              graphData.sdate.split(" ")[1] +
              ", " +
              graphData.sdate.split(" ")[2]}
        </h1>
        <div className="dashboard_detail_cards">
          {empLeaveData?.length >= 1 ? (
            empLeaveData.map(item => (
              <div className="card">
                <div className="card_container1">
                  <Avatar name={item?.username} nameProf={nameProf} />
                </div>
                <div className="card_container2">
                  <div className="card_name_container">
                    <div className="card_name_container1">
                      <div className="leave_tag">Sick leave</div>
                      <p>{item?.username}</p>
                    </div>
                    <h2>
                      Approved by:<span>Hr@fidisys</span>
                    </h2>
                  </div>
                  <h3 className="detail">{item?.reason}</h3>
                  <span className="day_tag">3 days off</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyRoster text={`No leaves added`} />
          )}
        </div>
      </div>
    </DashboardContainer>
  )
}

export default Dashboard
