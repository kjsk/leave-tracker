import React, { Fragment, useEffect, useState, useRef } from "react";
import Edit_user from "../data/assets/Edit_user.svg";
import { BoardContainer } from "../components/Board/styles";
import {
    DeleteOutlined,
} from "@ant-design/icons"
import { Modal } from "antd";
import axios from "axios";
import Avatar from "../components/Avatar/index";
import CompoLoader from "../components/ComponentLoader";
import UsersList from "../components/Board/UsersList";
import AddEmployee from "../components/Forms/AddEmployee";
import EditUser from "../components/Forms/EditUser";
import {
    getHeaders,
    userEditAPI,
    getUsersAPI,
    addUserAPI
} from "../utils/urls";
import { nameProf, playAudio, openNotificationWithIcon } from "../utils/functions";
import SideBar from "../components/SideBar";
import HeaderMain from "../components/header";
import AudioComponent from "../components/Audio";
import AllowanceTableView from "../components/Allowance/allowanceTable"

const Board = () => {

    const userData =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
    const userDataMain = userData?.user;

    // notification conformation sound function
    const audioPlayer = useRef(null);

    const [activeLoader, setActiveLoader] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addEmp, setAddEmp] = useState(false);
    const [name, setName] = useState("");
    const [Email, setEMail] = useState("");
    const [selectPolicy, setSelectPolicy] = useState("");
    const [leaveType, setLeaveType] = useState({ label: "", value: "" });
    const [deleteUserState, setdeleteUserState] = useState(false);
    const [userConform, setUserConform] = useState("");
    const [buttonProcess, setButtonProcess] = useState(false);

    // Edit user Fun setState
    const [editUserPop, setEditUserPop] = useState(false);
    const [editUserPopDetails, setEditUserPopDetails] = useState(false);
    const [empName, setEmpName] = useState("");
    const [empDesignation, setEmpDesignation] = useState("");
    const [empUsed, setEmpUsed] = useState("");
    const [empLeft, setEmpLeft] = useState("");

    // common headers
    const headers = getHeaders(userData?.tokens?.accessToken);

    // FETCHING LEAVE ON PAGELOAD
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Call to add employee
    const addUser = (name, Email, leaveType) => {
        setButtonProcess(true);
        const userEmail = Email?.toLowerCase();
        axios({
            method: "POST",
            url: addUserAPI(),
            data: {
                name: name,
                email: userEmail,
                policyId: leaveType?.value
            },
            headers: headers,
        })
            .then(res => {
                openNotificationWithIcon(`success`, `${res?.data?.user?.name} added successfully`);
                setAddEmp(false);
                setButtonProcess(false);
                playAudio(audioPlayer);
                getUsers();
                setName("");
                setEMail("");
            })
            .catch(_err => {
                setButtonProcess(false);
                openNotificationWithIcon("error", `User exists aready`);
                getUsers();
                setName("");
                setEMail("");
            })
    }

    // Delete user function
    const deleteUser = (id) => {
        setActiveLoader(true);
        setButtonProcess(true);

        axios({
            method: "DELETE",
            url: userEditAPI(id),
            headers: headers,
        }).then(res => {
            openNotificationWithIcon(`success`, `${res?.data?.user?.name} removed`);
            setAddEmp(false);
            setActiveLoader(false);
            setButtonProcess(false);
            playAudio(audioPlayer);
            getUsers();
            setName("");
            setEMail("");
        })
            .catch(_err => {
                setActiveLoader(false);
                setButtonProcess(false);
                openNotificationWithIcon("error", `User exists aready`);
                getUsers();
                setName("");
                setEMail("");
            });
    }

    // Function for validation
    const [error, setError] = useState("")
    const validation = (name, mail) => {
        let x
        if (!name) {
            x = "red"
        } else {
            x = ""
        }
        if (!mail) {
            x = "red"
        } else {
            x = ""
        }
        if (!selectPolicy) {
            x = "red"
        } else {
            x = ""
        }
        return x
    }

    // common function for validation
    function checkValidation() {
        setError(validation())
        openNotificationWithIcon(`error`, `Field should not be empty`)
    }
    // setError((validation()))

    // Call to get users
    const [usersData, setUsersData] = useState([])
    const getUsers = () => {
        setActiveLoader(true)
        axios({
            method: "GET",
            url: getUsersAPI(),
            headers: headers,
        })
            .then(res => {
                setUsersData(res?.data?.users.filter(item => item?.role !== "admin"))
                setActiveLoader(false)
            })
            .catch(_err => {
                setActiveLoader(false)
                console.log("Error", _err)
            })
    }

    // SETTING USER DETAILS TO STATE FOR EDIT
    const editUserFun = item => {
        setEditUserPop(true);
        setEditUserPopDetails(item);
        setEmpName(item.name);
        setEmpDesignation(item.jobRole ? item.jobRole : "Employee");
        setEmpUsed(item.allowance?.cos?.used + item.allowance?.gen?.used);
        setEmpLeft(item.allowance?.cos?.remaining + item.allowance?.gen?.remaining);
    }

    // Call to edit, delete user form DB
    const editUserFunOk = () => {
        setActiveLoader(true);
        setButtonProcess(true);
        const data = {
            name: empName,
            jobRole: empDesignation,
        }
        if (empName || empDesignation || empUsed || empLeft) {
            axios({
                method: "PATCH",
                url: userEditAPI(editUserPopDetails?.id),
                data: data,
                headers: headers,
            })
                .then(resp => {
                    openNotificationWithIcon(`success`, "Changes updated");
                    console.log(resp);
                    setEditUserPop(false);
                    getUsers();
                    setActiveLoader(false);
                    setButtonProcess(false);
                })
                .catch(() => {
                    setActiveLoader(false);
                    setButtonProcess(false);
                    openNotificationWithIcon(`error`, "User update failed");
                })
        } else {
            openNotificationWithIcon(`error`, "No changes to update");
        }
    }

    const [openAllowance, setOpenAllowance] = useState(false);
    const [policyDataObj, setPolicyDataObj] = useState();
    const [policyName, setPolicyName] = useState();

    const OpenPolicy = item => {
        setOpenAllowance(true)
        setPolicyDataObj(item?.id)
        setPolicyName(item?.name)
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
                    <HeaderMain
                        title="Employee List"
                        userDataMain={userDataMain}
                        buttonFun={userDataMain?.role === "admin" && (<button onClick={() => setAddEmp(true)}>Add Employee</button>)}
                    />
                    {!openAllowance ?
                        <UsersList
                            nameProf={nameProf}
                            Avatar={Avatar}
                            usersData={usersData}
                            Edit_user={Edit_user}
                            editUserFun={editUserFun}
                            DeleteOutlined={DeleteOutlined}
                            setdeleteUserState={setdeleteUserState}
                            setVisible={setVisible}
                            activeLoader={activeLoader}
                            CompoLoader={CompoLoader}
                            OpenPolicy={OpenPolicy}
                        />
                        :
                        <AllowanceTableView
                            policyDataObj={policyDataObj}
                            policyName={policyName}
                            setOpenAllowance={setOpenAllowance}
                            callFrom="users"
                        />
                    }
                </div>
            </div>


            {/* ADD EMPLOYEE POPUP */}
            <Modal
                title="Add Employee"
                centered
                visible={addEmp}
                onCancel={() => {
                    setAddEmp(false)
                }}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <AddEmployee
                    headers={headers}
                    name={name}
                    Email={Email}
                    setName={setName}
                    setEMail={setEMail}
                    selectPolicy={selectPolicy}
                    setSelectPolicy={setSelectPolicy}
                    leaveType={leaveType}
                    setLeaveType={setLeaveType}
                    addUser={addUser}
                    error={error}
                    buttonProcess={buttonProcess}
                    checkValidation={checkValidation}
                    setButtonProcess={setButtonProcess}
                />
            </Modal>

            {/* Edit User Modal */}
            <Modal
                title="Edit user"
                centered
                visible={editUserPop}
                onCancel={() => {
                    setEditUserPop(false)
                }}
                cancelText="Revert Changes"
                onOk={() => {
                    editUserFunOk()
                    setButtonProcess(true)
                }}
                okText={buttonProcess ? "Process..." : "Save Edit"}
            >
                <EditUser
                    editUserPopDetails={editUserPopDetails}
                    empName={empName}
                    empDesignation={empDesignation}
                    setEmpName={setEmpName}
                    setEmpDesignation={setEmpDesignation}
                    setEmpUsed={setEmpUsed}
                    setEmpLeft={setEmpLeft}
                    checkValidation={checkValidation}
                    setButtonProcess={setButtonProcess}
                />
            </Modal>


            {/* LEAVE ACTION TAKEN POPUP (APPROVE, REJECT, DELETE, User delete, Logout ) */}
            <Modal
                title="Confirmation"
                centered
                visible={visible}
                onOk={() => {
                    setButtonProcess(true)
                    deleteUser(deleteUserState?.id)
                    setVisible(false)
                    setUserConform("")
                    setdeleteUserState(false)
                }}
                onCancel={() => {
                    setVisible(false)
                }}
                width={1000}
                okText="Delete"
                cancelText="Back"
                okButtonProps={{
                    disabled: deleteUserState && userConform !== deleteUserState?.name,
                    display: `none`,
                }}
                className="reject"
            >
                <Fragment>
                    <p
                        style={{
                            fontSize: `22px`,
                            color: `#333333`,
                            fontWeight: `600`,
                            margin: `30px 0`,
                        }}
                    >
                        Do you want to delete ( {deleteUserState?.name} )
                    </p>
                    {deleteUserState && (
                        <input
                            type="text"
                            placeholder="Type in the name of user to conform"
                            id="conform_user"
                            value={userConform}
                            onChange={e => setUserConform(e.target.value)}
                            autoComplete="off"
                            style={{
                                width: `100%`,
                                background: `#FFFFFF`,
                                borderRadius: `6px`,
                                height: `48px`,
                                margin: `0 0 20px 0`,
                                outlineColor: `#1874D2`,
                                paddingLeft: `12px`,
                                border: `1px solid #F3F3F4`,
                            }}
                        />
                    )}
                </Fragment>
            </Modal>
        </BoardContainer>
    )
}
export default Board
