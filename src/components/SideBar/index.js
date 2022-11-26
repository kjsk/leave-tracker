import React, { useEffect, useState } from "react";
import login_logo from "../../data/assets/login_logo.svg";
import overview from "../../data/assets/overview.svg";
import overview2 from "../../data/assets/overview_hover.svg";
import admin from "../../data/assets/admin.svg";
import admin2 from "../../data/assets/admin_hover.svg";
import Calendar from "../../data/assets/Calendar.svg";
import Calendar2 from "../../data/assets/Calendar_hover.svg";
import settings from "../../data/assets/settings.svg";
import settings2 from "../../data/assets/settings_hover.svg";
import logout from "../../data/assets/logout.svg";
import logout_hover from "../../data/assets/logout_hover.svg";
import Employee from "../../data/assets/Employee.svg";
import Employee_hover from "../../data/assets/Employee_hover.svg";
import DashboardImg from "../../data/assets/dashboard.svg";
import Dashboard_hover from "../../data/assets/dashboard_hover.svg";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { navigate } from "gatsby";
import { userDataMain, logoutFun } from "../../utils/functions";

const SideBar = ({ activeVal }) => {

  const [barOpen, setbarOpen] = useState(true);
  const [sideToggle, setSideToggle] = useState(activeVal);

  useEffect(() => {
    conditionalFun(activeVal)
  }, [])

  //set value fun
  const conditionalFun = (value) => {
    setSideToggle(value);
  }
  return (
    <div
      id="side_menu"
      style={{ width: !barOpen && "6vw", transition: `0.5s ease-in-out` }}
    >
      <span
        id="drag_button"
        onClick={() => setbarOpen(!barOpen)}
        role="presentation"
      >
        <Popover
          placement="right"
          content={barOpen ? "Tap To Minimize" : "Tap To Expand"}
        >
          {barOpen ? <LeftOutlined /> : <RightOutlined />}
        </Popover>
      </span>

      <h1>
        <img src={login_logo} alt="img" />
        {barOpen && "Leave Tracker"}
      </h1>
      <ul>
        <li
          activeClassName="active"
          className={sideToggle === 6 && "active"}
          role="presentation"
          onClick={() => {
            navigate("/dashboard",
              {
                state: {
                  item: 6,
                }
              })
            conditionalFun(6);
          }}
        >
          <img
            src={sideToggle === 6 ? Dashboard_hover : DashboardImg}
            alt="img"
          />
          {barOpen && "Dashboard"}
        </li>
        <li
          className={sideToggle === 1 && "active"}
          role="presentation"
          onClick={() => {
            navigate("/dashboard",
              {
                state: {
                  item: 6,
                }
              })
            conditionalFun(1)
          }}
        >
          <img src={sideToggle === 1 ? overview2 : overview} alt="img" />
          {barOpen && "Home"}
        </li>
        <li
          className={sideToggle === 2 && "active"}
          role="presentation"
          onClick={() => {
            conditionalFun(2)
          }}
        >
          <img src={sideToggle === 2 ? Calendar2 : Calendar} alt="img" />
          {barOpen && "Calendar"}
        </li>
        <li
          className={sideToggle === 3 && "active"}
          role="presentation"
          onClick={() => {
            conditionalFun(3)
          }}
        >
          <img src={sideToggle === 3 ? admin2 : admin} alt="img" />
          {userDataMain?.role === "admin"
            ? barOpen && "Admin Portal"
            : barOpen && "User Portal"}
        </li>
        {userDataMain?.role === "admin" && (
          <li
            className={sideToggle === 5 && "active"}
            role="presentation"
            onClick={() => {
              conditionalFun(5)
            }}
          >
            <img src={sideToggle === 5 ? Employee_hover : Employee} alt="img" />
            {barOpen && "Employee List"}
          </li>
        )}
        {userDataMain?.role === "admin" &&
          <li
            className={sideToggle === 7 && "active"}
            role="presentation"
            onClick={() => {
              conditionalFun(7)
            }}
          >
            <img src={sideToggle === 7 ? Calendar2 : Calendar} alt="img" />
            {barOpen && "Leave Policy"}
          </li>
        }
      </ul>
      <ul>
        <li
          className={sideToggle === 4 && "active"}
          role="presentation"
          onClick={() => {
            conditionalFun(4)
          }}
        >
          <img src={sideToggle === 4 ? settings2 : settings} alt="img" />
          {barOpen && "Settings"}
        </li>
      </ul>

      <ul id="logout">
        <li onClick={logoutFun} role="presentation">
          {" "}
          <img src={logout_hover} alt="img" className="imghover" />
          <img src={logout} alt="img" className="image" />
          {barOpen && "logout"}
        </li>
      </ul>
    </div>
  )
}
export default SideBar
