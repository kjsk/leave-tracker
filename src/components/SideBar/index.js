import React, { useState } from "react";
import login_logo from "../../data/assets/login_logo.svg";
// import overview from "../../data/assets/overview.svg";
// import overview2 from "../../data/assets/overview_hover.svg";
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
import { Popover, Modal } from "antd";
import {
  Link
  // Route, Routes, HashRouter 
} from "gatsby";
import { logoutFun } from "../../utils/functions";

const SideBar = () => {

  // Fetch user data from local storage
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
  const userDataMain = userData?.user;

  const [barOpen, setbarOpen] = useState(true);
  const [visible, setVisible] = useState(false);

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
        <Link
          to="/dashboard"
          activeClassName="active"
          className="side_link"
          role="presentation"
        >
          <img src={DashboardImg} alt="img" className="link_img" />
          <img src={Dashboard_hover} alt="img" className="active_img" />
          {barOpen && "Dashboard"}
        </Link>
        <Link
          to="/calendar"
          activeClassName="active"
          className="side_link"
          role="presentation"
        >
          <img src={Calendar} alt="img" className="link_img" />
          <img src={Calendar2} alt="img" className="active_img" />
          {barOpen && "Calendar"}
        </Link>
        <Link
          to="/leaveRequests"
          activeClassName="active"
          className="side_link"
          role="presentation"
        >
          <img src={admin} alt="img" className="link_img" />
          <img src={admin2} alt="img" className="active_img" />
          Leave Requests
        </Link>
        {userDataMain?.role === "admin" && (
          <Link
            to="/employeeList"
            activeClassName="active"
            className="side_link"
            role="presentation"
          >
            <img src={Employee} alt="img" className="link_img" />
            <img src={Employee_hover} alt="img" className="active_img" />
            {barOpen && "Employee List"}
          </Link>
        )}
        {userDataMain?.role === "admin" &&
          <Link
            to="/leavePolicy"
            activeClassName="active"
            className="side_link"
            role="presentation"
          >
            <img src={Calendar} alt="img" className="link_img" />
            <img src={Calendar2} alt="img" className="active_img" />
            {barOpen && "Leave Policy"}
          </Link>
        }
      </ul>
      <ul>
        <Link
          to="/settings"
          activeClassName="active"
          className="side_link"
          role="presentation"
        >
          <img src={settings} alt="img" className="link_img" />
          <img src={settings2} alt="img" className="active_img" />
          {barOpen && "Settings"}
        </Link>
      </ul>

      <ul id="logout">
        <li className="side_link" onClick={() => setVisible(true)} role="presentation">
          {" "}
          <img src={logout_hover} alt="img" className="imghover" />
          <img src={logout} alt="img" className="image" />
          {barOpen && "logout"}
        </li>
      </ul>

      {/* LEAVE ACTION TAKEN POPUP (APPROVE, REJECT, DELETE, User delete, Logout ) */}
      <Modal
        title="Confirmation"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
          logoutFun();
        }}
        onCancel={() => {
          setVisible(false);
        }}
        width={1000}
        okText="Logout"
        cancelText="Back"
        okButtonProps={{
          backgroundColor: "red"
        }}
        className="reject"
      >
        <>
          <p
            style={{
              fontSize: `22px`,
              color: `#333333`,
              fontWeight: `600`,
              margin: `30px 0`,
            }}
          >
            Do you want to Logout
          </p>
        </>
      </Modal>
    </div>
  )
}
export default SideBar
