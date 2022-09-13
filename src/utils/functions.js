// Function to split letters in user name to use as DP
export const nameProf = name => {
  let text = name
  const myArray = text?.split(" ")
  return (
    myArray &&
    (myArray[0] ? myArray[0][0] : "") + " " + (myArray[1] ? myArray[1][0] : "")
  )
}
