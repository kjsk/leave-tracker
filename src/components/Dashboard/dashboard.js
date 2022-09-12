import React, { useState, useEffect } from "react"
import { Column } from "@ant-design/plots"
import { DashboardContainer } from "./styles"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

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
      type: "cs",
    },
    {
      day: "2",
      value: 2,
      type: "gn",
    },
    {
      day: "3",
      value: 5,
      type: "cs",
    },
    {
      day: "4",
      value: 3.5,
      type: "gn",
    },
    {
      day: "5",
      value: 5,
      type: "cs",
    },
    {
      day: "6",
      value: 4.9,
      type: "cs",
    },
    {
      day: "7",
      value: 6,
      type: "gn",
    },
    {
      day: "7",
      value: 5,
      type: "cs",
    },
  ]
  const config = {
    data,
    isStack: true,
    xField: "day",
    yField: "value",
    seriesField: "type",
    label: {
      // 可手动配置 label 数据标签位置
      position: "bottom", // 'top', 'bottom', 'middle'
    },
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
    </DashboardContainer>
  )
}

export default Dashboard
