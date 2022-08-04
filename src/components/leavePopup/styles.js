import styled from "styled-components"

export const PopupContainer = styled.div`
#popup {
    width: fit-content;
    height: fit-content;
    background: white;
    padding: 30px 0;
    margin: 0;
}

#popup h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #252733;
    margin: 0 0 48px 32px;
}

#popup #name_block {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 88px;
    background: #FFFFFF;
    border: 1px solid #F9F9F9;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    margin: 8px 0 0 0;
    overflow: hidden;
    padding: 0 32px;
}
#popup #name_block p .ant-picker {
    cursor: pointer;
    width: 246px !important;
    outline: none !important;
    border: none !important;
    border-color: transparent !important;
    box-shadow: none !important;
}

#popup #name_block p .ant-picker {
    cursor: pointer;
    width: 246px !important;
    outline: none !important;
    border: none !important;
    border-color: transparent !important;
    box-shadow: none !important;
}
#popup #name_block:nth-child(5) {
    height: 173px;
    padding: 31px 32px 0 31px;
}
#popup #name_block #span {
    height: 28px;
    margin: 0 20px;
    border-left: 1px dashed #252733
}

#popup #name_block:nth-child(5) {
    align-items: baseline;
    padding: 31px 32px;
}

#popup #name_block img {
    width: 24px;
    height: 24px;
    margin: 0 21px 0 0;
}

#popup #name_block #input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
}

#popup #name_block #textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
}

#popup #buttons {
    width: fit-content;
    margin: 3vw auto auto auto;
}

#popup #buttons button {
    width: 217px;
    height: 48px;
    border: none;
    outline: none;
    border-radius: 8px;
    background: none;
    cursor: pointer;
}

#popup #buttons button:nth-child(1) {
color: #3751FF;
    border: 1.9px solid #3751FF;
}

#popup #buttons button:nth-child(2) {
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    margin: 0 0 0 26px;
}

#popup .ant-popover {
    position: relative !important;
    width: fit-content !important;
}

#popup #name_block p #dateSpan #toSpan {
    margin: 0 10px; 
    fontSize: 20px;
}
`

export const NoteContainer = styled.div`
#NoteContainer {
    background: white;
    position: absolute;
    width: 357px;
    height: 460px;
    right: -12px;
    top: 10px;
    border: 1px solid rgba(22, 31, 71, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

#NoteContainer #head {
    display: flex;
    padding: 24px;
    justify-content: space-between;
}

#NoteContainer #head h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #252733;
}

#NoteContainer #head p {
    font-weight: 500;
    font-size: 14px;
    text-decoration-line: underline;
    color: #252733;
    cursor: pointer;
}

#NoteContainer #messages_contaier #message {
    border: 1px solid #161f473d;
    padding: 9px 19px 9px 0;
}

#NoteContainer #messages_contaier #message #mini_container {
    display: flex;
    position: relative;
}

#NoteContainer #messages_contaier #message #mini_container #profile {
    width: 34px;
    height: 34px;
    margin: 0 12px;
    border-radius: 30px;
}

#NoteContainer #messages_contaier #message #mini_container #span {
    width: 4px;
    height: 100%;
    position: absolute;
    border-radius: 0 4px 4px 0;
}

#NoteContainer #messages_contaier #message #mini_container #text #text_title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #212121;
}

#NoteContainer #messages_contaier #message #mini_container #text #text_title span {
    font-weight: 700;
}

#NoteContainer #messages_contaier #message #mini_container #text #mini_text {
    display: flex;
    margin: 16px 0 0 0;
    justify-content: space-between;
}

#NoteContainer #messages_contaier #message #mini_container #text #mini_text p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ADADAD;
}

#NoteContainer #messages_contaier #message #mini_container #text #mini_text p:nth-child(2) {
    font-weight: 500;
    color: #CB077C;
    cursor: pointer;
}
`

export const LeaveContainer = styled.div`
position: absolute;
width: 120px;
background: white;
top: 10px;
left: -20px;
padding: 9px 0;
border-radius: 10px;
box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
p {
padding: 0 0 0 8px;
transition: 0.5s ease-in-out;
cursor: pointer;
}
p :hover{
background: aliceblue;
}

`

export const LeaveContainers = styled.div`
position: absolute;
width: 95%;
background: #ffff;
left:10px;
padding: 9px 0;
border-radius: 10px;
box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
p {
padding: 5px 0 5px 15px;
transition: 0.5s ease-in-out;
cursor: pointer;
}
p :hover{
background: aliceblue;
}
`

export const ConformContainer = styled.div`
.ant-modal-header {
    border-bottom: none !important;
}
` 