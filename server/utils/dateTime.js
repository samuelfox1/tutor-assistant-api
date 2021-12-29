const getISOCurrentDateStamp = () => new Date().toISOString();

//      1 * 1,000 =     1,000 milliseconds in 1 second
//     60 * 1,000 =    60,000 milliseconds in 1 minute
//  3,600 * 1,000 = 3,600,000 milliseconds in 1 hour

const getCurrentHour = () => {
  const currTime = Math.floor(Date.now());
  const currHour = currTime - (currTime % 3600000);
  return currHour;
};
const getISOCurrentHour = () => new Date(getCurrentHour()).toISOString();
const getISOPastHour = (x) => {
  if (!x) return getISOCurrentHour();
  return new Date(getCurrentHour() - 3600000 * (x)).toISOString();
};
const getISOFutureHour = (x) => {
  if (!x) return getISOCurrentHour();
  return new Date(getCurrentHour() + 3600000 * (x)).toISOString();
};

module.exports = {
  getISOCurrentDateStamp,
  getISOPastHour,
  getISOCurrentHour,
  getISOFutureHour,
};
