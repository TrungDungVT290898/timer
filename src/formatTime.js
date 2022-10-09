export const addingHeaderForNumber = number => {
  return number >= 10 ? number : '0' + number
}
export const formatTime = time => {
  let hours = Math.floor(time / 3600)
  time = time - hours * 3600
  let minutes = Math.floor(time / 60)
  time -= minutes * 60

  return `${addingHeaderForNumber(hours)} :  ${addingHeaderForNumber(
    minutes
  )} :  ${addingHeaderForNumber(time)} `
}
