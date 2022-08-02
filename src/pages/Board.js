import React, { useEffect, useState } from 'react';
import login_logo from '../data/assets/login_logo.svg';
import overview from '../data/assets/overview.svg';
import overview2 from '../data/assets/overview_hover.svg';
import Calendar from '../data/assets/Calendar.svg';
import Calendar2 from '../data/assets/Calendar_hover.svg';
import settings from '../data/assets/settings.svg';
import settings2 from '../data/assets/settings_hover.svg';
import search from '../data/assets/search.svg';
import notificaton from '../data/assets/notificaton.svg';
import { BoardContainer } from '../components/Board/styles';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal, Popover, Drawer } from 'antd';
import SideModal from '../components/leavePopup/index'
import Notification from "../components/leavePopup/notification";
import share from '../data/assets/share.svg';
import axios from 'axios';
import { getHeaders } from "../utils/urls"

const Board = () => {

    const [popup, setPopup] = useState(false);
    const [sideToggle, setSideToggle] = useState(1);
    const [userLeaveData, setUserLeaveData] = useState([]);

    let userData = typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('userData'))

    let userDataMain = userData?.user;

    const headers = getHeaders(userData?.tokens?.accessToken);

    // Admin Login
    const adminLogin = (email) => {
        axios({
            method: 'POST',
            url: `https://fidisyslt.herokuapp.com/api/v2/auth/login`,
            data: {
                email: email,
            },
            headers: headers
        })
            .then((res) => {
                typeof localStorage !== `undefined` && localStorage.setItem('userData', JSON.stringify(res.data));
            })
            .catch(error => { console.log(error) })
    }

    const getLeaves = () => {
        axios({
            method: 'GET',
            url: `https://fidisyslt.herokuapp.com/api/v2/leaves`,
            headers: headers
        }).then((res) => {
            setUserLeaveData(res?.data);
        }).catch((_err) => {
            console.log('Error', _err);
        })
    }

    useEffect(() => {
        getLeaves();
        adminLogin(userDataMain?.user?.email);
    }, []);


    const nameProf = (name) => {
        let text = name;
        const myArray = text?.split(" ");
        console.log('myArray', myArray)
        return myArray[0][0] + ' ' + myArray[1][0]
    }
    return (
        <BoardContainer>
            <div id="BoardContainer" >
                <div id="side_menu">
                    <h1><img src={login_logo} alt="img" />Leave Tracker</h1>
                    <ul>
                        <li className={sideToggle === 1 ? "active" : ""} role="presentation" onClick={() => setSideToggle(1)}><img src={sideToggle === 1 ? overview2 : overview} alt="img" />Home</li>
                        <li className={sideToggle === 3 ? "active" : ""} role="presentation" onClick={() => setSideToggle(3)}><img src={sideToggle === 3 ? Calendar2 : Calendar} alt="img" />Calendar</li>
                    </ul>
                    <ul>
                        <li className={sideToggle === 2 ? "active" : ""} role="presentation" onClick={() => setSideToggle(2)}><img src={sideToggle === 2 ? settings2 : settings} alt="img" />Settings</li>
                    </ul>
                </div>
                <div id="main_menu" style={{ background: sideToggle === 1 ? 'white' : '#FCFAFA' }}>
                    <div id="header">
                        <h2 id="title">{sideToggle === 1 ? "Home" : sideToggle === 2 ? "Settings" : sideToggle === 3 ? "Calendar" : ""}</h2>
                        <div id="mini_block">
                            {sideToggle === 1 ? <button onClick={() => setPopup(true)}>Apply Leave</button> : ""}
                            <img src={search} alt="img" id="search" />
                            <Popover placement="bottomRight" content={<Notification />} style={{ position: 'relative' }}>
                                <img src={notificaton} alt="img" id="notificaton" />
                            </Popover>

                            <div id="mini_block_name">
                                <p id="profile-icon">{nameProf(userDataMain?.name)}</p>
                                <p>{userDataMain?.name}</p>
                                {/* <img src={userDataMain?.photoURL} alt="img" id="profile" /> */}
                            </div>
                        </div>
                    </div>

                    {sideToggle === 1 ?
                        <>
                            <div id="score">
                                <div id="score_card">
                                    <h2 id="score">00</h2>
                                    <p>Available Leaves</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">08</h2>
                                    <p>Previous unused Leaves</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">0{userDataMain?.leaverequestcount?.pending}</h2>
                                    <p>Pending Leaves Requests</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">0{userDataMain?.leaverequestcount?.rejected}</h2>
                                    <p>Rejected Leaves</p>
                                </div>
                            </div>

                            <div id="message">
                                <div id="message_block1">
                                    <h3>SNo</h3>
                                    <h3>Type</h3>
                                    <h3>From</h3>
                                    <h3>To</h3>
                                    <h3>Reason</h3>
                                    <h3>Status</h3>
                                    <h3>Action</h3>
                                </div>
                                {userLeaveData?.length !== 0 ?
                                    <div id="message_block2">
                                        {userLeaveData?.leaves?.map((item, i) =>
                                            <div id="task_container" key={i}>
                                                <p>{i + 1}</p>
                                                <p>{item?.type === "gen" ? 'Paid Leave' : 'Cassual Leave'}</p>
                                                <p>{item?.startDate}</p>
                                                <p>{item?.endDate}</p>
                                                <p>{item?.reason}</p>
                                                <p style={{ color: '#CB5A08', fontWeight: '600' }}>{item?.status}</p>
                                                <p><DeleteOutlined className='delete_icon' /></p>
                                            </div>
                                        )}

                                    </div>
                                    :
                                    <div id="message_blocks">
                                        <p>No Leaves Applied</p>
                                    </div>
                                }
                            </div>
                        </>
                        :
                        ""
                    }


                    {sideToggle === 2 ?
                        <div id="admin">
                            <div id="admin_block1">
                                <h1>Leave Requests</h1>
                                <p id="share"><img src={share} alt="share" />Share</p>
                            </div>
                            <div id="admin_tab">
                                <h2>All</h2>
                                <h2>Approve</h2>
                                <h2>Pending</h2>
                            </div>
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
                                    <div id="task_container">
                                        <p>1</p>
                                        <div id="profile_box">
                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                            <div id="profile_text">
                                                <h2>Vignesh</h2>
                                                <p>FCHN017</p>
                                            </div>
                                        </div>
                                        <p>25 Feb to 26 Feb, 2022</p>
                                        <p>CL</p>
                                        <p>Friend’s wedding celebration</p>
                                        <div id="btns">
                                            <button>Approve</button>
                                            <button>Reject</button>
                                        </div>
                                    </div>
                                    <div id="task_container">
                                        <p>1</p>
                                        <div id="profile_box">
                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                            <div id="profile_text">
                                                <h2>Vignesh</h2>
                                                <p>FCHN017</p>
                                            </div>
                                        </div>
                                        <p>25 Feb to 26 Feb, 2022</p>
                                        <p>CL</p>
                                        <p>Friend’s wedding celebration</p>
                                        <div id="btns">
                                            <button>Approve</button>
                                            <button>Reject</button>
                                        </div>
                                    </div>
                                    <div id="task_container">
                                        <p>1</p>
                                        <div id="profile_box">
                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                            <div id="profile_text">
                                                <h2>Vignesh</h2>
                                                <p>FCHN017</p>
                                            </div>
                                        </div>
                                        <p>25 Feb to 26 Feb, 2022</p>
                                        <p>CL</p>
                                        <p>Friend’s wedding celebration</p>
                                        <div id="btns">
                                            <button>Approve</button>
                                            <button>Reject</button>
                                        </div>
                                    </div>
                                    <div id="task_container">
                                        <p>1</p>
                                        <div id="profile_box">
                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                            <div id="profile_text">
                                                <h2>Vignesh</h2>
                                                <p>FCHN017</p>
                                            </div>
                                        </div>
                                        <p>25 Feb to 26 Feb, 2022</p>
                                        <p>CL</p>
                                        <p>Friend’s wedding celebration</p>
                                        <div id="btns">
                                            <button>Approve</button>
                                            <button>Reject</button>
                                        </div>
                                    </div>
                                    <div id="task_container">
                                        <p>1</p>
                                        <div id="profile_box">
                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                            <div id="profile_text">
                                                <h2>Vignesh</h2>
                                                <p>FCHN017</p>
                                            </div>
                                        </div>
                                        <p>25 Feb to 26 Feb, 2022</p>
                                        <p>CL</p>
                                        <p>Friend’s wedding celebration</p>
                                        <div id="btns">
                                            <button>Approve</button>
                                            <button>Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ""}


                </div>

            </div>
            <Drawer
                visible={popup}
                onClose={() => setPopup(false)}
                width="600"
            >
                <SideModal setPopup={setPopup} headers={headers} getLeaves={getLeaves} userDataMain={userDataMain} adminLogin={adminLogin} />
            </Drawer>
        </BoardContainer>
    )
}
export default Board;