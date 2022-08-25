import React, { useState, useEffect } from "react"
import EmptyRoster from '../EmptyRoster';
import Moment from 'moment';

const AdminPortal = ({
    share,
    adminToggle,
    setAdminToggle,
    leaveMap,
    userRealData,
    Avatar,
    nameProf,
    openLeaveDetailsFun,
    userDataMain,
    desecision,
    setActiveLoader,
    getLeaves
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setActiveLoader(true);
        setTimeout(() => {
            setLoading(true);
            setActiveLoader(false);
        }, 1500)
        // eslint-disable-next-line
    }, [])
    return (
        <div id="admin">
            <div id="admin_block1">
                <h1>Leave Requests</h1>
                {/* <p id="share"><img src={share} alt="share" />Share</p> */}
            </div>
            <div id="admin_tab">
                <h2 role='presentation' onClick={() => setAdminToggle('pending')} className={adminToggle === 'pending' && "active"}>Pending</h2>
                <h2 role='presentation' onClick={() => setAdminToggle('approved')} className={adminToggle === 'approved' && "active"}>Approved</h2>
                <h2 role='presentation' onClick={() => setAdminToggle('rejected')} className={adminToggle === 'rejected' && "active"}>Rejected</h2>
            </div>
            {leaveMap?.length !== 0 && loading ?
                <div id="message">
                    <div id="message_block1">
                        <h3>SNo</h3>
                        <h3>Name & ID</h3>
                        <h3>Date</h3>
                        <h3>Leave Type</h3>
                        <h3>Reason</h3>
                        <h3>Action</h3>
                    </div>
                    <div id="message_block2">
                        {userRealData?.map((item, i) => {
                            return (
                                item?.status === adminToggle &&
                                <div id="task_container">
                                    <p>{i + 1}</p>
                                    <div id="profile_box">
                                        <Avatar name={item?.username} nameProf={nameProf} />
                                        {/* <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" /> */}
                                        <div id="profile_text" onClick={() => openLeaveDetailsFun(item, 'pending')} role="presentation">
                                            <h2 style={{ fontSize: `0.9vw` }}>{item?.username}</h2>
                                            <p style={{ fontSize: `0.9vw` }}>{item?.userId[0] + item?.userId[1] + item?.userId[2] + item?.userId[3] + item?.userId[4]}</p>
                                        </div>
                                    </div>
                                    <p onClick={() => openLeaveDetailsFun(item, 'pending')} role="presentation">{Moment(item?.startDate, "MM-Do-YYYY").format("Do MMM")} to {Moment(item?.endDate, "MM-Do-YYYY").format("Do MMM, YYYY")}</p>
                                    <p onClick={() => openLeaveDetailsFun(item, 'pending')} role="presentation">{item?.type === 'cos' ? 'CL' : 'PL'}</p>
                                    <p style={{
                                        whiteSpace: 'nowrap',
                                        width: '16vw',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }} onClick={() => openLeaveDetailsFun(item, 'pending')} role="presentation">{item?.reason}</p>
                                    <div id="btns">
                                        {item.status === 'approved' ? <p style={{
                                            color: `#00D241`, fontSize: `1.2vw`, fontWeight: `700`
                                        }}>Approved</p> : item.status === 'rejected' ?
                                            <p style={{
                                                color: `#FF0000`, fontSize: `1.2vw`, fontWeight: `700`
                                            }}>Rejected</p> :
                                            <>
                                                {userDataMain?.role === 'admin' ?
                                                    <>
                                                        <button onClick={() => { desecision('approve', item?.id) }}>Approve</button>
                                                        <button onClick={() => { desecision('reject', item?.id) }}>Reject</button>
                                                    </>
                                                    :
                                                    <p style={{
                                                        color: `#CB5A08`, fontSize: `1.2vw`, fontWeight: `700`
                                                    }}>Pending</p>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                :
                <EmptyRoster text={`No ${adminToggle} leaves!🙅`} />
            }
        </div>
    )
}
export default AdminPortal;