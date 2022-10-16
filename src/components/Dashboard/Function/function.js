import { getDashboardDataAPI, leavesByIdAPI } from "../../../utils/urls"
import axios from "axios"

export const getGraphData = props => {
  const {
    headers,
    newDate,
    currentYear,
    setLoader,
    setGraphData,
    setGetDaysData,
    setNewGraphData,
  } = props
  setLoader(true)
  axios({
    url: getDashboardDataAPI(newDate, currentYear),
    method: "GET",
    headers: headers,
  })
    .then(res => {
      setLoader(false)
      setGraphData(res?.data?.data)
      setGetDaysData(res?.data?.data?.ddData)
      setNewGraphData(
        res?.data?.data?.days.map(item => {
          return {
            day: item.day,
            value: item.value === 0 ? null : item.value,
            type: item.value === 0 ? null : item.type,
          }
        })
      )
    })
    .catch(err => console.log("err", err))
}

// Get leave details
export const getLeaveDetails = (
  id,
  headers,
  setDataLoader,
  setEmpLeaveData
) => {
  setDataLoader(true)
  axios({
    url: leavesByIdAPI(id),
    method: "GET",
    headers: headers,
  })
    .then(res => {
      setDataLoader(false)
      setEmpLeaveData(res?.data?.leaves)
    })
    .catch(err => {
      setDataLoader(false)
      setEmpLeaveData([])
      console.log("err", err)
    })
}
