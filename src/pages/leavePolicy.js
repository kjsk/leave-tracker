import React, { Fragment, useState, useEffect, useRef } from "react";
import { BoardContainer } from "../components/Board/styles";
import { Modal } from "antd";
import axios from "axios";
import Allowance from "../components/Allowance";
import {
    getHeaders,
    createLeaveAPI,
    getAllLeaveTypesAPI
} from "../utils/urls";
import SideBar from "../components/SideBar";
import HeaderMain from "../components/header";
import CreateLeave from "../components/Forms/CreateLeave";
import { playAudio, openNotificationWithIcon } from "../utils/functions";
import AudioComponent from "../components/Audio";

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

    // Get leave types data
    const [leaveTypes, setLeaveTypes] = useState([]);

    // common headers
    const headers = getHeaders(userData?.tokens?.accessToken)

    // notification conformation sound function
    const audioPlayer = useRef(null) // set audio ref

    useEffect(() => {
        getAllLeaveTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // create leave function
    const CreateLeaveTypeFun = () => {
        setButtonProcess(true);
        const obj = {
            label: createLeaveName,
            value: createLeaveType,
            description: createLeaveName,
            color: createLeaveColor.hex,
        }
        axios({
            url: createLeaveAPI(),
            method: "POST",
            headers: headers,
            data: obj,
        }).then((res) => {
            playAudio(audioPlayer);
            openNotificationWithIcon(`success`, "Leave type added!");
            setCreateLeavePop(false);
            setButtonProcess(false);
            setCreateLeaveName("");
            setCreateLeaveType("");
            setCreateLeaveColor("");
            getAllLeaveTypes()
        }).catch((err) => {
            openNotificationWithIcon(`error`, "Oops!, Please try again");
            setCreateLeavePop(false);
            setButtonProcess(false);
            console.log("Error", err);
        })
    }

    // Get Leave types
    const getAllLeaveTypes = () => {
        axios({
            url: getAllLeaveTypesAPI(),
            method: "GET",
            headers: headers
        }).then((res) => {
            console.log("res", res)
            setLeaveTypes(res?.data)
        }).catch((err) => {
            console.log("Error", err)
        })
    }

    return (
        <BoardContainer>
            <AudioComponent
                audioPlayer={audioPlayer}
            />
            <div id="BoardContainer">
                <SideBar />
                <div
                    id="main_menu"
                    style={{ background: "#FCFAFA" }}
                >
                    {/* Custom header component */}
                    <HeaderMain
                        title="Leave Policy"
                        userDataMain={userDataMain}
                        buttonFun={
                            <Fragment>
                                {userDataMain?.role === "admin" && (<button onClick={() => setPolicyPop(true)}>Add Policy</button>)}
                            </Fragment>
                        }
                    />
                    {/* Policy */}
                    <Allowance
                        policyPop={policyPop}
                        playAudio={() => playAudio(audioPlayer)}
                        setPolicyPop={setPolicyPop}
                        CreateLeaveTypeFun={CreateLeaveTypeFun}
                        setCreateLeavePop={setCreateLeavePop}
                        leaveTypes={leaveTypes}
                    />
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
                    CreateLeaveTypeFun={CreateLeaveTypeFun}
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
