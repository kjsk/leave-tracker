import React, { useState } from "react"
import { AddAllowancePopStyles } from "./styles"
import { Switch } from "antd"
import { PlusCircleOutlined, MinusOutlined } from "@ant-design/icons"

const AddAllowancePop = () => {
  const onChange = checked => {
    console.log(`switch to ${checked}`)
  }

  const [container, setContainer] = useState([{}])
  const AddContainer = () => {
    const tempArr = [...container]
    tempArr.push({})
    setContainer([...tempArr])
  }

  const RemoveContainer = index => {
    container.splice(index, 1)
    setContainer([...container])
  }

  return (
    <AddAllowancePopStyles>
      <div id="add_employee_main">
        {container?.map((item, index) => {
          return (
            <div id="add_allowance_container" key={index}>
              {index > 0 && (
                <div className="btn_container">
                  <button
                    className="remove_allowance_btn"
                    onClick={() => RemoveContainer(index)}
                  >
                    <MinusOutlined style={{ margin: `0 10px 0 0 ` }} />
                    Remove Allowance
                  </button>
                </div>
              )}
              <div id="employee_wrap">
                <div id="input_wrap">
                  <label htmlFor="input">Allowance name</label>
                  <input type="text" placeholder="Allowance name" />
                </div>
                <div id="input_wrap">
                  <label htmlFor="input">Type</label>
                  <input type="text" placeholder="Type" />
                </div>
              </div>
              <div id="employee_wrap_policy">
                <div id="input_wrap">
                  <label htmlFor="input">No of Days</label>
                  <input type="text" placeholder="No of Days" />
                </div>
                <div id="input_wrap">
                  <label htmlFor="input">Max Limit</label>
                  <input type="text" placeholder="Max Limit" />
                </div>
                <div id="input_wrap" className="input_wrap">
                  <label htmlFor="input">Max Limit</label>
                  <Switch
                    defaultChecked
                    onChange={onChange}
                    className="switch"
                  />
                </div>
              </div>

              <div id="employee_wrap" className="employee_wrap_description">
                <div id="input_wrap">
                  <label htmlFor="input">Description</label>
                  <textarea type="text" placeholder="Description" />
                </div>
              </div>
            </div>
          )
        })}
        <div className="btn_container">
          <button id="add_allowance_btn" onClick={() => AddContainer()}>
            <PlusCircleOutlined style={{ margin: `0 10px 0 0 ` }} />
            Add Allowance
          </button>
        </div>
      </div>
    </AddAllowancePopStyles>
  )
}
export default AddAllowancePop
