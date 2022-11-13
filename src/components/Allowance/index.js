import React from "react"
import EmptyRoster from "../EmptyRoster"

function loadscript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script")
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Allowance = () => {
  const newFun = async () => {
    await loadscript("https://checkout.razorpay.com/v1/checkout.js")
    const options = {
      key: "rzp_live_h3HQKK2XFgJopO",
      currency: "INR",
      amount: 1 * 100,
      name: "Content Concepts",
      description: "Adding value to the lives",
      prefill: {
        name: "Manoj Ponugoti",
        Email: "manoj@fidisys.com",
        contact: "9494978552",
      },
      theme: {
        color: "rgb(25, 118, 210) !important",
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    console.log("paymentObject", paymentObject)
  }
  return (
    <div id="admin_homes">
      <button onClick={() => newFun()}>click me</button>
      <div id="admin" className="admin">
        <div id="message">
          <div id="message_block1">
            <h3>SNo</h3>
            <h3>Name</h3>
            <h3>Description</h3>
          </div>
          <div id="message_block2">
            <div id="task_container">
              <p>1</p>
              <p>Policy 1</p>
              <p>Description 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Allowance
