import { notification } from "antd";
import { navigate } from "gatsby";

// Fetch user data from local storage
const userData =
  typeof localStorage !== "undefined" &&
  JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
export const userDataMain = userData?.user;

// Function to split letters in user name to use as DP
export const nameProf = name => {
  let text = name
  const myArray = text?.split(" ")
  return (
    myArray &&
    (myArray[0] ? myArray[0][0] : "") + " " + (myArray[1] ? myArray[1][0] : "")
  )
}

// common function for custom notification
export const openNotificationWithIcon = (type, data) => {
  notification[type]({
    message: data,
    placement: "top",
  })
}

// Call for logout and cleanup the localstorage
export const logoutFun = () => {
  if (typeof localStorage !== `undefined`) {
    localStorage.removeItem("userData")
    localStorage.removeItem("toggleRout")
  }
  navigate(`/Login`)
  openNotificationWithIcon(`success`, "Logout Successfully")
}