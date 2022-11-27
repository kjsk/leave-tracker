import React from "react";
import Avatar from "../Avatar"
import { nameProf } from "../../utils/functions"

const HeaderMain = ({ title, userDataMain, buttonFun }) => {

    console.log("userDataMain", userDataMain)
    return (
        <div id="header">
            <h2 id="title">{title}</h2>
            <div id="mini_block">
                {buttonFun}
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
    )
}
export default HeaderMain;