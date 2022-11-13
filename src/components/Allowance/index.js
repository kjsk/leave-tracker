import React, { useState } from "react"
import EmptyRoster from "../EmptyRoster"
import { Modal } from "antd"
import CreateAllowancePop from "./createAllowancePop"
import { AllowanceContainer } from "./styles"

const Allowance = ({ policyPop, setPolicyPop }) => {
  return (
    <AllowanceContainer>
      <div id="admin_homes">
        <div id="admin" className="admin">
          <h2>Employe Details</h2>
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
        <Modal
          title="Create a policy"
          visible={policyPop}
          onCancel={() => {
            setPolicyPop(false)
          }}
          style={{ top: 800 }}
          cancelButtonProps={{
            style: { border: "1px solid #3751FF", color: "#3751FF" },
          }}
        >
          <CreateAllowancePop />
        </Modal>
      </div>
    </AllowanceContainer>
  )
}
export default Allowance
