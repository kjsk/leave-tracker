import React from "react";
import { Result } from "antd";
import SideBar from "../components/SideBar";
import { CalendarOutlined } from "@ant-design/icons";
import { BoardContainer } from "../components/Board/styles";
import HeaderMain from "../components/header";

const CalendarPage = () => {

  // FETCHING USER STORED DATA
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"));

  const userDataMain = userData?.user;

  return (
    <BoardContainer>
      <div id="BoardContainer">
        <SideBar />
        <div
          id="main_menu"
          style={{ background: "#FCFAFA" }}
        >
          {/* userData header */}
          <HeaderMain
            title="Calendar"
            userDataMain={userDataMain}
          />
          {/* Calendar */}
          <Result
            icon={<CalendarOutlined />}
            title="Hello, Calendar coming soon!"
          />
        </div>
      </div>
    </BoardContainer>
  )
}
export default CalendarPage
