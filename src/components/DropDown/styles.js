import styled from "styled-components"

export const DropdownContainer = styled.div`
.dropdown_container {
    width: fit-content;
    position: relative;
    .drop_options_container {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        padding: 4px;
        border-radius: 8px;
        background-clip: padding-box;
        background-color: #fff;
        z-index:5;
        box-shadow:0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
        ul{
        height: 9vw;
        overflow: scroll;
            .options_select {
                padding: 0.3vw 0 0.3vw 0.5vw;
                cursor: pointer;
                transition: 0.5s ease-in-out;
                &:hover {
                    background: rgba(0, 0, 0, 0.04);
                }
            }
            ::-webkit-scrollbar {
    width: 0.2vw;
  }
  ::-webkit-scrollbar-thumb {
    background: #f2f3f7;
  }
        }
        .add_leave_btn {
            background: transparent;
            color: blue;
            border: none;
            outline:none;
            cursor: pointer;
            font-size: 0.8vw;
            position: absolute;
            bottom: 0;
            right:0.5vw;
                    }
    }
}
`