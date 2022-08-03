import styled from "styled-components"

export const BoardContainer = styled.div`
.ant-scroll-number-only-unit {
  color: white;
  font-size: 0.8vw;
}
  #BoardContainer {
    display: flex;
    height: 100vh;
  }

  #BoardContainer #side_menu {
    width: 16vw;
    height: 100%;
    background: #363740;
    padding: 3.33vw 0 0 0;
  }

  #BoardContainer #side_menu h1 {
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
    margin: 0 0.869565217391304vw 0 0;
  }

  #BoardContainer #side_menu ul {
    margin: 4.49275362318841vw 0 0 0;
  }

  #BoardContainer #side_menu ul:nth-child(3) {
    margin: 0;
    padding: 1.08695652173913vw 0 0 0;
    border-top: 0.072463768115942vw solid #dfe0eb38;
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

  #BoardContainer #side_menu ul li:nth-child(3) {
margin-bottom: 1.5vw;
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
    border-left: 0.217391304347826vw solid white;
  }

  #BoardContainer #side_menu ul li:hover #img1 {
    display: none;
  }

  #BoardContainer #side_menu ul li:hover #img2 {
    display: block;
  }

  #BoardContainer #side_menu #logout{
    margin-top: 10vw;
    transition: 0.5s ease-in-out;
    .imghover {
      display: none;
    }
  }

  #BoardContainer #side_menu #logout:hover li{
    color:white;
    .image {
      display:none;
    }
    .imghover {
      display: inherit;
    }
  }

  #BoardContainer #main_menu {
    width: 84%;
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
    width: 10.2898550724638vw;
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
font-size: 14px;
line-height: 20px;
letter-spacing: 0.2px;
color: #A2A2A2;
  }

  #BoardContainer #main_menu #header #mini_block #mini_block_name #profile-icon {
    font-weight: 700;
    font-size: 1.01vw;
    color: #3751FF;
    width: 3.5vw;
    height: 3.5vw;
    display: flex;
    justify-content:center;
    align-items: center;
    border-radius: 2.17391304347826vw;
    background: #F1F2FF;
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
  }

  #BoardContainer #main_menu #score #score_card {
    background: #ffffff;
    box-shadow: 0px 0px 0.072463768115942vw rgba(0, 0, 0, 0.14),
      0px 1.30434782608696vw 2.89855072463768vw rgba(0, 0, 0, 0.06);
    border-radius: 0.579710144927536vw;
    padding: 1.15942028985507vw 0 1.15942028985507vw 1.30434782608696vw;
    display: flex;
    align-items: center;
  }

  #BoardContainer #main_menu #score #score_card #score {
    color: #0c1eff;
    width: 4.5vw;
    height: 4.5vw;
    font-size: 2vw;
    background: #f2f3ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.579710144927536vw;
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
    grid-template-columns: 5vw 8vw 14.5vw 14.5vw 18vw 9.2vw 6vw;
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

  #BoardContainer #main_menu #message #message_blocks {
    width: 100%;
    height: 23vw;
    display: flex;
    justify-content: center;
    align-items: center;
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
    grid-template-columns: 5vw 8vw 14.5vw 14.5vw 19vw 8vw 5vw;
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
    font-size: 1.15vw;
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
  #BoardContainer #admin #admin_block1 #share {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.15vw;
    color: #4b506d;
    cursor: pointer;
  }
  #BoardContainer #admin #admin_block1 p img {
    width: 1.3vw;
    height: 1.3vw;
    margin: 0 0.43vw 0 0;
  }
  #BoardContainer #admin #admin_tab {
    border-bottom: 0.07vw solid #aaaaaa7a;
    display: grid;
    grid-template-columns: 6.81vw 6.81vw 6.81vw;
    gap: 6.81vw;
    margin: 2.31vw 0 0 0;
  }
  #BoardContainer #admin #admin_tab h2 {
    font-weight: 500;
    font-size: 1.3vw;
    color: #252733;
    margin: 0 0 1.15vw 0;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: 0.5s ease-in-out;
  }
  #BoardContainer #admin #admin_tab h2:hover {
    color: #3751ff;
  }
  #BoardContainer #admin #admin_tab h2:hover:before {
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
    grid-template-columns: 5vw 12vw 13.4vw 10vw 17vw 17vw;
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
    height: 23vw;
    overflow: scroll;
    overflow-x: hidden;
  }

  #BoardContainer #admin #message #message_block2::-webkit-scrollbar {
    width: 0;
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
    grid-template-columns: 5vw 12vw 13.4vw 10vw 16vw 18vw;
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
    font-size: 1.1vw;
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
    width: 3.18840579710145vw;
    height: 3.18840579710145vw;
    margin: 0 0.57vw 0 0;
    border-radius: 2.17391304347826vw;
    border: 0.144927536231884vw solid #c4c4c4;
  }
  #BoardContainer #admin #message #message_block2 #task_container #btns {
    width: 100%;
    margin: 0 0 0 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #BoardContainer #admin #message #message_block2 #task_container #btns button {
    width: 7.2vw;
    height: 2.3vw;
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
`
