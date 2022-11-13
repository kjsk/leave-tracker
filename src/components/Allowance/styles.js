import styled from "styled-components"

export const AllowanceContainer = styled.div`
  #admin_homes {
    height: 100%;

    #admin #message #message_block1 {
      grid-template-columns: 6% 42% 50% !important;
    }
    #admin #message #message_block2 {
      height: 30vw;
    }
    #admin #message_block2 #task_container {
      grid-template-columns: 6% 42% 42% !important;
    }
  }
`

export const CreateAllowancePopStyles = styled.div`
  #add_employee_main {
    margin-bottom: 30px;
    #employee_wrap {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      padding: 1.3rem 0 0 0;
    }

    #employee_wrap_policy {
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
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #252733;
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
      border: 1px solid #afafaf;
    }
    #add_allowance_container {
      border-top: 1px solid #afafaf;
      margin-top: 15px;
    }
    #employee_wrap_policy #input_wrap {
      justify-content: center;
    }
    #employee_wrap_policy #input_wrap input {
      width: 100%;
    }
    #employee_wrap_policy .input_wrap .switch {
      width: 40%;
    }

    .employee_wrap_description #input_wrap textarea {
      height: 100px;
      border-radius: 6px;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      color: #121212;
      padding: 12px;
      background: #f3f3f4;
      border: none;
      outline-color: #1874d2;
      border: 1px solid #afafaf;
    }
    ${"" /* #add_employee_main button {
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
    } */}

    .btn_container {
      display: flex;
      justify-content: end;
      margin-top: 16px;
    }
    .btn_container #add_allowance_btn {
      border: none;
      outline: none;
      background: #efefef;
      border-radius: 6px;
      cursor: pointer;
      color: #3751ff;
      font-size: 14px;
    }
    .btn_container .remove_allowance_btn {
      border: none;
      outline: none;
      background: #efefef;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      color: red;
    }
  }
`
