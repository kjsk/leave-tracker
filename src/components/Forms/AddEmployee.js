import React from "react"
import { EmployeeFormStyle } from "../Board/styles"

const AddEmployee = ({
  name,
  Email,
  setName,
  setEMail,
  addUser,
  error,
  buttonProcess,
  checkValidation,
  setButtonProcess,
}) => {
  return (
    <EmployeeFormStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label style={{ color: name?.length < 2 && error }} htmlFor="input">
              Employee Name*
            </label>
            <input
              type="text"
              value={name}
              placeholder="Employee Name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label
              style={{
                color: (Email < 5 || !/\S+@\S+\.\S+/.test(Email)) && error,
              }}
              htmlFor="input"
            >
              Email*
            </label>
            <input
              type="text"
              value={Email}
              placeholder="user@fidisys.com"
              onChange={e => setEMail(e.target.value)}
            />
          </div>
          {name?.length < 2 ||
          Email?.length < 5 ||
          !/\S+@\S+\.\S+/.test(Email) ? (
            <button
              onClick={() => checkValidation()}
              style={{ background: `gray` }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => {
                setButtonProcess(true)
                addUser(name, Email, null)
              }}
              style={{ background: buttonProcess && `gray` }}
            >
              {buttonProcess ? "Processing..." : "Continue"}
            </button>
          )}
        </div>
      </div>
    </EmployeeFormStyle>
  )
}

export default AddEmployee
