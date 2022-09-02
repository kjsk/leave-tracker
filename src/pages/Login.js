import React, { useEffect, useState } from "react"
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
} from "../utils/urls"
import { notification, Button, Modal } from "antd"
import Loader from "../components/loader"
// import NotificationSound from "../utils/WaterDrop.mp3"
import UserNote from "../components/userNote/UserNote"

const Login = () => {
  let localToken =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"))

  const [btnDisable, setBtnDisable] = useState(false)
  const [activeLoader, setActiveLoader] = useState(false)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalMail, setModalMail] = useState("")
  const [validBtn, setvalidBtn] = useState(false)

  const [orgName, setOrgName] = useState("")
  const [orgInfo, setOrgInfo] = useState("")
  const [orgCount, setOrgCount] = useState()
  const headers = getHeaders(localToken?.tokens?.accessToken)

  useEffect(() => {
    if (localToken) {
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
        // playAudio();
        adminRegister(
          result?.user?.displayName,
          result?.user?.email,
          result?.user?.localId
        )
      })
      .catch(error => {
        // playAudio();
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
        // playAudio();
        openNotificationWithIcon(
          `success`,
          `${res?.data?.user?.name} registered successfully`
        )
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
        // playAudio();
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
  }

  // API call and condition check for organization
  const checkOrg = (id, accessToken) => {
    axios({
      method: "GET",
      url: checkOrgAPI(id),
      headers: getHeaders(accessToken),
    }).then(res => {
      if (
        res?.data?.org?.orgName === "Default" &&
        localToken?.user?.role === "admin"
      ) {
        setModalDisplay(true)
        setActiveLoader(false)
      } else {
        navigate(`/Board`)
        setActiveLoader(false)
      }
    })
  }

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
      if (
        res?.data?.org?.orgName === "Default" &&
        localToken?.user?.role === "admin"
      ) {
        setModalDisplay(true)
        setActiveLoader(false)
      } else {
        navigate(`/Board`)
        setActiveLoader(false)
      }
    })
  }

  const openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: data,
      placement: "top",
    })
  }

  return (
    <LoginContainer>
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
              <button
                onClick={signInWithGoogle}
                disabled={btnDisable}
                style={{ background: btnDisable ? "gray" : "#FCFDFE" }}
              >
                <img src={google} alt="img" />
                Sign in with Google
              </button>
            </div>
          )}
        </>
      )}
    </LoginContainer>
  )
}
export default Login
