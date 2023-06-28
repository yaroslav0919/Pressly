export const convertSecondToTime = (timeVal: number) => {
  const dateObj = new Date(timeVal * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();
  const timeString =
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0');

  return timeString;
};

export const getRemainingTime = (timeVal: number) => {
  const dateObj = new Date((1500 - timeVal) * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();
  const timeString =
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0');

  return timeString;
};
