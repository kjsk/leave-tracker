import styled from "styled-components"

export const DashboardContainer = styled.div`
  padding: 1vw;
  #dashboard_container {
    #dashboard_nav {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      border-bottom: 1px solid #d0d0d0;
      padding-bottom: 1.1vw;
      margin-bottom: 1.1vw;
      span {
        font-weight: 700;
        font-size: 1.5vw;
        line-height: 1.9vw;
        color: #252733;
      }
    }
  }
  .dashboard_detail {
    padding: 0 2.8vw;
    h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 1.3vw;
      line-height: 0;
      color: #252733;
      padding: 30px 0;
      border-top: 0.1vw solid #d0d0d0;
      border-bottom: 0.1vw solid #d0d0d0;
    }
    .dashboard_detail_cards {
      height: 10vw;
      overflow: scroll;
      overflow-x: hidden;
      transition: 0.5s ease-in-out;
      ::-webkit-scrollbar {
        width: 0.36vw;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: none;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #dde2ff;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb {
        background: #f2f3f7;
      }
      .card {
        display: flex;
        gap: 1vw;
        cursor: pointer;
        padding: 2.5vw 0 2vw 0;
        border-bottom: 0.1vw solid #d0d0d0;
        .card_container1 #profile-icon {
          width: 6.9vw;
          height: 6.9vw;
          background: #f2f3ff;
          border-radius: 100px;
          font-style: normal;
          font-weight: 500;
          font-size: 4.2vw;
          line-height: 0;
          color: #252733;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card_container2 {
          width: 100%;
          .card_name_container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .card_name_container1 {
              display: flex;
              align-items: center;
              gap: 0.5vw;
              .leave_tag {
                background: #f0bd70;
                border-radius: 0.25vw;
                padding: 0.5vw 0.9vw;
                font-style: normal;
                font-weight: 500;
                font-size: 0.8vw;
                color: #ffffff;
              }
              p {
                font-style: normal;
                font-weight: 600;
                font-size: 1vw;
                line-height: 1vw;
                color: #252733;
              }
            }
            h2 {
              display: flex;
              gap: 0.6vw;
              width: fit-content;
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 19px;
              color: #00d241;
              span {
                color: #000000;
              }
            }
          }
        }
      }
      .detail {
        font-style: normal;
        font-weight: 600;
        font-size: 1vw;
        line-height: 1.1vw;
        color: #252733;
        margin: 1vw 0;
      }
      .day_tag {
        font-style: normal;
        font-weight: 600;
        font-size: 1vw;
        line-height: 0;
        color: #a4a6b3;
      }
    }
  }
`
