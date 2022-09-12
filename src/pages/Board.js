import React, { useEffect, useState, useRef } from "react"
import login_logo from "../data/assets/login_logo.svg"
import overview from "../data/assets/overview.svg"
import overview2 from "../data/assets/overview_hover.svg"
import admin from "../data/assets/admin.svg"
import admin2 from "../data/assets/admin_hover.svg"
import Calendar from "../data/assets/Calendar.svg"
import Calendar2 from "../data/assets/Calendar_hover.svg"
import settings from "../data/assets/settings.svg"
import settings2 from "../data/assets/settings_hover.svg"
import logout from "../data/assets/logout.svg"
import logout_hover from "../data/assets/logout_hover.svg"
// import search from '../data/assets/search.svg';
// import notificaton from '../data/assets/notificaton.svg';
import Edit_user from "../data/assets/Edit_user.svg"
import { BoardContainer } from "../components/Board/styles"
import {
  DeleteOutlined,
  SettingOutlined,
  CalendarOutlined,
  UpOutlined,
  DownOutlined,
  RightOutlined,
  LeftOutlined,
  RedoOutlined,
} from "@ant-design/icons"
import { Popover, Drawer, Result, Modal, notification } from "antd"
import SideModal from "../components/leavePopup/index"
// import Notification from "../components/leavePopup/notification";
// import share from '../data/assets/share.svg';
import axios from "axios"
import {
  getHeaders,
  baseURL,
  leavesAPI,
  userEditAPI,
  getUsersAPI,
  addUserAPI,
} from "../utils/urls"
import { navigate } from "gatsby"
import NotificationSound from "../utils/notification.mp3"
import AddEmployee from "../components/Forms/AddEmployee"
import EditUser from "../components/Forms/EditUser"
import LeaveDetails from "../components/Forms/LeaveDetails"
import Avatar from "../components/Avatar/index"
import Home from "../components/Board/home"
import AdminPortal from "../components/Board/AdminPortal"
import UsersList from "../components/Board/UsersList"
import CompoLoader from "../components/ComponentLoader"

const Board = () => {
  const urlGlobal = baseURL // ADDING GLOBAL BASE URL

  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
  const userDataMain = userData?.user

  const [popup, setPopup] = useState(false)
  const [sideToggle, setSideToggle] = useState(1)
  const [sideSubOpen, setSideSubOpen] = useState(false)
  const [sideToggleSub, setSideToggleSub] = useState({ name: "", value: "" })
  const [userLeaveData, setUserLeaveData] = useState([])
  const [activeLoader, setActiveLoader] = useState(false)
  const [adminToggle, setAdminToggle] = useState("pending")
  const [visible, setVisible] = useState(false)
  const [addEmp, setAddEmp] = useState(false)
  const [barOpen, setbarOpen] = useState(true)
  const [leaveDetail, setLeaveDetail] = useState(false)
  const [leaveDetailContent, setLeaveDetailContent] = useState("")
  const [descType, setDescType] = useState("")
  const [descId, setDescId] = useState("")
  const [name, setName] = useState("")
  const [Email, setEMail] = useState("")
  const [logoutState, setLogoutState] = useState(false)
  const [deleteUserState, setdeleteUserState] = useState(false)
  const [userConform, setUserConform] = useState("")
  const [buttonProcess, setButtonProcess] = useState(false)

  // common headers
  const headers = getHeaders(userData?.tokens?.accessToken)

  // FETCHING LEAVE ON PAGELOAD
  useEffect(() => {
    const toggleRout = JSON.parse(localStorage.getItem("toggleRout"))
    if (toggleRout) {
      setSideToggle(toggleRout)
    }
    if (userData) {
      getLeaves()
      getUsers()
    } else {
      logOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const conditionalFun = number => {
    localStorage.setItem("toggleRout", number)
    setSideToggle(number)
    setSideToggleSub({ name: "", value: "" })
  }

  // Call to fetch the number of leaves by user
  const getLeaves = () => {
    setActiveLoader(true)
    setButtonProcess(true)
    axios({
      method: "GET",
      url: leavesAPI(),
      headers: headers,
    })
      .then(res => {
        setActiveLoader(false)
        setButtonProcess(false)
        setUserLeaveData(res?.data)
      })
      .catch(_err => {
        setActiveLoader(false)
        setButtonProcess(false)
        console.log("Error", _err)
      })
  }

  // Function to split letters in user name to use as DP
  const nameProf = name => {
    let text = name
    const myArray = text?.split(" ")
    return (
      myArray &&
      (myArray[0] ? myArray[0][0] : "") +
        " " +
        (myArray[1] ? myArray[1][0] : "")
    )
  }

  // Call for logout and cleanup the localstorage
  const logOut = () => {
    if (typeof localStorage !== `undefined`) {
      localStorage.removeItem("userData")
      localStorage.removeItem("toggleRout")
    }
    navigate(`/Login`)
    openNotificationWithIcon(`success`, "Logout Successfully")
  }

  // Approve Reject popup function
  const desecision = (type, id) => {
    setDescType(type)
    setDescId(id)
    setVisible(true)
    setLeaveDetail(false)
  }

  // call to action on leave (APPROVE, REJECT, DELETE)
  const approveLeave = (type, leaveId) => {
    setActiveLoader(true)
    setButtonProcess(true)
    axios({
      method: type === "delete" ? "Delete" : "PUT",
      url: `${urlGlobal}/api/v2/leaves${
        type !== "delete" ? "/" + type : ""
      }/${leaveId}`,
      headers: headers,
    })
      .then(res => {
        getLeaves()
        setLeaveDetail(false)
        setButtonProcess(false)
        openNotificationWithIcon("success", res?.data?.message)
        playAudio()
      })
      .catch(_err => {
        setActiveLoader(false)
        setButtonProcess(false)
        setLeaveDetail(false)
        console.log("Error", _err)
      })
  }

  // Call to add employee
  const addUser = (name, Email, id) => {
    setActiveLoader(true)
    setButtonProcess(true)
    let conditionAPI
    if (id) {
      conditionAPI = axios({
        method: "DELETE",
        url: userEditAPI(id),
        headers: headers,
      })
    } else {
      const userEmail = Email.toLowerCase()
      conditionAPI = axios({
        method: "POST",
        url: addUserAPI(),
        data: {
          name: name,
          email: userEmail,
        },
        headers: headers,
      })
    }

    conditionAPI
      .then(res => {
        openNotificationWithIcon(
          `success`,
          id
            ? `${res?.data?.user?.name} removed`
            : `${res?.data?.user?.name} added successfully`
        )
        setAddEmp(false)
        setActiveLoader(false)
        setButtonProcess(false)
        playAudio()
        getUsers()
        setName("")
        setEMail("")
      })
      .catch(_err => {
        setActiveLoader(false)
        setButtonProcess(false)
        openNotificationWithIcon("error", `User exists aready`)
        getUsers()
        setName("")
        setEMail("")
      })
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

    return x
  }

  function checkValidation() {
    setError(validation())
    openNotificationWithIcon(`error`, `Field should not be empty`)
  }
  // setError((validation()))

  // notification conformation sound function
  const audioPlayer = useRef(null)

  function playAudio() {
    audioPlayer.current.play()
  }

  const leaveMap = userLeaveData?.leaves?.filter(
    item => item.status === adminToggle
  )

  const openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: data,
      placement: "top",
    })
  }

  const openLeaveDetailsFun = (item, desType) => {
    setLeaveDetail(true)
    setLeaveDetailContent({ item, desType })
  }

  // Call to get users
  const [usersData, setUsersData] = useState([])
  const getUsers = () => {
    axios({
      method: "GET",
      url: getUsersAPI(),
      headers: headers,
    })
      .then(res => {
        setUsersData(res?.data?.users.filter(item => item?.role !== "admin"))
        console.log(usersData)
      })
      .catch(_err => {
        console.log("Error", _err)
      })
  }

  const [editUserPop, setEditUserPop] = useState(false)
  const [editUserPopDetails, setEditUserPopDetails] = useState(false)
  const [empName, setEmpName] = useState("")
  const [empDesignation, setEmpDesignation] = useState("")
  const [empUsed, setEmpUsed] = useState("")
  const [empLeft, setEmpLeft] = useState("")

  // SETTING USER DETAILS TO STATE FOR EDIT
  const editUserFun = item => {
    setEditUserPop(true)
    setEditUserPopDetails(item)
    setEmpName(item.name)
    setEmpDesignation(item.jobRole ? item.jobRole : "Employee")
    setEmpUsed(item.allowance?.cos?.used + item.allowance?.gen?.used)
    setEmpLeft(item.allowance?.cos?.remaining + item.allowance?.gen?.remaining)
  }

  // Call to edit, delete user form DB
  const editUserFunOk = () => {
    setActiveLoader(true)
    setButtonProcess(true)
    const data = {
      name: empName,
      jobRole: empDesignation,
    }
    if (empName || empName || empDesignation || empUsed || empLeft) {
      axios({
        method: "PATCH",
        url: userEditAPI(editUserPopDetails?.id),
        data: data,
        headers: headers,
      })
        .then(resp => {
          openNotificationWithIcon(`success`, "Changes updated")
          console.log(resp)
          setEditUserPop(false)
          getUsers()
          setActiveLoader(false)
          setButtonProcess(false)
        })
        .catch(() => {
          setActiveLoader(false)
          setButtonProcess(false)
          openNotificationWithIcon(`error`, "User update failed")
        })
    } else {
      openNotificationWithIcon(`error`, "No changes to update")
    }
  }

  // Setting variables manually for leave count in User dash board
  const leaveApproved = userLeaveData?.leaves?.filter(
    item => item.status === "approved"
  )
  const leaveRejected = userLeaveData?.leaves?.filter(
    item => item.status === "rejected"
  )
  const leavePending = userLeaveData?.leaves?.filter(
    item => item.status === "pending"
  )
  const userRealData = userLeaveData?.leaves?.filter(
    item => item.status === adminToggle
  )
  useEffect(() => {
    if (sideSubOpen === false) {
      setSideToggleSub({ name: "", value: "" })
    }
  }, [sideSubOpen])

  // SETTING COMMON PROPS FOR ALL THE COMPONENTS
  const commonProps = {
    leaveApproved,
    leavePending,
    leaveRejected,
    userLeaveData,
    usersData,
    Edit_user,
    editUserFun,
    DeleteOutlined,
    addUser,
    // share,
    adminToggle,
    setAdminToggle,
    leaveMap,
    userRealData,
    Avatar,
    nameProf,
    openLeaveDetailsFun,
    userDataMain,
    desecision,
    openNotificationWithIcon,
    activeLoader,
    setActiveLoader,
    setdeleteUserState,
    setVisible,
    getLeaves,
    RedoOutlined,
    CompoLoader,
    setButtonProcess,
    buttonProcess,
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
            <li
              className={sideToggle === 1 && "active"}
              role="presentation"
              onClick={() => {
                conditionalFun(1)
                setSideSubOpen(false)
              }}
            >
              <img src={sideToggle === 1 ? overview2 : overview} alt="img" />
              {barOpen && "Home"}
            </li>
            <li
              className={sideToggle === 2 && "active"}
              role="presentation"
              onClick={() => {
                conditionalFun(2)
                setSideSubOpen(false)
              }}
            >
              <img src={sideToggle === 2 ? Calendar2 : Calendar} alt="img" />
              {barOpen && "Calendar"}
            </li>
            {userDataMain?.role === "admin" ? (
              <li
                className={sideToggle === 3 && "active"}
                role="presentation"
                onClick={() => {
                  conditionalFun(3)
                }}
              >
                <img src={sideToggle === 3 ? admin2 : admin} alt="img" />
                {barOpen && "Admin Portal"}{" "}
                {barOpen && (
                  <span
                    onClick={() => setSideSubOpen(!sideSubOpen)}
                    role="presentation"
                  >
                    {sideSubOpen ? <UpOutlined /> : <DownOutlined />}
                  </span>
                )}
              </li>
            ) : (
              <li
                className={sideToggle === 3 && "active"}
                role="presentation"
                onClick={() => {
                  conditionalFun(3)
                  setSideSubOpen(false)
                }}
              >
                <img src={sideToggle === 3 ? admin2 : admin} alt="img" />
                {barOpen && `User Portal`}
              </li>
            )}
            {sideSubOpen && barOpen && (
              <div id="menu_dropdown">
                <span
                  id={sideToggleSub.value === 1 && "active"}
                  onClick={() =>
                    setSideToggleSub({ name: "Employee List", value: 1 })
                  }
                  role="presentation"
                >
                  Employee List
                </span>
              </div>
            )}
          </ul>
          <ul>
            <li
              className={sideToggle === 4 && "active"}
              role="presentation"
              onClick={() => {
                conditionalFun(4)
                setSideToggleSub({ name: "", value: "" })
                setSideSubOpen(false)
              }}
            >
              <img src={sideToggle === 4 ? settings2 : settings} alt="img" />
              {barOpen && "Settings"}
            </li>
          </ul>

          <ul id="logout">
            <li
              onClick={() => {
                setVisible(true)
                setLogoutState(true)
              }}
              role="presentation"
            >
              {" "}
              <img src={logout_hover} alt="img" className="imghover" />
              <img src={logout} alt="img" className="image" />
              {barOpen && "logout"}
            </li>
          </ul>
        </div>
        <div
          id="main_menu"
          style={{ background: sideToggle === 1 ? "white" : "#FCFAFA" }}
        >
          <div id="header">
            <h2 id="title">
              {sideToggle === 1
                ? "Home"
                : sideToggle === 2
                ? "Calendar"
                : sideToggle === 3
                ? userDataMain?.role === "admin"
                  ? "Admin Portal"
                  : "User Portal"
                : sideToggle === 4
                ? "Settings"
                : ""}{" "}
              {sideToggleSub.name &&
                sideToggle === 3 &&
                `(${sideToggleSub.name})`}
            </h2>
            <div id="mini_block">
              <button onClick={() => setPopup(true)}>Apply Leave</button>
              {sideToggle === 1 && userDataMain?.role !== "admin" && (
                <button onClick={() => setPopup(true)}>Apply Leave</button>
              )}
              {sideToggle === 3 && userDataMain?.role === "admin" && (
                <button onClick={() => setAddEmp(true)}>Add Employee</button>
              )}
              {/* <img src={search} alt="img" id="search" /> */}
              {/* <Popover placement="bottomRight" content={<Notification />} style={{ position: 'relative' }}>
                                <Badge count={userLeaveData?.leaves?.length}>
                                    <img src={notificaton} alt="img" id="notificaton" />
                                </Badge>
                            </Popover> */}
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

          {/* HOME */}
          {sideToggle === 1 && sideToggleSub.value === "" && (
            <Home {...commonProps} />
          )}

          {/* CALENDAR */}
          {sideToggle === 2 && sideToggleSub.value === "" && (
            <Result
              icon={<CalendarOutlined />}
              title="Hello, Calender coming soon!"
            />
          )}

          {/* ADMIN & USER PORTAL */}
          {sideToggle === 3 && sideToggleSub.value === "" && (
            <AdminPortal {...commonProps} />
          )}

          {/* USERLIST */}
          {sideToggle === 3 && sideToggleSub.value === 1 && (
            <UsersList {...commonProps} />
          )}

          {/* SETTINGS */}
          {sideToggle === 4 && (
            <Result
              icon={<SettingOutlined />}
              title="Hello, Settings coming soon!"
            />
          )}
        </div>
      </div>

      {/* SIDE MODAL DRAWER TO APPLY LEAVE */}
      <Drawer
        visible={popup}
        onClose={() => setPopup(false)}
        width="fit-content"
      >
        <SideModal
          popup={popup}
          setPopup={setPopup}
          headers={headers}
          getLeaves={getLeaves}
          userDataMain={userDataMain}
          setActiveLoader={setActiveLoader}
          playAudio={playAudio}
          openNotificationWithIcon={openNotificationWithIcon}
          {...commonProps}
        />
      </Drawer>

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
          name={name}
          Email={Email}
          setName={setName}
          setEMail={setEMail}
          addUser={addUser}
          error={error}
          buttonProcess={buttonProcess}
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
          getUsers()
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

      {/* LEAVE DETAILS POPUP */}
      <Modal
        centered
        visible={leaveDetail}
        onCancel={() => {
          setLeaveDetail(false)
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Continue"
      >
        <LeaveDetails
          leaveDetailContent={leaveDetailContent}
          desecision={desecision}
          nameProf={nameProf}
          userDataMain={userDataMain}
        />
      </Modal>

      {/* LEAVE ACTION TAKEN POPUP (APPROVE, REJECT, DELETE, User delete, Logout ) */}
      <Modal
        title="Confirmation"
        centered
        visible={visible}
        onOk={() => {
          setButtonProcess(true)
          deleteUserState
            ? addUser(null, null, deleteUserState?.id)
            : logoutState
            ? logOut()
            : approveLeave(
                descType === "approve"
                  ? "approve"
                  : descType === "reject"
                  ? "reject"
                  : "delete",
                descId
              )
          setVisible(false)
          setUserConform("")
          setdeleteUserState(false)
        }}
        onCancel={() => {
          setLogoutState(false)
          setdeleteUserState(false)
          setVisible(false)
          setUserConform("")
        }}
        width={1000}
        okText={
          buttonProcess
            ? "Processing..."
            : logoutState || deleteUserState
            ? "Proceed"
            : descType === "approve"
            ? "Approve"
            : descType === "reject"
            ? "Reject"
            : "Delete"
        }
        cancelText="Back"
        okButtonProps={{
          disabled: deleteUserState && userConform !== deleteUserState?.name,
          display: `none`,
        }}
        className={descType === "approve" ? "approve" : "reject"}
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
            {deleteUserState
              ? `Do you want to delete (${deleteUserState?.name})`
              : "Do you want to " +
                (logoutState
                  ? "Logout"
                  : descType === "approve"
                  ? "Approve"
                  : descType === "reject"
                  ? "Reject"
                  : "Delete")}
            ?
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
        </>
      </Modal>
    </BoardContainer>
  )
}
export default Board
