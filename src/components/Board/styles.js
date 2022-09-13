import styled from "styled-components"

export const BoardContainer = styled.div`
  #refresh {
    width: fit-content;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.15vw;
    color: #4b506d;
    cursor: pointer;
    gap: 0.5vw;
    margin-left: auto;
    transition: 0.5s ease-in-out;
  }
  #refresh:hover {
    color: rgb(255, 0, 0);
  }
  .anticon-setting {
    animation-name: example;
    animation-duration: 4s;
    animation: example 10s infinite;
  }
  @keyframes example {
    1% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .ant-scroll-number-only-unit {
    color: white;
    font-size: 0.8vw;
  }
  #BoardContainer {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  #BoardContainer #side_menu {
    width: 19vw;
    height: 100%;
    background: #363740;
    padding: 3.33vw 0 0 0;
    position: relative;
    transition: 0.5s ease-in-out;
  }

  #BoardContainer #side_menu #drag_button {
    position: absolute;
    top: 3.5vw;
    right: -0.9vw;
    color: white;
    width: 1.9vw;
    height: 1.9vw;
    background: #363740;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5vw;
    cursor: pointer;
    z-index: 500;
    font-size: 1vw;
  }

  #BoardContainer #side_menu h1 {
    width: 16vw;
    font-size: 1.4vw;
    color: #a4a6b3;
    opacity: 0.7;
    display: flex;
    align-items: center;
    padding: 0 1.73913043478261vw;
  }

  #BoardContainer #side_menu h1 img {
    width: 2.2463768115942vw;
    height: 2.2463768115942vw;
    cursor: pointer;
    margin: 0 0.869565217391304vw 0 0;
  }

  #BoardContainer #side_menu ul {
    width: 100%;
    margin: 4.49275362318841vw 0 0 0;
  }

  #BoardContainer #side_menu ul:nth-child(3) {
    margin: 0;
    padding: 1vw 0 1vw 0;
    border-bottom: 0.072463768115942vw solid #dfe0eb38;
  }

  #BoardContainer #side_menu ul li {
    color: #a4a6b3;
    font-weight: 400;
    font-size: 1.15vw;
    cursor: pointer;
    height: 4.05797101449275vw;
    display: flex;
    align-items: center;
    padding: 0 2.02898550724638vw;
  }

  #BoardContainer #side_menu ul li:nth-child(5) {
    margin-bottom: 0.1vw;
    position: relative;
    span {
      position: absolute;
      right: 0.5vw;
      top: 0.8vw;
    }
  }

  #BoardContainer #side_menu ul li img {
    width: 1.15942028985507vw;
    height: 1.15942028985507vw;
    margin: 0 1.73913043478261vw 0 0;
  }

  #BoardContainer #side_menu ul li #img2 {
    display: none;
  }

  #BoardContainer #side_menu ul .active {
    color: #dde2ff;
    background: #9fa2b43d;
    transition: 0.5s ease-in-out;
    border-left: 0.217391304347826vw solid white;
  }

  #BoardContainer #side_menu ul li:hover #img1 {
    display: none;
  }

  #BoardContainer #side_menu ul li:hover #img2 {
    display: block;
  }

  #BoardContainer #side_menu #logout {
    margin-top: 5vw;
    transition: 0.5s ease-in-out;
    .imghover {
      display: none;
    }
  }

  #BoardContainer #side_menu #logout:hover li {
    color: white;
    .image {
      display: none;
    }
    .imghover {
      display: inherit;
    }
  }

  #BoardContainer #main_menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 2.17391304347826vw 2.39130434782609vw;
  }

  #BoardContainer #main_menu #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 2.17391304347826vw 0;
  }

  #BoardContainer #main_menu #header #title {
    font-size: 1.59420289855072vw;
    color: #252733;
  }

  #BoardContainer #main_menu #header #mini_block {
    display: flex;
    align-items: center;
  }

  #BoardContainer #main_menu #header #mini_block img {
    width: 1.15942028985507vw;
    height: 1.15942028985507vw;
    cursor: pointer;
  }

  #BoardContainer #main_menu #header #mini_block #notificaton {
    margin: 0 0 0 1.81159420289855vw;
  }

  #BoardContainer #main_menu #header #mini_block button {
    height: 3.47826086956522vw;
    font-size: 1.01449275362319vw;
    color: white;
    border: none;
    outline: none;
    background: #3751ff;
    cursor: pointer;
    box-shadow: 0px 0.289855072463768vw 0.869565217391304vw
      rgba(55, 81, 255, 0.24);
    border-radius: 0.579710144927536vw;
    margin: 0 3.47826086956522vw 0 0;
    padding: 0 1.5vw;
  }

  #BoardContainer #main_menu #header #mini_block #mini_block_name {
    display: flex;
    align-items: center;
    margin: 0 0 0 2.31884057971015vw;
    padding: 0 0 0 2.31884057971015vw;
    border-left: 0.072463768115942vw solid #dfe0eb;
  }

  #BoardContainer #main_menu #header #mini_block #mini_block_name #name_main {
    font-weight: 600;
    font-size: 1.01vw;
    color: #252733;
    display: flex;
    flex-direction: column;
    line-height: 0.9vw;
  }
  #BoardContainer #main_menu #header #mini_block #mini_block_name span {
    font-weight: 600;
    font-size: 0.9vw;
    line-height: 1.2vw;
    letter-spacing: 0.2px;
    color: #a2a2a2;
  }

  #BoardContainer
    #main_menu
    #header
    #mini_block
    #mini_block_name
    #profile-icon {
    font-weight: 700;
    font-size: 1.01vw;
    color: #3751ff;
    width: 3.5vw;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2.17391304347826vw;
    background: #f1f2ff;
    margin-right: 0.5vw;
  }

  #BoardContainer #main_menu #header #mini_block #mini_block_name img {
    width: 3.18840579710145vw;
    height: 3.18840579710145vw;
    margin: 0 0 0 1.01449275362319vw;
    border-radius: 2.17391304347826vw;
    border: 0.144927536231884vw solid #c4c4c4;
  }

  #BoardContainer #main_menu #score {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 9vw;
    grid-gap: 1.8vw;
    margin-bottom: 1vw;
  }

  #BoardContainer #main_menu #score #score_card {
    background: #ffffff;
    box-shadow: 0px 0px 0.07vw rgba(0, 0, 0, 0.14),
      0px 1.3vw 2.8vw rgba(0, 0, 0, 0.06);
    border-radius: 0.5vw;
    padding: 1.1vw 0 1.1vw 1.3vw;
    display: flex;
    align-items: center;
  }

  #BoardContainer #main_menu #score #score_card #score {
    color: #0c1eff;
    width: 4.5vw;
    height: 4.5vw;
    font-size: 1.5vw;
    background: #f2f3ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    line-height: 0;
    position: relative;
    span {
      position: absolute;
    }
    span:nth-child(1) {
      top: 1.8vw;
      left: 0.5vw;
      font-size: 1.5vw;
      font-weight: 700;
    }
    span:nth-child(2) {
      font-size: 3vw;
      font-weight: 100;
      transform: rotate(19deg);
      left: 2.1vw;
      top: 2.5vw;
      color: #a4add1;
    }
  }
  span:nth-child(3) {
    font-size: 0.8vw;
    right: 0.6vw;
    bottom: 1.4vw;
  }

  #BoardContainer #main_menu #score #score_card:nth-child(2) #score {
    color: #14db51;
    background: #f2fff6;
  }

  #BoardContainer #main_menu #score #score_card:nth-child(3) #score {
    color: #ff9900;
    background: #fff7eb;
  }

  #BoardContainer #main_menu #score #score_card:nth-child(4) #score {
    color: #e02424;
    background: #fff8f8;
  }

  #BoardContainer #main_menu #score #score_card p {
    width: 7vw;
    font-size: 1.1vw;
    font-weight: 600;
    line-height: 1.6vw;
    letter-spacing: 0.021vw;
    color: #252733;
    margin: 0 0 0 1.15vw;
  }

  #BoardContainer #main_menu #score #score_card:nth-child(2) p {
    width: 9vw;
  }

  #BoardContainer #main_menu #score #score_card:nth-child(3) p {
    width: 9vw;
  }

  #BoardContainer #main_menu #message #message_block1 {
    display: grid;
    grid-template-columns: 6% 12% 18% 18% 25% 11% auto;
    grid-template-rows: 2.89vw;
    grid-gap: 0.57vw;
    margin: 2.17vw 0 0 0;
  }

  #BoardContainer #main_menu #message #message_block1 h3 {
    font-size: 1.15vw;
    font-style: normal;
    font-weight: 600;
    color: #252733;
    padding: 0 0.72vw;
    background: #f2f3f7;
    border-radius: 0.28vw;
    display: flex;
    align-items: center;
  }

  #BoardContainer #main_menu #message #message_block2 {
    width: 100%;
    height: 23vw;
    overflow: scroll;
    overflow-x: hidden;
  }

  #BoardContainer #main_menu #message #message_block2::-webkit-scrollbar {
    width: 0;
  }

  #BoardContainer #main_menu #message:hover #message_block2::-webkit-scrollbar {
    width: 0.36vw;
  }

  /* Track */
  #BoardContainer #main_menu #message #message_block2::-webkit-scrollbar-track {
    background: none;
  }

  /* Handle */
  #BoardContainer #main_menu #message #message_block2::-webkit-scrollbar-thumb {
    background: #f2f3f7;
  }

  /* Handle on hover */
  #BoardContainer
    #main_menu
    #message
    #message_block2::-webkit-scrollbar-thumb:hover {
    background: #363740;
  }

  #BoardContainer #main_menu #message #message_block2 #task_container {
    display: grid;
    grid-template-columns: 6% 12% 18% 18% 25% 11% auto;
    grid-template-rows: 2.89vw;
    grid-gap: 0.57vw;
    border-bottom: 0.07vw solid #ededee;
    padding: 0.72vw 0;
    cursor: pointer;
    transition: 0.5s ease-in-out;
  }
  #BoardContainer #main_menu #message #message_block2 #task_container:hover {
    border-bottom: 0.144vw solid #ededee;
  }

  #BoardContainer
    #main_menu
    #message
    #message_block2
    #task_container:nth-child(1) {
    margin: 2.173vw 0 0 0;
  }

  #BoardContainer #main_menu #message #message_block2 #task_container p {
    padding: 0 0 0 0.72vw;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1vw;
    color: #252733;
    overflow: hidden;
  }

  #BoardContainer
    #main_menu
    #message
    #message_block2
    #task_container
    p:nth-child(7) {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #BoardContainer
    #main_menu
    #message
    #message_block2
    #task_container
    .delete_icon:hover {
    color: red;
    cursor: pointer;
  }

  #BoardContainer #admin {
    background: #ffffff;
    border-radius: 0.86vw;
    padding: 2.82vw 1.01vw;
    height: 100%;
  }
  #BoardContainer #admin #admin_block1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #BoardContainer #admin #admin_block1 h1 {
    font-weight: 700;
    font-size: 1.59vw;
    color: #252733;
  }
  #BoardContainer #admin #admin_block1 p img {
    width: 1.3vw;
    height: 1.3vw;
    margin: 0 0.43vw 0 0;
  }
  #BoardContainer #admin #admin_tab {
    border-bottom: 0.07vw solid #aaaaaa7a;
    display: grid;
    grid-template-columns: 6.81vw 6.81vw 6.81vw 6.81vw;
    gap: 6.81vw;
    margin: 2.31vw 0 0 0;
  }
  #BoardContainer #admin #admin_tab h2 {
    font-weight: 500;
    font-size: 1.3vw;
    line-height: 1.8vw;
    color: #252733;
    margin: 0 0 1.15vw 0;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: 0.5s ease-in-out;
  }
  #BoardContainer #admin #admin_tab .active {
    color: #3751ff;
    transition: 0.5s ease-in-out;
  }
  #BoardContainer #admin #admin_tab .active:before {
    content: "";
    width: 100%;
    height: 0.3vw;
    position: absolute;
    background: #3751ff;
    left: 0;
    bottom: -1.3vw;
    border-radius: 2.17vw 2.17vw 0 0;
    transition: 0.5s ease-in-out;
  }
  #BoardContainer #admin #message #message_block1 {
    display: grid;
    grid-template-columns: 5% 17% 18% 11% 22% auto;
    grid-template-rows: 2.89vw;
    grid-gap: 0.57vw;
    margin: 2.17vw 0 0 0;
  }

  #BoardContainer #admin #message #message_block1 h3 {
    font-size: 1.15vw;
    font-style: normal;
    font-weight: 600;
    color: #252733;
    padding: 0 0.72vw;
    background: #f2f3f7;
    border-radius: 0.28vw;
    display: flex;
    align-items: center;
  }
  #BoardContainer #admin #message #message_block2 {
    width: 100%;
    height: 25vw;
    overflow: scroll;
    overflow-x: hidden;
  }

  #BoardContainer #admin #message #message_block2::-webkit-scrollbar {
    width: 0;
    position: absolute;
  }

  #BoardContainer #admin #message:hover #message_block2::-webkit-scrollbar {
    width: 0.36vw;
  }

  /* Track */
  #BoardContainer #admin #message #message_block2::-webkit-scrollbar-track {
    background: none;
  }

  /* Handle */
  #BoardContainer #admin #message #message_block2::-webkit-scrollbar-thumb {
    background: #f2f3f7;
  }

  /* Handle on hover */
  #BoardContainer
    #admin
    #message
    #message_block2::-webkit-scrollbar-thumb:hover {
    background: #363740;
  }

  #BoardContainer #admin #message #message_block2 #task_container {
    display: grid;
    grid-template-columns: 5% 17% 18% 11% 19% auto;
    grid-template-rows: 2.89vw;
    grid-gap: 0.57vw;
    border-bottom: 0.07vw solid #ededee;
    padding: 0.72vw 0;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    padding: 1vw 0;
  }

  #BoardContainer #admin #message #message_block2 #task_container:hover {
    border-bottom: 0.144vw solid #ededee;
  }
  #BoardContainer #admin #message #message_block2 #task_container p {
    font-size: 1vw;
  }
  #BoardContainer #admin #message #message_block2 #task_container #profile_box {
    display: flex;
  }
  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #profile_box
    #profile_text {
    display: flex;
    flex-direction: column;
  }
  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #profile_box
    #profile-icon {
    font-weight: 700;
    font-size: 1.01vw;
    color: #3751ff;
    width: 3.5vw;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2.17391304347826vw;
    background: #f1f2ff;
    margin-right: 0.5vw;
    padding: 0;
  }

  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #profile_box
    #profile_text
    h2 {
    font-weight: 600;
    font-size: 1.15vw;
    color: #252733;
    line-height: 2vw;
  }
  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #profile_box
    #profile_text
    p {
    font-weight: 600;
    font-size: 0.72vw;
    color: #252733;
    opacity: 0.5;
    padding: 0;
    line-height: 1.5vw;
  }
  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #profile_box
    img {
    width: 2.8vw;
    height: 2.8vw;
    margin: 0 0.57vw 0 0;
    border-radius: 2.17391304347826vw;
    border: 0.144927536231884vw solid #c4c4c4;
  }
  #BoardContainer #admin #message #message_block2 #task_container #btns {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #BoardContainer #admin #message #message_block2 #task_container #btns button {
    width: 7.2vw;
    height: 3vw;
    background: #3751ff;
    border-radius: 0.57vw;
    font-weight: 700;
    font-size: 1.01vw;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
  }
  #BoardContainer
    #admin
    #message
    #message_block2
    #task_container
    #btns
    button:nth-child(2) {
    background: transparent;
    color: #ff0000;
    border: none;
    outline: none;
  }

  ${"" /* Admin home */}
  #BoardContainer #admin_home {
    height: 100%;
  }
  #BoardContainer #admin_home #admin #message #message_block1 {
    grid-template-columns: 6% 20% 20% 20% 20% 10%;
  }
  #BoardContainer #admin_home #admin #message #message_block2 {
    height: 30vw;
  }
  #BoardContainer #admin_home #admin #message #message_block2 #btns img {
    width: 26px;
    height: 26px;
  }
  #BoardContainer #admin_home #admin #message_block2 #task_container {
    grid-template-columns: 6% 20% 20% 20% 20% 10%;
  }
  #BoardContainer
    #admin_home
    #admin
    #message_block2
    #task_container
    #profile-icon {
    font-weight: 700;
    font-size: 1.01vw;
    color: #3751ff;
    width: 3.5vw;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2.17391304347826vw;
    background: #f1f2ff;
    margin-right: 0.5vw;
  }
`

export const EmployeeFormStyle = styled.div`
  #employee_wrap {
    padding: 50px 0 0 0;
  }
  #input_wrap {
    display: flex;
    flex-direction: column;
  }
  #input_wrap label {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #555555;
    margin-bottom: 6px;
  }
  #input_wrap input {
    height: 48px;
    border-radius: 6px;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #121212;
    padding: 12px;
    background: #f3f3f4;
    border: none;
    outline-color: #1874d2;
  }
  #input_wrap:nth-child(2) {
    margin-top: 32px;
  }
  #add_employee_main button {
    height: 48px;
    background: #3751ff;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;
    color: #ffffff;
    border: none;
    outline: none;
    width: 100%;
    margin-top: 50px;
    cursor: pointer;
  }
`

export const LeaveDetailstyle = styled.div`
  #employee_wrap {
    padding: 50px 0 0 0;
  }
  #add_employee_main #pop_headder {
    display: flex;
    justify-content: space-between;
  }
  #add_employee_main #profile_box {
    display: flex;
    align-items: center;
    padding: 0 5rem 1rem 0;
    border-bottom: 2px solid #eeeeee;
  }
  #add_employee_main #profile_box #profile-icon {
    font-weight: 700;
    font-size: 1.01vw;
    color: #3751ff;
    width: 3.5vw;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2.17391304347826vw;
    background: #f1f2ff;
    margin-right: 0.5vw;
    padding: 0;
  }
  #add_employee_main #profile_box #profile_text {
    display: flex;
    flex-direction: column;
  }
  #add_employee_main #profile_box #profile_text h2 {
    font-weight: 600;
    font-size: 16px;
    color: #252733;
    line-height: 14px;
  }
  #add_employee_main #profile_box #profile_text p {
    font-weight: 600;
    font-size: 12px;
    color: #252733;
    opacity: 0.5;
    padding: 0;
  }
  #add_employee_main #profile_box img {
    width: 48px;
    height: 48px;
    margin: 0 0.57vw 0 0;
    border-radius: 50px;
  }
  #add_employee_main #leave_details {
    display: flex;
    flex-direction: column;
    width: fit-content;
    opacity: 0.5;
  }
  #add_employee_main #leave_details span {
    font-weight: 600;
  }
  #add_employee_main #pop_body {
    display: flex;
    flex-direction: column;
  }
  #add_employee_main #pop_body span {
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    letter-spacing: 0.2px;
    color: #252733;
    margin-top: 12px;
  }
  #add_employee_main #pop_body span:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    opacity: 0.5;
  }
  #add_employee_main #pop_body textarea {
    border: none;
    outline: none;
    background: #f3f4f6;
    border-radius: 8px;
    margin: 0.8rem 0 2rem 0;
    padding: 14px;
    font-size: 1rem;
    line-height: 1.6rem;
    letter-spacing: 0.2px;
    height: 113px;
    resize: none;
  }
  #add_employee_main #pop_body #pop_btns {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
  }
  #add_employee_main #pop_body #pop_btns button {
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    line-height: 1.2rem;
    font-style: normal;
    font-weight: 700;
    color: #ff0000;
    background: none;
    outline: none;
    cursor: pointer;
    border: 1px solid #ff0000;
    border-radius: 0.4rem;
  }
  #add_employee_main #pop_body #pop_btns button:nth-child(2) {
    color: white;
    border: none;
    background: #3751ff;
  }
`

export const EditUserFormStyle = styled.div`
  #add_employee_main {
    margin-bottom: 30px;
  }
  #employee_wrap {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 1.3rem 0 0 0;
  }
  #input_wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  #input_wrap label {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #555555;
    margin-bottom: 6px;
  }
  #input_wrap input {
    height: 48px;
    border-radius: 6px;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #121212;
    padding: 12px;
    background: #f3f3f4;
    border: none;
    outline-color: #1874d2;
  }
  #add_employee_main button {
    height: 48px;
    background: #3751ff;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;
    color: #ffffff;
    border: none;
    outline: none;
    width: 100%;
    margin-top: 50px;
    cursor: pointer;
  }
`
