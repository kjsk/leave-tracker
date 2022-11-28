import React, { useEffect, useState, useRef } from "react"
import login_logo from "../data/assets/login_logo.svg"
import google from "../data/assets/google.svg"
import { navigate } from "gatsby"
import { initializeApp } from "firebase/app"
import { LoginContainer } from "../components/Login/styles"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from "axios"
import {
  getHeaders,
  adminLoginAPI,
  adminRegisterAPI,
  checkOrgAPI,
  updateOrgAPI,
  createPolicyAPI,
  getPolicyDataAPI
} from "../utils/urls"
import { Button, Modal } from "antd"
import Loader from "../components/loader"
import UserNote from "../components/userNote/UserNote"
import CreateAllowancePop from "../components/Forms/createAllowancePop"
import CreateLeave from "../components/Forms/CreateLeave";
import AudioComponent from "../components/Audio";
import { playAudio, openNotificationWithIcon } from "../utils/functions";
import { getAllLeaveTypes, CreateLeaveTypeFun, disableFun } from "../utils/functions/Common_Functions/function";

const Login = () => {
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA

  // notification conformation sound function
  const audioPlayer = useRef(null)

  const [btnDisable, setBtnDisable] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalMail, setModalMail] = useState("");
  const [validBtn, setvalidBtn] = useState(false);

  const [orgName, setOrgName] = useState("");
  const [orgInfo, setOrgInfo] = useState("");
  const [orgCount, setOrgCount] = useState();
  const [updateOrgVal, setUpdateOrgVal] = useState(0);

  // Create policy setState
  const [policyPop, setPolicyPop] = useState(false);
  const [container, setContainer] = useState([
    {
      id: Math.random(),
      name: "",
      type: "",
      days: "",
      maxLimit: "",
      limitToggle: true,
      description: ""
    }
  ]);

  // Create policy setState
  const [newPolicyName, setNewPolicyName] = useState("");
  const [startMonthOpen, setStartMonthOpen] = useState(false);
  const [endMonthOpen, setEndMonthOpen] = useState(false);
  const [startMonthObj, setStartMonthObj] = useState({
    label: "",
    value: ""
  });
  const [endMonthObj, setEndMonthObj] = useState({
    label: "",
    value: ""
  });


  const [buttonProcess, setButtonProcess] = useState(false);
  const [createLeavePop, setCreateLeavePop] = useState("");
  const [createLeaveName, setCreateLeaveName] = useState("");
  const [createLeaveType, setCreateLeaveType] = useState("");
  const [createLeaveColor, setCreateLeaveColor] = useState("");
  // Get leave types data
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [dropVal, setDropVal] = useState(false);

  const headers = getHeaders(userData?.tokens?.accessToken);

  useEffect(() => {
    if (userData) {
      typeof localStorage !== `undefined` && localStorage.removeItem("userData")
      signInWithGoogle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signInWithGoogle = () => {
    setActiveLoader(true)
    setBtnDisable(true)
    const firebaseConfig = {
      apiKey: "AIzaSyDfrrgmSPERncXsNZwkkTU17GyI1gyqlIg",
      authDomain: "leave-tracker-applicatio-d51b2.firebaseapp.com",
      projectId: "leave-tracker-applicatio-d51b2",
      storageBucket: "leave-tracker-applicatio-d51b2.appspot.com",
      messagingSenderId: "40042950399",
      appId: "1:40042950399:web:e71861c5700098a8d2e6ca",
    }
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)

    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        adminRegister(
          result?.user?.displayName,
          result?.user?.email,
          result?.user?.localId
        )
      })
      .catch(error => {
        openNotificationWithIcon(`error`, `You should be an fidisys employee`)
        setBtnDisable(false)
        setActiveLoader(false)
        console.log("error", error)
      })
  }

  // Admin register
  const adminRegister = (name, email, uId) => {
    axios({
      method: "POST",
      url: adminRegisterAPI(),
      data: {
        email: email,
        name: name,
        uId: uId,
      },
    })
      .then(res => {
        playAudio(audioPlayer);
        openNotificationWithIcon(`success`, `${res?.data?.user?.name} registered successfully`)
        typeof localStorage !== `undefined` &&
          localStorage.setItem("userData", JSON.stringify(res.data))
        if (res?.data?.orgUpdate) {
          setModalDisplay(true)
          setActiveLoader(false)
        } else {
          setModalDisplay(false)
        }
      })
      .catch(error => {
        if (
          error?.response?.data?.message ===
          "Org already exists please contact your admin"
        ) {
          setVisible(true)
          setActiveLoader(false)
          setModalMail(error?.response?.data?.adminEmail)
        } else {
          adminLogin(error?.response?.data?.email)
          openNotificationWithIcon(
            `success`,
            `Hello ${error?.response?.data?.username}`
          )
        }
      })
  }

  // Admin Login
  const adminLogin = email => {
    axios({
      method: "POST",
      url: adminLoginAPI(),
      data: {
        email: email,
      },
      headers: headers,
    })
      .then(res => {
        typeof localStorage !== `undefined` &&
          localStorage.setItem("userData", JSON.stringify(res.data))
        if (localStorage) {
          checkOrg(res?.data?.user?.orgId, res?.data?.tokens?.accessToken)
          setBtnDisable(false)
        }
      })
      .catch(error => {
        console.log(error)
        setBtnDisable(false)
        setActiveLoader(false)
      })
  };

  // API call and condition check for organization
  const checkOrg = (id, accessToken) => {
    axios({
      method: "GET",
      url: checkOrgAPI(id),
      headers: getHeaders(accessToken),
    }).then(res => {
      if (
        res?.data?.org?.orgName === "Default" &&
        userData?.user?.role === "admin"
      ) {
        setModalDisplay(true)
        setActiveLoader(false)
      } else {
        setUpdateOrgVal(1)
      }
    })
  };

  // Call to update & add org under ADMIN
  const updateOrg = () => {
    setActiveLoader(true)
    const neworgCount = orgCount && JSON.parse(orgCount)
    const sampleData = {
      orgName: orgName,
      orgDescription: orgInfo,
      employeeCount: neworgCount,
    }
    axios({
      method: "PATCH",
      url: updateOrgAPI(),
      data: sampleData,
      headers: headers,
    }).then(res => {
      playAudio(audioPlayer);
      if (
        res?.data?.org?.orgName === "Default" &&
        userData?.user?.role === "admin"
      ) {
        setModalDisplay(true)
        setActiveLoader(false)
      } else {
        setUpdateOrgVal(1)
      }
    })
  }


  useEffect(() => {
    CheckPolicyFun();
    // eslint-disable-next-line
  }, [updateOrgVal])


  // Check existing policy for organization
  const CheckPolicyFun = () => {
    axios({
      url: getPolicyDataAPI(),
      method: "GET",
      headers: headers,
    }).then((res) => {
      if (res?.data?.length === 0) {
        setActiveLoader(false)
        setPolicyPop(true)
      } else {
        navigate(`/dashboard`)
      }
    }).catch((err) => {
      setActiveLoader(false)
      console.log(err)
    })
  }

  // Add allowance container
  const AddContainer = () => {
    setContainer([
      ...container,
      {
        id: Math.random(),
        name: "",
        type: "",
        days: "",
        maxLimit: "",
        limitToggle: true,
        description: ""
      }]
    )
  };

  // Remove allowance container
  const RemoveContainer = index => {
    setContainer(container.filter((item) => item.id !== index.id));
  };

  // Edit allowance array
  const editContainerFun = (index, type, value) => {
    const tempArr = [...container];
    tempArr[index][type] = value;
    setContainer(tempArr);
  }

  // Set start date Function
  const setStartMonth = (value, label) => {
    setStartMonthObj({
      label: label,
      value: value
    })
  }

  // Set end date Function
  const setEndMonth = (value, label) => {
    setEndMonthObj({
      label: label,
      value: value
    })
  };

  // Create Allowance Function

  const createPolicyAPIFun = () => {
    const policyData = {
      "startMonth": startMonthObj?.label,
      "endMonth": endMonthObj?.label,
      "name": newPolicyName,
      "description": "New Policy",
      "allowances": newAllowanceSet(container),
    }

    axios({
      url: createPolicyAPI(),
      method: "POST",
      headers: headers,
      data: policyData
    }).then((res) => {
      playAudio(audioPlayer);
      console.log("res", res)
      openNotificationWithIcon(`success`, `New Policy added`)
      navigate(`/dashboard`)
    }).catch((err) => {
      console.log("Error", err);
    })
  }


  const newAllowanceSet = (container) => {
    let tempArr = []
    container.length && container.forEach((item) => {
      tempArr.push({
        "amount": item?.days,
        "maxLimit": item?.limitToggle,
        "maxLimitAmount": item?.maxLimit,
        "name": item?.name,
        "type": item?.type,
        "description": item?.description
      })
    })
    return tempArr;
  }

  useEffect(() => {
    getAllLeaveTypes({ setState: setLeaveTypes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyPop]);

  return (
    <LoginContainer>
      <AudioComponent
        audioPlayer={audioPlayer}
      />
      {activeLoader && <Loader />}
      {visible ? (
        <div id="userNote">
          <Modal
            visible={visible}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={() => {
              navigate(`/Board/`)
            }}
          >
            <UserNote modalMail={modalMail} />
          </Modal>
        </div>
      ) : (
        <>
          {modalDisplay ? (
            <div id="AdminContainer">
              <h2>You will be Admin for Your Organization</h2>
              <div className="input_main">
                <div id="input_fields">
                  <label
                    style={{
                      color: validBtn && orgName.length < 2 ? `red` : "",
                    }}
                    htmlFor="input"
                  >
                    ORGANIZATION NAME
                  </label>
                  <input
                    type="text"
                    onChange={e => setOrgName(e.target.value)}
                  />
                </div>
                <div id="input_fields">
                  <label
                    style={{
                      color: validBtn && orgInfo.length < 5 ? `red` : "",
                    }}
                    htmlFor="input"
                  >
                    ORGANIZATION INFORMATION
                  </label>
                  <textarea
                    type="text"
                    onChange={e => setOrgInfo(e.target.value)}
                  />
                </div>
                <div id="input_fields">
                  <label
                    style={{ color: validBtn && !orgCount ? `red` : "" }}
                    htmlFor="input"
                  >
                    NO.OF PEOPLE IN ORGANIZATION
                  </label>
                  <input
                    type="number"
                    onChange={e => setOrgCount(e.target.value)}
                  />
                </div>
                <div className="buttons_main">
                  <Button
                    block
                    onClick={() => {
                      setModalDisplay(false)
                    }}
                  >
                    Cancel
                  </Button>
                  {validBtn &&
                    orgName.length > 2 &&
                    orgInfo.length > 5 &&
                    orgCount ? (
                    <Button type="primary" block onClick={updateOrg}>
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      onClick={() => setvalidBtn(true)}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div id="LoginContainer">
              <img src={login_logo} alt="login_logo" />
              <h2>Log In to Leave Tracker</h2>
              <h4>Connect with Google Account</h4>
              <>
                <button
                  onClick={signInWithGoogle}
                  disabled={btnDisable}
                  style={{ background: btnDisable ? "gray" : "#FCFDFE" }}
                >
                  <img src={google} alt="img" />
                  Login as Admin
                </button>
                <button
                  onClick={signInWithGoogle}
                  disabled={btnDisable}
                  style={{ background: btnDisable ? "gray" : "#FCFDFE" }}
                >
                  <img src={google} alt="img" />
                  Login as User
                </button>
              </>
            </div>
          )}
        </>
      )}

      {/* Create policy modal */}
      <Modal
        title="Create a policy"
        visible={policyPop}
        onOk={() => {
          createPolicyAPIFun()
        }}
        onCancel={() => {
          setPolicyPop(false)
        }}
        cancelButtonProps={{
          style: { border: "1px solid #3751FF", color: "#3751FF" },
        }}
        okButtonProps={{
          disabled: disableFun({ container, newPolicyName })
        }}
        okText={buttonProcess ? "Processing..." : "Submit"}
      >
        <CreateAllowancePop
          container={container}
          AddContainer={AddContainer}
          RemoveContainer={RemoveContainer}
          editContainerFun={editContainerFun}
          setNewPolicyName={setNewPolicyName}
          setStartMonth={setStartMonth}
          startMonthOpen={startMonthOpen}
          setStartMonthOpen={setStartMonthOpen}
          endMonthOpen={endMonthOpen}
          setEndMonthOpen={setEndMonthOpen}
          startMonthObj={startMonthObj}
          setEndMonth={setEndMonth}
          endMonthObj={endMonthObj}
          setCreateLeavePop={setCreateLeavePop}
          CreateLeaveTypeFun={() => CreateLeaveTypeFun({
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
          dropVal={dropVal}
          setDropVal={setDropVal}
          leaveTypes={leaveTypes}
        />
      </Modal>


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
    </LoginContainer>
  )
}
export default Login
