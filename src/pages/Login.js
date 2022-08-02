import React, { useEffect } from "react"
import login_logo from "../data/assets/login_logo.svg"
import google from "../data/assets/google.svg"
import { navigate } from "gatsby"
import { initializeApp } from "firebase/app"
import { LoginContainer } from "../components/Login/styles"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from "axios"
import { getHeaders } from "../utils/urls"

const Login = () => {


  let localToken = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('userData'))
  const headers = getHeaders(localToken?.tokens?.accessToken);

  console.log('headers', headers)
  useEffect(() => {
    if (localToken) {
      navigate(`/Board/`);
    } else {
      signInWithGoogle();
    }
  }, []);

  const signInWithGoogle = () => {
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
      adminRegister(result?.user?.displayName, result?.user?.email);
      console.log("result", result);
    }).catch((error) => {
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
        navigate(`/Board/`, {
          state: {
            item: res,
          }
        }
        );
        typeof window !== `undefined` && window.localStorage.setItem('userData', JSON.stringify(res.data));
      })
      .catch(error => {
        alert(error?.response?.data?.message)
        adminLogin(email);
      })
  }

  // Admin Login
  const adminLogin = (name, email) => {
    axios({
      method: 'POST',
      url: `https://fidisyslt.herokuapp.com/api/v2/auth/login`,
      data: {
        email: email,
      },
      headers: headers
    })
      .then((res) => {
        navigate(`/Board/`, {
          state: {
            item: res,
          }
        });
        typeof window.localStorage !== `undefined` && window.localStorage.setItem('userData', JSON.stringify(res.data));
      })
      .catch(error => console.log(error))
  }
  return (
    <LoginContainer>
      <div id="LoginContainer">
        <img src={login_logo} alt="login_logo" />
        <h2>Log In to Leave Tracker</h2>
        <h4>Connect with Google Account</h4>
        <button onClick={signInWithGoogle}>
          <img src={google} alt="img" />
          Sign in with Google
        </button>
      </div>
    </LoginContainer>
  )
}
export default Login
