import React, { useState, useEffect, Fragment, useRef } from "react"
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
  createPolicyAPI,
  getAllLeaveTypesAPI
} from "../../utils/urls"
import Edit_user from "../../data/assets/Edit_user.svg"
import { DeleteOutlined } from "@ant-design/icons"
import EditPolicy from "../Forms/EditPolicy"
import CompoLoader from "../ComponentLoader";
import AudioComponent from "../Audio";

const Allowance = ({ policyPop, playAudio, setPolicyPop, CreateLeaveTypeFun, setCreateLeavePop }) => {

  // Fetch user data from local storage
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA

  // notification conformation sound function
  const audioPlayer = useRef(null);
  const [btnProgress, setBtnProgress] = useState(false);
  const [openAllowance, setOpenAllowance] = useState(false)
  const [activeLoader, setActiveLoader] = useState(false)

  const [policyData, setPolicyData] = useState([])
  const [policyDataObj, setPolicyDataObj] = useState()
  const [policyName, setPolicyName] = useState()


  // set search dropdown value open
  const [dropVal, setDropVal] = useState('');

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


  const disableFun = () => {
    return !(newPolicyName
      && container?.find((item) => item.name.includes("")).name
      && container?.find((item) => item.type.includes("")).type
      && container?.find((item) => item.days.includes("")).days
      && container?.find((item) => item.maxLimit.includes("")).maxLimit
      && container?.find((item) => item.description.includes("")).description)
  }

  // Create policy setState
  const [newPolicyName, setNewPolicyName] = useState("");
  const [startMonthOpen, setStartMonthOpen] = useState(false);
  const [endMonthOpen, setEndMonthOpen] = useState(false);
  const [startMonthObj, setStartMonthObj] = useState({
    label: "",
    value: ""
  });
  const [endMonthObj, setEndMonthObj] = useState({
    label: "",
    value: ""
  });

  // Get leave types data
  const [leaveTypes, setLeaveTypes] = useState([]);

  // Adding global headers
  const headers = getHeaders(userData?.tokens?.accessToken)

  // Initial call for get policy details
  useEffect(() => {
    GetPolicyFun();
    getAllLeaveTypes();
  }, [])

  // Get policy details Function
  const GetPolicyFun = () => {
    setActiveLoader(true);
    axios({
      url: getPolicyDataAPI(),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res?.data) {
          setPolicyData(res?.data);
          setActiveLoader(false);
        }
      })
      .catch(err => {
        setActiveLoader(false);
        console.log("Error", err);
      })
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
        playAudio();
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
        playAudio();
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
    setContainer(container?.filter((item) => item.id !== index.id));
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

  // Create Allowance Function
  const createPolicyAPIFun = () => {
    const policyData = {
      "startMonth": startMonthObj?.label,
      "endMonth": endMonthObj?.label,
      "name": newPolicyName,
      "description": "New Policy",
      "allowances": newAllowanceSet(container),
    }

    axios(
      {
        url: createPolicyAPI(),
        method: "POST",
        headers: headers,
        data: policyData
      }).then((res) => {
        playAudio();
        setDropVal("");
        getAllLeaveTypes();
        cleanPolicyPopValues();
        console.log("res", res);
      }).catch((err) => {
        console.log("Error", err)
      })
  }

  // Get Leave types
  const getAllLeaveTypes = () => {
    axios({
      url: getAllLeaveTypesAPI(),
      method: "GET",
      headers: headers
    }).then((res) => {
      console.log("res", res)
      setLeaveTypes(res?.data)
    }).catch((err) => {
      console.log("Error", err)
    })
  }


  const newAllowanceSet = (container) => {
    let tempArr = []
    if (container?.length) {
      container.map((item) => {
        tempArr.push({
          "amount": item?.days,
          "maxLimit": item?.limitToggle,
          "maxLimitAmount": item?.maxLimit,
          "name": item?.name,
          "type": item?.type,
          "description": item?.description
        })
      })
    }
    return tempArr;
  }


  // clean policy popup values
  const cleanPolicyPopValues = () => {
    setNewPolicyName("");
    setStartMonthOpen(false);
    setEndMonthOpen(false);
    setStartMonthObj({
      label: "",
      value: ""
    });
    setEndMonthObj({
      label: "",
      value: ""
    });
    setContainer(
      [{
        id: Math.random(),
        name: "",
        type: "",
        days: "",
        maxLimit: "",
        limitToggle: true,
        description: ""
      }]
    );
  }
  return (
    <Fragment>
      <AudioComponent
        audioPlayer={audioPlayer}
      />
      {" "}
      {!openAllowance ? (
        <AllowanceContainer>
          <div id="admin_homes">
            {activeLoader ? <CompoLoader /> :
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
            }
          </div>
        </AllowanceContainer>
      ) : (
        <AllowanceTableView
          policyDataObj={policyDataObj}
          policyName={policyName}
          setOpenAllowance={setOpenAllowance}
          callFrom=""
          setCreateLeavePop={setCreateLeavePop}
          playAudio={playAudio}
        />
      )}

      {/* Create policy modal */}
      <Modal
        title="Create a policy"
        visible={policyPop}
        onOk={() => {
          createPolicyAPIFun()
        }}
        onCancel={() => {
          setPolicyPop(false);
          cleanPolicyPopValues();
        }}
        cancelButtonProps={{
          style: { border: "1px solid #3751FF", color: "#3751FF" },
        }}
        okButtonProps={{
          disabled: disableFun()
        }}
      >
        <CreateAllowancePop
          container={container}
          AddContainer={AddContainer}
          RemoveContainer={RemoveContainer}
          editContainerFun={editContainerFun}
          setNewPolicyName={setNewPolicyName}
          setStartMonth={setStartMonth}
          startMonthOpen={startMonthOpen}
          setStartMonthOpen={setStartMonthOpen}
          endMonthOpen={endMonthOpen}
          setEndMonthOpen={setEndMonthOpen}
          startMonthObj={startMonthObj}
          setEndMonth={setEndMonth}
          endMonthObj={endMonthObj}
          setCreateLeavePop={setCreateLeavePop}
          CreateLeaveTypeFun={CreateLeaveTypeFun}
          dropVal={dropVal}
          setDropVal={setDropVal}
          leaveTypes={leaveTypes}
        />
      </Modal>

      {/* Edit policy modal */}
      <Modal
        title="Create a policy"
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
