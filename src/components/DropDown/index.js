import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { DropdownContainer } from "./styles";

const DropDownCompo = ({ arrayData, dropVal, setDropVal, index, setCreateLeavePop, setValFun, editvalue }) => {

    const [inputLength, setInputLength] = useState("");
    const [option, setOption] = useState(editvalue);
    const [open, setOpen] = useState(false);

    // set obj value fun
    const setOptionFun = (item) => {
        setOption(item?.label);
        setValFun(item?.value);
    }
    return (
        <DropdownContainer>
            <div className="dropdown_container">
                <div onClick={() => {
                    dropVal === index ? setDropVal() : setDropVal(index)
                    setOpen(true);
                }} role="presentation">
                    <input type="text" value={option} placeholder="search" disabled />
                </div>
                {dropVal === index && open &&
                    <div className="drop_options_container">
                        <input type="search" placeholder="search" onChange={(e) => setInputLength(e.target.value)} className="search_input" style={{ height: `2vw`, fontSize: `0.8vw`, marginBottom: `1vw` }} />
                        {arrayData?.find((item) => item?.label?.toLowerCase()?.includes(inputLength?.toLowerCase()))?.label ?
                            <ul>
                                {arrayData?.filter((item) => {
                                    if (item?.label?.toLowerCase()?.includes(inputLength?.toLowerCase())) {
                                        return item;
                                    } else {
                                        return ""
                                    }
                                }).map((item) =>
                                    <li onClick={() => { setDropVal(); setOptionFun(item) }} className="options_select" role="presentation">{item?.label}</li>
                                )}
                            </ul>
                            :
                            "No data Found...🙅"
                        }
                        <button className="add_leave_btn" onClick={() => setCreateLeavePop(true)}><PlusOutlined />Create Leave</button>
                    </div>
                }
            </div>
        </DropdownContainer>
    )
}

export default DropDownCompo;