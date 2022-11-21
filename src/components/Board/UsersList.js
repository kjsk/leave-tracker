import React from "react"
import EmptyRoster from "../EmptyRoster"

const UsersList = ({
  nameProf,
  Avatar,
  usersData,
  Edit_user,
  editUserFun,
  DeleteOutlined,
  setdeleteUserState,
  setVisible,
  activeLoader,
  CompoLoader,
}) => {
  return (
    <div id="admin_home">
      {activeLoader ? (
        <CompoLoader />
      ) : (
        <div id="admin" className="admin">
          {usersData?.length !== 0 ? (
            <div id="message">
              <div id="message_block1">
                <h3>SNo</h3>
                <h3>Emp. Name & ID</h3>
                <h3>Designation</h3>
                <h3>No.of Leave Used</h3>
                <h3>No.of Leave Left</h3>
                <h3>Action</h3>
              </div>
              <div id="message_block2">
                {usersData?.map((item, i) => {
                  return (
                    <div id="task_container">
                      <p>{i + 1}</p>
                      <div id="profile_box">
                        <Avatar name={item?.name} nameProf={nameProf} />
                        {/* <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" /> */}
                        <div id="profile_text">
                          <h2 style={{ fontSize: `0.9vw` }}>{item?.name}</h2>
                          <p style={{ fontSize: `0.9vw` }}>FJl7h1</p>
                        </div>
                      </div>
                      <p>{item?.jobRole ? item?.jobRole : "Employee"}</p>
                      <p>
                        {/* {item.allowance?.cos?.used + item.allowance?.gen?.used} */}
                        0
                      </p>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          width: "16vw",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {/* {item.allowance?.cos?.remaining +
                          item.allowance?.gen?.remaining} */}0
                      </p>
                      <div id="btns">
                        <img
                          src={Edit_user}
                          alt="Edit_user"
                          onClick={() => editUserFun(item)}
                          role="presentation"
                        />
                        <DeleteOutlined
                          style={{
                            color: `red`,
                            marginLeft: `15px`,
                            fontSize: `23px`,
                          }}
                          onClick={() => {
                            setdeleteUserState({ id: item.id, name: item.name })
                            setVisible(true)
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <EmptyRoster text="No Users!" />
          )}
        </div>
      )}
    </div>
  )
}
export default UsersList
