import React, { useEffect, useState } from "react"
import { Column } from "@ant-design/plots"
import { DashboardContainer } from "./styles"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import Avatar from "../Avatar/index"
import EmptyRoster from "../EmptyRoster"
import { nameProf } from "../../utils/functions"
import axios from "axios"
import { baseURL, leavesByIdAPI } from "../../utils/urls"

const Dashboard = ({ headers, CompoLoader }) => {
  const [loader, setLoader] = useState(false)
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const [month, setMonth] = useState(currentMonth + 1)
  const [graphData, setGraphData] = useState()
  const [newGraphData, setNewGraphData] = useState([])
  const [getDay, setGetDay] = useState("")
  const [getDaysData, setGetDaysData] = useState()
  const [empLeaveData, setEmpLeaveData] = useState([])
  const [dataLoader, setDataLoader] = useState(false)
  useEffect(() => {
    getGraphData()
    // eslint-disable-next-line
  }, [])

  const newMonth = inc => {
    getGraphData()
    if (month > 12) {
      setMonth(1)
    } else if (inc === "plus") {
      month !== 1 && setMonth(month + 1)
      setEmpLeaveData([])
    } else {
      month !== 1 && setMonth(month - 1)
      setEmpLeaveData([])
    }
  }

  // Get leave graph data
  const getGraphData = () => {
    const newDate = month <= 10 ? 0 + "" + month : month
    setLoader(true)
    axios({
      url: `${baseURL}/api/v2/dashboard?month=${newDate}&year=${currentYear}`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        setLoader(false)
        setGraphData(res?.data?.data)
        setGetDaysData(res?.data?.data?.ddData)
        setNewGraphData(
          res?.data?.data?.days.map(item => {
            return {
              day: item.day,
              value: item.value === 0 ? null : item.value,
              type: item.value === 0 ? null : item.type,
            }
          })
        )
      })
      .catch(err => console.log("err", err))
  }

  const data = graphData
    ? newGraphData
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
      max: 15,
    },
    seriesField: "type",
    columnStyle: {
      radius: [5, 5, 0, 0],
    },
    label: {
      position: "middle",
      style: {
        fontSize: 0,
      },
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
        setGetDay(args?.data?.data?.day)
        setEmpLeaveData([])
      })
    },
    color: ({ type }) => {
      if (type === "weekend") {
        return "gray"
      } else if (type === "cos") {
        return "#8E95E9"
      } else if (type === "gen") {
        return "#F0BD70"
      } else if (type === "lop") {
        return "#9FDEB3"
      }
    },
    interactions: [
      {
        type: "active-region",
        enable: true,
      },
    ],
    columnBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
  }

  const actualDay = getDay
  const getIdObj =
    getDaysData &&
    actualDay &&
    getDaysData.filter(item => item.day === actualDay && item)

  const newIds = getIdObj && getIdObj[0]?.leaveids

  useEffect(() => {
    getLeaveDetails(newIds)
    // eslint-disable-next-line
  }, [getDay])

  const getLeaveDetails = id => {
    setDataLoader(true)
    axios({
      url: leavesByIdAPI(id),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        setDataLoader(false)
        setEmpLeaveData(res?.data?.leaves)
      })
      .catch(err => {
        setDataLoader(false)
        setEmpLeaveData([])
        console.log("err", err)
      })
  }

  return (
    <DashboardContainer>
      <div id="dashboard">
        <div id="dashboard_container">
          <div id="dashboard_nav">
            <LeftOutlined
              onClick={() => newMonth("plse")}
              style={{ opacity: month === 1 && 0.1 }}
            />
            <span>
              {graphData &&
                graphData.sdate.split(" ")[1] +
                  ", " +
                  graphData.sdate.split(" ")[2]}
            </span>
            <RightOutlined onClick={() => newMonth("minus")} />
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
      {dataLoader ? (
        <CompoLoader />
      ) : (
        <div className="dashboard_detail">
          <h1>
            {graphData &&
              actualDay +
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
                        <div
                          className="leave_tag"
                          style={{
                            background:
                              item?.type === "cos"
                                ? "#8E95E9"
                                : item?.type === "gen"
                                ? "#F0BD70"
                                : item?.type === "lop"
                                ? "#9FDEB3"
                                : "",
                          }}
                        >
                          {item?.type}
                        </div>
                        <p>{item?.username}</p>
                      </div>
                      <h2>
                        Approved by:<span>{item?.approverEmail}</span>
                      </h2>
                    </div>
                    <h3 className="detail">{item?.reason}</h3>
                    <span className="day_tag">No of days: {item?.days}</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyRoster
                text={`No leaves on ${
                  graphData && actualDay + " " + graphData.sdate.split(" ")[1]
                }`}
              />
            )}
          </div>
        </div>
      )}
    </DashboardContainer>
  )
}

export default Dashboard
