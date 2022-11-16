import React from "react"
import { CreateLeaveStyle } from "../Allowance/styles"

const CreateLeave = ({
  createLeaveName,
  setCreateLeaveName,
  createLeaveType,
  setCreateLeaveType,
  createLeaveColor,
  setCreateLeaveColor,
  CreateLeaveFun,
  buttonProcess,
  setButtonProcess,
  createLeavePop,
  setCreateLeavePop,
}) => {
  return (
    <CreateLeaveStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label
              style={{
                color:
                  createLeaveName?.length < 2 &&
                  createLeaveName?.length != 0 &&
                  "red",
              }}
              htmlFor="input"
            >
              Leave Name*
            </label>
            <input
              type="text"
              value={createLeaveName}
              placeholder="Leave Name"
              onChange={e => setCreateLeaveName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label
              style={{
                color:
                  createLeaveType.length < 5 &&
                  createLeaveType?.length != 0 &&
                  "red",
              }}
              htmlFor="input"
            >
              Leave Type*
            </label>
            <input
              type="text"
              value={createLeaveType}
              placeholder="Leave Type"
              onChange={e => setCreateLeaveType(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label
              style={{
                color:
                  createLeaveColor.length < 2 &&
                  createLeaveColor.length != 0 &&
                  "red",
              }}
              htmlFor="input"
            >
              Leave Theme*
            </label>
            <input
              type="text"
              value={createLeaveColor}
              placeholder="Set color for leave"
              onChange={e => setCreateLeaveColor(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              CreateLeaveFun()
            }}
            style={{ background: buttonProcess && `gray` }}
            disabled={
              createLeaveName?.length < 2 &&
              createLeaveType.length < 2 &&
              createLeaveColor.length < 2
            }
          >
            {buttonProcess ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </CreateLeaveStyle>
  )
}

export default CreateLeave
