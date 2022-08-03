import React, { useEffect, useState, useRef } from 'react';
import login_logo from '../data/assets/login_logo.svg';
import overview from '../data/assets/overview.svg';
import overview2 from '../data/assets/overview_hover.svg';
import admin from '../data/assets/admin.svg';
import admin2 from '../data/assets/admin_hover.svg';
import Calendar from '../data/assets/Calendar.svg';
import Calendar2 from '../data/assets/Calendar_hover.svg';
import settings from '../data/assets/settings.svg';
import settings2 from '../data/assets/settings_hover.svg';
import logout from '../data/assets/logout.svg';
import logout_hover from '../data/assets/logout_hover.svg';
import search from '../data/assets/search.svg';
import notificaton from '../data/assets/notificaton.svg';
import { BoardContainer } from '../components/Board/styles';
import { DeleteOutlined, SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import { Empty, Popover, Drawer, Badge, message, Result } from 'antd';
import SideModal from '../components/leavePopup/index'
import Notification from "../components/leavePopup/notification";
import share from '../data/assets/share.svg';
import emptyFile from '../data/assets/empty-file.gif';
import axios from 'axios';
import { getHeaders } from "../utils/urls"
import { navigate } from "gatsby"
import Loader from "../components/loader";
import NotificationSound from "../utils/notification.mp3"

const Board = () => {

    const [popup, setPopup] = useState(false);
    const [sideToggle, setSideToggle] = useState(1);
    const [userLeaveData, setUserLeaveData] = useState([]);
    const [activeLoader, setActiveLoader] = useState(false);
    const [adminToggle, setAdminToggle] = useState('pending');

    let userData = typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('userData'))

    let userDataMain = userData?.user;

    const headers = getHeaders(userData?.tokens?.accessToken);

    const getLeaves = () => {
        setActiveLoader(true);
        axios({
            method: 'GET',
            url: `https://fidisyslt.herokuapp.com/api/v2/leaves`,
            headers: headers
        }).then((res) => {
            setActiveLoader(false);
            setUserLeaveData(res?.data);
        }).catch((_err) => {
            setActiveLoader(false);
            console.log('Error', _err);
        })
    }

    useEffect(() => {
        if (userData) {
            getLeaves();
        } else {
            logOut();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const nameProf = (name) => {
        let text = name;
        const myArray = text?.split(" ");
        return (myArray && (myArray[0] ? myArray[0][0] : '') + ' ' + (myArray[1] ? myArray[1][0] : ''))
    }


    const logOut = () => {
        typeof localStorage !== `undefined` && localStorage.removeItem('userData');
        navigate(`/`);
        message.success('Logout Successfully');
    }


    const approveLeave = (type, leaveId) => {
        setActiveLoader(true);
        axios({
            method: 'PUT',
            url: `https://fidisyslt.herokuapp.com/api/v2/leaves/${type}/${leaveId}`,
            headers: headers
        }).then((res) => {
            getLeaves();
            message.success(res?.data?.message);
            playAudio();
        }).catch((_err) => {
            setActiveLoader(false);
            console.log('Error', _err);
        })
    }

    const audioPlayer = useRef(null);

    function playAudio() {
        audioPlayer.current.play();
    }


    const leaveMap = userLeaveData?.leaves?.filter((item) => item.status === adminToggle)
    console.log('leaveMap', leaveMap)
    return (
        <BoardContainer>
            {activeLoader && <Loader />}
            <audio ref={audioPlayer} src={NotificationSound}>
                <track src="captions_es.vtt" kind="captions" srclang="es" label="spanish_captions" />
            </audio>
            <div id="BoardContainer" >
                <div id="side_menu">
                    <h1><img src={login_logo} alt="img" />Leave Tracker</h1>
                    <ul>
                        <li className={sideToggle === 1 ? "active" : ""} role="presentation" onClick={() => setSideToggle(1)}><img src={sideToggle === 1 ? overview2 : overview} alt="img" />Home</li>
                        <li className={sideToggle === 2 ? "active" : ""} role="presentation" onClick={() => setSideToggle(2)}><img src={sideToggle === 2 ? Calendar2 : Calendar} alt="img" />Calendar</li>
                        <li className={sideToggle === 3 ? "active" : ""} role="presentation" onClick={() => setSideToggle(3)}><img src={sideToggle === 3 ? admin2 : admin} alt="img" />Admin Portal</li>
                    </ul>
                    <ul>
                        <li className={sideToggle === 4 ? "active" : ""} role="presentation" onClick={() => setSideToggle(4)}><img src={sideToggle === 4 ? settings2 : settings} alt="img" />Settings</li>
                    </ul>


                    <ul id="logout">
                        <li onClick={logOut} role="presentation"> <img src={logout_hover} alt="img" className="imghover" /><img src={logout} alt="img" className="image" />logout</li>
                    </ul>
                </div>
                <div id="main_menu" style={{ background: sideToggle === 1 ? 'white' : '#FCFAFA' }}>
                    <div id="header">
                        <h2 id="title">{sideToggle === 1 ? "Home" : sideToggle === 2 ? "Calendar" : sideToggle === 3 ? "Admin Portal" : sideToggle === 4 ? "Settings" : ""}</h2>
                        <div id="mini_block">
                            {sideToggle === 1 ? <button onClick={() => setPopup(true)}>Apply Leave</button> : ""}
                            <img src={search} alt="img" id="search" />
                            <Popover placement="bottomRight" content={<Notification />} style={{ position: 'relative' }}>
                                <Badge count={userLeaveData?.leaves?.length}>
                                    <img src={notificaton} alt="img" id="notificaton" />
                                </Badge>
                            </Popover>

                            <div id="mini_block_name">
                                <p id="profile-icon">{userDataMain && nameProf(userDataMain?.name).toUpperCase()}</p>
                                <p id="name_main">{userDataMain?.name}<span>{userDataMain?.role}</span></p>
                                {/* <img src={userDataMain?.photoURL} alt="img" id="profile" /> */}
                            </div>
                        </div>
                    </div>

                    {sideToggle === 1 ?
                        <>
                            <div id="score">
                                <div id="score_card">
                                    <h2 id="score">02</h2>
                                    <p>Available Leaves</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">02</h2>
                                    <p>Previous unused Leaves</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">0{userLeaveData?.leaves?.length}</h2>
                                    <p>Pending Leaves Requests</p>
                                </div>
                                <div id="score_card">
                                    <h2 id="score">01</h2>
                                    <p>Rejected Leaves</p>
                                </div>
                            </div>

                            <div id="message">
                                {userLeaveData?.leaves?.length > 0 ?
                                    <>
                                        <div id="message_block1">
                                            <h3>SNo</h3>
                                            <h3>Type</h3>
                                            <h3>From</h3>
                                            <h3>To</h3>
                                            <h3>Reason</h3>
                                            <h3>Status</h3>
                                            <h3>Action</h3>
                                        </div>
                                        <div id="message_block2">
                                            {userLeaveData?.leaves?.map((item, i) =>
                                                <div id="task_container" key={i}>
                                                    <p>{i + 1}</p>
                                                    <p style={{ padding: `0` }}>{item?.type === "gen" ? 'Paid' : 'Cassual'}</p>
                                                    <p>{item?.startDate}</p>
                                                    <p>{item?.endDate}</p>
                                                    <p>{item?.reason}</p>
                                                    <p style={{
                                                        color: item?.status === 'pending' ? '#CB5A08' :
                                                            item?.status === 'approved' ? '#00D241'
                                                                :
                                                                item?.status === 'rejected' ? '#FF0000' :
                                                                    '', fontWeight: '600'
                                                    }}>
                                                        {item?.status === 'pending' ? 'Pending' :
                                                            item?.status === 'approved' ? 'Approved'
                                                                :
                                                                item?.status === 'rejected' ? 'Rejected' :
                                                                    ''}
                                                    </p>
                                                    <p><DeleteOutlined className='delete_icon' /></p>
                                                </div>
                                            )}

                                        </div>
                                    </>
                                    :
                                    <div id="message_blocks">
                                        <Empty
                                            image={emptyFile}
                                            imageStyle={{
                                                height: 200,
                                            }}
                                            description={
                                                <span style={{ fontSize: `20px`, fontWeight: `bold`, color: `#6BA1DF` }}>
                                                    No Leaves Applied
                                                </span>
                                            }
                                        />
                                    </div>
                                }
                            </div>
                        </>
                        :
                        ""
                    }


                    {sideToggle === 2 &&
                        <Result
                            icon={<CalendarOutlined />}
                            title="Hello, Calender comming soon!"
                        />

                    }

                    {sideToggle === 3 &&
                        <div id="admin">
                            <div id="admin_block1">
                                <h1>Leave Requests</h1>
                                <p id="share"><img src={share} alt="share" />Share</p>
                            </div>
                            <div id="admin_tab">
                                <h2 role='presentation' onClick={() => setAdminToggle('pending')} className={adminToggle === 'pending' && "active"}>Pending</h2>
                                <h2 role='presentation' onClick={() => setAdminToggle('approved')} className={adminToggle === 'approved' && "active"}>Approved</h2>
                                <h2 role='presentation' onClick={() => setAdminToggle('rejected')} className={adminToggle === 'rejected' && "active"}>Rejected</h2>
                            </div>
                            {leaveMap?.length !== 0 ?
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
                                        {userLeaveData?.leaves?.map((item, i) =>
                                            <div>
                                                {item.status === adminToggle &&
                                                    <div id="task_container">
                                                        <p>1</p>
                                                        <div id="profile_box">
                                                            <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" />
                                                            <div id="profile_text">
                                                                <h2>Vignesh</h2>
                                                                <p>{item?.userId[0] + item?.userId[1] + item?.userId[2] + item?.userId[3] + item?.userId[4]}</p>
                                                            </div>
                                                        </div>
                                                        <p>{item?.startDate} to {item?.endDate}</p>
                                                        <p>{item?.type === 'cos' ? 'CL' : 'PL'}</p>
                                                        <p>{item?.reason}</p>
                                                        <div id="btns">
                                                            {item.status === 'approved' ? <p style={{
                                                                color: `#00D241`, fontSize: `1.2vw`, fontWeight: `700`
                                                            }}>Approved</p> : item.status === 'rejected' ?
                                                                <p style={{
                                                                    color: `#FF0000`, fontSize: `1.2vw`, fontWeight: `700`
                                                                }}>Rejected</p> :
                                                                <>
                                                                    <button onClick={() => approveLeave('approve', item?.id)}>Approve</button>
                                                                    <button onClick={() => approveLeave('reject', item?.id)}>Reject</button>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                :
                                <Empty
                                    image={emptyFile}
                                    imageStyle={{
                                        height: 250,
                                        width: 200,
                                        margin: '7vw auto auto auto',
                                    }}
                                    description={
                                        <span style={{ fontSize: `20px`, fontWeight: `bold`, color: `#6BA1DF` }}>
                                            No {adminToggle} leaves!
                                        </span>
                                    }
                                />
                            }
                        </div>
                    }


                    {sideToggle === 4 &&
                        <Result
                            icon={<SettingOutlined />}
                            title="Hello, Calender comming soon!"
                        />

                    }

                </div>

            </div>
            <Drawer
                visible={popup}
                onClose={() => setPopup(false)}
                width="fit-content"
            >
                <SideModal setPopup={setPopup} headers={headers} getLeaves={getLeaves} userDataMain={userDataMain} setActiveLoader={setActiveLoader} playAudio={playAudio} />
            </Drawer>
        </BoardContainer >
    )
}
export default Board;