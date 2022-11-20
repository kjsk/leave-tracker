import React, { useState, useEffect, Fragment } from "react"
import EmptyRoster from "../EmptyRoster"
import { Modal } from "antd"
import CreateAllowancePop from "./createAllowancePop"
import { AllowanceContainer } from "./styles"
import AllowanceTableView from "./allowanceTable"
import axios from "axios"
import {
  getPolicyDataAPI,
  getHeaders,
  deletePolicyAPI,
  editPolicyAPI,
} from "../../utils/urls"
import Edit_user from "../../data/assets/Edit_user.svg"
import { DeleteOutlined } from "@ant-design/icons"
import EditPolicy from "../Forms/EditPolicy"

const Allowance = ({ policyPop, setPolicyPop }) => {
  const [btnProgress, setBtnProgress] = useState(false);
  const [openAllowance, setOpenAllowance] = useState(false)

  const [policyData, setPolicyData] = useState([])
  const [policyDataObj, setPolicyDataObj] = useState()
  const [policyName, setPolicyName] = useState()

  // Edit policy setState
  const [editPolicyName, setEditPolicyName] = useState("")
  const [editPolicyDesc, setEditPolicyDesc] = useState("")
  const [editPolicyPop, setEditPolicyPop] = useState(false)

  // Delete policy setState
  const [deletePolicyID, setDeletePolicyID] = useState("");

  // Create new policy
  const [container, setContainer] = useState([
    {
      id: Math.random(),
      name: "",
      type: "",
      days: "",
      maxLimit: "",
      limitToggle: true,
      description: ""
    }
  ])

  // Create policy setState
  const [newPolicyName, setNewPolicyName] = useState("");
  const [startMonthOpen, setStartMonthOpen] = useState(false);
  const [startMonthObj, setStartMonthObj] = useState({
    label: "",
    value: ""
  });
  const [endMonthObj, setEndMonthObj] = useState({
    label: "",
    value: ""
  });

  // Fetching userdata from local Storage
  let localToken =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"))

  // Adding global headers
  const headers = getHeaders(localToken?.tokens?.accessToken)

  // Initial call for get policy details
  useEffect(() => {
    GetPolicyFun()
  }, [])

  // Get policy details Function
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

  // Call to delete Allowance
  const DeleteAPIFun = policyId => {
    setBtnProgress(true);
    axios({
      url: deletePolicyAPI(policyId),
      method: "DELETE",
      headers: headers,
    })
      .then(_res => {
        setBtnProgress(false);
        setDeletePolicyID("");
        GetPolicyFun();
      })
      .catch(err => {
        setBtnProgress(false);
        console.log("Error", err);
      })
  }

  // Set policy data
  const EditAPIDataFun = item => {
    console.log("itemitem", item)
    setPolicyDataObj(item?.id)
    setEditPolicyName(item?.name)
    setEditPolicyDesc(item?.description)
    setEditPolicyPop(true)
  }


  const setObj = {
    name: editPolicyName,
    desc: editPolicyDesc,
  }

  // Call to delete Allowance
  const EditAPIFun = policyId => {
    setBtnProgress(true);
    axios({
      url: editPolicyAPI(policyId),
      method: "PATCH",
      headers: headers,
      data: setObj,
    })
      .then(res => {
        setBtnProgress(false);
        console.log("res", res)
        setEditPolicyName("")
        setEditPolicyDesc("")
        GetPolicyFun()
        setEditPolicyPop(false)
      })
      .catch(err => {
        setBtnProgress(false);
        console.log("Error", err)
      })
  }



  // Add allowance container
  const AddContainer = () => {
    setContainer([
      ...container,
      {
        id: Math.random(),
        name: "",
        type: "",
        days: "",
        maxLimit: "",
        limitToggle: true,
        description: ""
      }]
    )
  };

  // Remove allowance container
  const RemoveContainer = index => {
    setContainer(container.filter((item) => item.id !== index.id));
  };

  // Edit allowance array
  const editContainerFun = (index, type, value) => {
    const tempArr = [...container];
    tempArr[index][type] = value;
    setContainer(tempArr);
  }

  // Set start date Function
  const setStartMonth = (value, label) => {
    setStartMonthObj({
      label: label,
      value: value
    })
  }

  // Set end date Function
  const setEndMonth = (value, label) => {
    setEndMonthObj({
      label: label,
      value: value
    })
  };

  return (
    <Fragment>
      {" "}
      {!openAllowance ? (
        <AllowanceContainer>
          <div id="admin_homes">
            <div id="admin" className="admin">
              {policyData?.length !== 0 ? (
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
                              onClick={() => EditAPIDataFun(item)}
                            />
                            <DeleteOutlined
                              style={{
                                color: `red`,
                                marginLeft: `15px`,
                                fontSize: `23px`,
                              }}
                              onClick={() => {
                                setDeletePolicyID(item?.id)
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <EmptyRoster text="No Policy Added!" />
              )}
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
      {/* Create policy modal */}
      <Modal
        title="Create a policy"
        visible={policyPop}
        onCancel={() => {
          setPolicyPop(false)
        }}
        cancelButtonProps={{
          style: { border: "1px solid #3751FF", color: "#3751FF" },
        }}
      >
        <CreateAllowancePop
          container={container}
          AddContainer={AddContainer}
          RemoveContainer={RemoveContainer}
          editContainerFun={editContainerFun}
          setNewPolicyName={setNewPolicyName}
          setStartMonth={setStartMonth}
          setStartMonthOpen={setStartMonthOpen}
          startMonthObj={startMonthObj}
          setEndMonth={setEndMonth}
          endMonthObj={endMonthObj}
        />
      </Modal>
      {/* Edit policy modal */}
      <Modal
        title="Edit a policy"
        visible={editPolicyPop}
        onOk={() => {
          EditAPIFun(policyDataObj)
        }}
        onCancel={() => {
          setEditPolicyPop(false)
        }}
        okText={btnProgress ? "Processing.." : "Update"}
      >
        <EditPolicy
          editPolicyName={editPolicyName}
          setEditPolicyName={setEditPolicyName}
          editPolicyDesc={editPolicyDesc}
          setEditPolicyDesc={setEditPolicyDesc}
        />
      </Modal>


      {/* Delete policy modal */}
      <Modal
        title="Confirmation"
        centered
        visible={deletePolicyID}
        onOk={() => {
          DeleteAPIFun(deletePolicyID)
        }}
        onCancel={() => {
          setDeletePolicyID("")
        }}
        width={1000}
        okText={btnProgress ? "Processing.." : "Delete"}
        cancelText="Cancel"
      >
        <>
          <p
            style={{
              fontSize: `22px`,
              color: `#333333`,
              fontWeight: `600`,
              margin: `30px 0`,
            }}
          >
            Do you want to delete Policy ?
          </p>
        </>
      </Modal>
    </Fragment>
  )
}
export default Allowance
