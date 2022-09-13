import React from "react"
const Avatar = ({ name, nameProf }) => {
  return <p id="profile-icon">{name && nameProf(name).toUpperCase()}</p>
}

export default Avatar
