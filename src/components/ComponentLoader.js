import React from "react"
import { Spin } from "antd"

const CompoLoader = () => {
  return (
    <div
      style={{
        width: `100%`,
        height: `20vw`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <Spin tip="Loading..." size="large" />
    </div>
  )
}
export default CompoLoader
