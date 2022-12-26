import React, { Fragment, useState, useEffect, useRef } from "react";
import { BoardContainer } from "../components/Board/styles";
import { Modal } from "antd";
import Allowance from "../components/Allowance";
import SideBar from "../components/SideBar";
import HeaderMain from "../components/header";
import CreateLeave from "../components/Forms/CreateLeave";
import { playAudio } from "../utils/functions";
import AudioComponent from "../components/Audio";
import { getAllLeaveTypes, CreateLeaveTypeFun } from "../utils/functions/Common_Functions/function";

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

    // notification conformation sound function
    const audioPlayer = useRef(null) // set audio ref

    useEffect(() => {
        getAllLeaveTypes({ setState: setLeaveTypes, token: userData?.tokens?.accessToken });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        CreateLeaveTypeFun={() => CreateLeaveTypeFun({
                            token: userData?.tokens?.accessToken,
                            audioPlayer,
                            createLeaveName,
                            createLeaveType,
                            createLeaveColor,
                            setButtonProcess,
                            setCreateLeaveName,
                            setCreateLeaveType,
                            setCreateLeaveColor,
                            setLeaveTypes,
                            setCreateLeavePop
                        })}
                        setCreateLeavePop={setCreateLeavePop}
                        leaveTypes={leaveTypes}
                        getAllLeaveTypes={() => getAllLeaveTypes({ setState: setLeaveTypes, token: userData?.tokens?.accessToken })}
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
                    CreateLeaveTypeFun={() => CreateLeaveTypeFun({
                        token: userData?.tokens?.accessToken,
                        audioPlayer,
                        createLeaveName,
                        createLeaveType,
                        createLeaveColor,
                        setButtonProcess,
                        setCreateLeaveName,
                        setCreateLeaveType,
                        setCreateLeaveColor,
                        setLeaveTypes,
                        setCreateLeavePop
                    })}
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
