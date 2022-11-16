import React, { useState, useEffect, Fragment } from "react"
import EmptyRoster from "../EmptyRoster"
import { Modal } from "antd"
import CreateAllowancePop from "./createAllowancePop"
import { AllowanceContainer } from "./styles"
import AllowanceTableView from "./allowanceTable"
import axios from "axios"
import {
  getPolicyDataAPI,
  getAllowanceByPolicy,
  getHeaders,
} from "../../utils/urls"
import Edit_user from "../../data/assets/Edit_user.svg"
import { DeleteOutlined } from "@ant-design/icons"

const Allowance = ({ policyPop, setPolicyPop }) => {
  const [openAllowance, setOpenAllowance] = useState(false)

  const [policyData, setPolicyData] = useState([])
  const [policyDataObj, setPolicyDataObj] = useState()
  const [policyName, setPolicyName] = useState()

  let localToken =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"))
  const headers = getHeaders(localToken?.tokens?.accessToken)

  useEffect(() => {
    GetPolicyFun()
  }, [])
  const GetPolicyFun = () => {
    axios({
      url: getPolicyDataAPI(),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res?.data) {
          setPolicyData(res?.data)
        }
      })
      .catch(err => console.log("Error", err))
  }

  console.log("policyData", policyData)

  const OpenPolicy = item => {
    setOpenAllowance(true)
    setPolicyDataObj(item?.id)
    setPolicyName(item?.name)
  }
  return (
    <Fragment>
      {" "}
      {!openAllowance ? (
        <AllowanceContainer>
          <button onClick={() => GetPolicyFun()}>Click</button>
          <div id="admin_homes">
            <div id="admin" className="admin">
              <div id="message">
                <div id="message_block1">
                  <h3>SNo</h3>
                  <h3>Name</h3>
                  <h3>Description</h3>
                  <h3>Action</h3>
                </div>
                <div id="message_block2">
                  {policyData?.map((item, index) => {
                    return (
                      <div id="task_container">
                        <p>{index + 1}</p>
                        <p
                          onClick={() => OpenPolicy(item)}
                          style={{ color: "blue" }}
                        >
                          {item?.name}
                        </p>
                        <p>{item?.description}</p>
                        <div id="btns">
                          <img
                            src={Edit_user}
                            alt="Edit_user"
                            role="presentation"
                            // onClick={() => setEditAllowancePop(true)}
                          />
                          <DeleteOutlined
                            style={{
                              color: `red`,
                              marginLeft: `15px`,
                              fontSize: `23px`,
                            }}
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </AllowanceContainer>
      ) : (
        <AllowanceTableView
          policyDataObj={policyDataObj}
          policyName={policyName}
          setOpenAllowance={setOpenAllowance}
        />
      )}
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
    </Fragment>
  )
}
export default Allowance
