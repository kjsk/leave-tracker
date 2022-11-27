import React from "react"
import { Result } from "antd"
import SideBar from "../components/SideBar"
import { SettingOutlined } from "@ant-design/icons"
import { BoardContainer } from "../components/Board/styles"
import HeaderMain from "../components/header";

const SettingsPage = () => {

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
                    <HeaderMain
                        title="Settings"
                        userDataMain={userDataMain}
                    />
                    {/* Calendar */}
                    <Result
                        icon={<SettingOutlined />}
                        title="Hello, Settings coming soon!"
                    />
                </div>
            </div>
        </BoardContainer>
    )
}
export default SettingsPage
