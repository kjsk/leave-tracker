import React, { useEffect, useState, useRef } from "react"
import login_logo from "../data/assets/login_logo.svg"
import google from "../data/assets/google.svg"
import { navigate } from "gatsby"
import { initializeApp } from "firebase/app"
import { LoginContainer, userNote } from "../components/Login/styles"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from "axios"
import { getHeaders } from "../utils/urls"
import { Button, Modal, message, notification } from "antd";
import Loader from "../components/loader";
import UserNote from "../components/userNote/UserNote"
import NotificationSound from "../utils/WaterDrop.mp3"


const Login = () => {


  let localToken = typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('userData'))
  const headers = getHeaders(localToken?.tokens?.accessToken);
  const [btnDisable, setBtnDisable] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);
  console.log('headers', headers)

  useEffect(() => {
    if (localToken) {
      typeof localStorage !== `undefined` && localStorage.removeItem('userData');
      signInWithGoogle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signInWithGoogle = () => {
    setActiveLoader(true);
    setBtnDisable(true);
    const firebaseConfig = {
      apiKey: "AIzaSyDfrrgmSPERncXsNZwkkTU17GyI1gyqlIg",
      authDomain: "leave-tracker-applicatio-d51b2.firebaseapp.com",
      projectId: "leave-tracker-applicatio-d51b2",
      storageBucket: "leave-tracker-applicatio-d51b2.appspot.com",
      messagingSenderId: "40042950399",
      appId: "1:40042950399:web:e71861c5700098a8d2e6ca"
    }
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(result => {
      playAudio();
      openNotificationWithIcon(`success`, `verfied User`)
      adminRegister(result?.user?.displayName, result?.user?.email);
    }).catch((error) => {
      playAudio();
      openNotificationWithIcon(`error`, `You should be an fidisys employee`)
      setActiveLoader(false);
      console.log("error", error);
    })
  }


  // Admin register
  const adminRegister = (name, email) => {
    axios({
      method: 'POST',
      url: `https://fidisyslt.herokuapp.com/api/v2/auth/register`,
      data: {
        email: email,
        name: name
      }
    })
      .then((res) => {
        playAudio();
        openNotificationWithIcon(`success`, `${res?.data?.user?.name} registered successfully`)
        typeof localStorage !== `undefined` && localStorage.setItem('userData', JSON.stringify(res.data));
        navigate(`/Board/`);
      })
      .catch((error) => {
        playAudio();
        openNotificationWithIcon(`success`, `Hello ${error?.response?.data?.username}`)
        adminLogin(error?.response?.data?.email);
      })
  }

  // Admin Login
  const adminLogin = (email) => {
    axios({
      method: 'POST',
      url: `https://fidisyslt.herokuapp.com/api/v2/auth/login`,
      data: {
        email: email,
      },
      headers: headers
    })
      .then((res) => {
        typeof localStorage !== `undefined` && localStorage.setItem('userData', JSON.stringify(res.data));
        setBtnDisable(false);
        navigate(`/Board/`);
      })
      .catch(error => { console.log(error); setBtnDisable(false); setActiveLoader(false); })
  }

  const openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: data,
      placement: 'top'
    });
  };


  // setError((validation()))
  // notification conformation sound function
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }
  return (
    <LoginContainer>
      <audio ref={audioPlayer} src={NotificationSound}>
        <track src="captions_es.vtt" kind="captions" srclang="es" label="spanish_captions" />
      </audio>
      {activeLoader && <Loader />}
      <div id="LoginContainer">
        <img src={login_logo} alt="login_logo" />
        <h2>Log In to Leave Tracker</h2>
        <h4>Connect with Google Account</h4>
        <button onClick={signInWithGoogle} disabled={btnDisable} style={{ background: btnDisable ? 'gray' : '#FCFDFE' }}>
          <img src={google} alt="img" />
          Sign in with Google
        </button>
      </div>

      {/* <div id="AdminContainer">
        <h2>You will be Admin for Your Organization</h2>
        <div className="input_main">
          <div id="input_fields">
            <label>ORGANIZATION NAME</label>
            <input type="text" />
          </div>
          <div id="input_fields">
            <label>ORGANIZATION INFORMATION</label>
            <textarea type="text" />
          </div>
          <div id="input_fields">
            <label>NO.OF PEOPLE IN ORGANIZATION</label>
            <input type="text" />
          </div>
          <div className="buttons_main">
            <Button block>Cancel</Button>
            <Button type="primary" block>
              Submit
            </Button>
          </div>
        </div>
      </div> */}

      {/* <div id="userNote">
        <Modal
          visible={false}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <UserNote />
        </Modal>
      </div> */}

    </LoginContainer>
  )
}
export default Login
