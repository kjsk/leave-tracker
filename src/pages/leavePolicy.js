import React, { useState, useRef } from "react"
import { BoardContainer } from "../components/Board/styles"
import { Modal, notification } from "antd"
import axios from "axios"
import NotificationSound from "../utils/notification.mp3"
import Avatar from "../components/Avatar/index"
import Allowance from "../components/Allowance"
import {
    getHeaders,
    createLeaveAPI,
} from "../utils/urls"
import { nameProf } from "../utils/functions"
import SideBar from "../components/SideBar"
import CreateLeave from "../components/Forms/CreateLeave"

const Board = () => {
    const userData =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
    const userDataMain = userData?.user

    const [buttonProcess, setButtonProcess] = useState(false)

    const [policyPop, setPolicyPop] = useState(false)
    const [createLeavePop, setCreateLeavePop] = useState("")
    const [createLeaveName, setCreateLeaveName] = useState("")
    const [createLeaveType, setCreateLeaveType] = useState("")
    const [createLeaveColor, setCreateLeaveColor] = useState("")

    // common headers
    const headers = getHeaders(userData?.tokens?.accessToken)

    // notification conformation sound function
    const audioPlayer = useRef(null)

    function playAudio() {
        audioPlayer.current.play()
    }
    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: data,
            placement: "top",
        })
    }

    const CreateLeaveFun = () => {
        const obj = {
            label: createLeaveName,
            value: createLeaveType,
            description: createLeaveName,
            color: createLeaveColor.hex,
        }
        setButtonProcess(true)
        axios({
            url: createLeaveAPI(),
            method: "POST",
            headers: headers,
            data: obj,
        })
            .then(res => {
                if (res.data) {
                    playAudio()
                    openNotificationWithIcon(`success`, "Leave type added!")
                    setCreateLeavePop(false)
                    setButtonProcess(false)
                    setCreateLeaveName("")
                    setCreateLeaveType("")
                    setCreateLeaveColor("")
                }
            })
            .catch(err => {
                openNotificationWithIcon(`Error`, "Oops!")
                setCreateLeavePop(false)
                setButtonProcess(false)
                console.log("Error", err)
            })
    }

    return (
        <BoardContainer>
            <audio ref={audioPlayer} src={NotificationSound}>
                <track
                    src="captions_es.vtt"
                    kind="captions"
                    srclang="es"
                    label="spanish_captions"
                />
            </audio>
            <div id="BoardContainer">
                {/* <SideBar {...commonProps} /> */}
                <div
                    id="main_menu"
                    style={{ background: "#FCFAFA" }}
                >
                    <div id="header">
                        <h2 id="title">Leave Policy</h2>
                        <div id="mini_block">
                            {userDataMain?.role === "admin" && (
                                <button onClick={() => setCreateLeavePop(true)}>
                                    Add Leavetype
                                </button>
                            )}
                            {userDataMain?.role === "admin" && (
                                <button onClick={() => setPolicyPop(true)}>Add Policy</button>
                            )}
                            <div id="mini_block_name">
                                <Avatar name={userDataMain?.name} nameProf={nameProf} />
                                <p id="name_main">
                                    {userDataMain?.name}
                                    <span>{userDataMain?.role}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Policy */}
                    <Allowance policyPop={policyPop} setPolicyPop={setPolicyPop} />
                </div>
            </div>


            {/* ADD LEAVE POPUP */}
            <Modal
                title="Create Leave Type"
                centered
                visible={createLeavePop}
                onCancel={() => {
                    setCreateLeavePop(false)
                }}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <CreateLeave
                    createLeaveName={createLeaveName}
                    setCreateLeaveName={setCreateLeaveName}
                    createLeaveType={createLeaveType}
                    setCreateLeaveType={setCreateLeaveType}
                    createLeaveColor={createLeaveColor}
                    setCreateLeaveColor={setCreateLeaveColor}
                    CreateLeaveFun={CreateLeaveFun}
                    buttonProcess={buttonProcess}
                    setButtonProcess={setButtonProcess}
                    createLeavePop={createLeavePop}
                    setCreateLeavePop={setCreateLeavePop}
                />
            </Modal>
        </BoardContainer>
    )
}
export default Board
