import React from "react"
import { Result } from "antd"
import SideBar from "../components/SideBar"
import Avatar from "../components/Avatar/index"
import { CalendarOutlined } from "@ant-design/icons"
import { BoardContainer } from "../components/Board/styles"
import { nameProf } from "../utils/functions"

const CalendarPage = () => {

  // FETCHING USER STORED DATA
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"));

  const userDataMain = userData?.user;

  return (
    <BoardContainer>
      <div id="BoardContainer">
        {/* <SideBar {...commonProps} /> */}
        <div
          id="main_menu"
          style={{ background: "#FCFAFA" }}
        >
          <div id="header">
            <h2 id="title">Calendar</h2>
            <div id="mini_block">
              <div id="mini_block_name">
                <Avatar name={userDataMain?.name} nameProf={nameProf} />
                <p id="name_main">
                  {userDataMain?.name}
                  <span>{userDataMain?.role}</span>
                </p>
                {/* <img src={userDataMain?.photoURL} alt="img" id="profile" /> */}
              </div>
            </div>
            {/* Button code goes here */}
            <div id="mini_block"></div>
          </div>
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
