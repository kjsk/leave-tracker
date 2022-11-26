import React from "react"
import { BoardContainer } from "../components/Board/styles"
import Avatar from "../components/Avatar/index"
import { nameProf } from "../utils/functions"
import SideBar from "../components/SideBar"
import Dashboard from "../components/Dashboard/dashboard"

const DashboardMain = ({ location }) => {

    // FETCHING USER STORED DATA
    const userData =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("userData"));

    const userDataMain = userData?.user;

    let registerDetails = '';
    if (location.state) {
        registerDetails = location.state.item
    }

    return (
        <BoardContainer>
            <div id="BoardContainer">
                <SideBar activeVal={registerDetails} />
                <div
                    id="main_menu"
                    style={{ background: "#FCFAFA" }}
                >
                    <div id="header">
                        <h2 id="title">Dashboard</h2>
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
                    </div>
                    {/* Dashboard */}
                    <Dashboard />
                </div>
            </div>
        </BoardContainer>
    )
}
export default DashboardMain
