/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JavaScript Date objects use milliseconds
 * Unix is number of seconds since midnight Jan. 1,1970
 *
 * Unix is global standard so I decided to manage dates using unix
 *
 * test unix @ https://www.unixtimestamp.com/index.php
 */

/**
 * @returns {Number} unix time
 */
const getCurrentUnix = () => Math.floor(new Date().getTime() / 1000);
/**
 * @param {Number} unix number of seconds sincs unix epoch, defaults to current unix time
 * @returns {String} timestamp formatted to users Local timezone
 */
const getTimeStamp = (unix = getCurrentUnix()) => new Date(unix * 1000);
/**
 * @param {String} date a date in YYYY-MM-DD format
 * @param {Number }      hour number from 1-12
 * @param {String}       amPm value of either AM or PM
 * @returns {Number} unix time
 */
const getUnixFromFormInputs = (date, hour = 12, amPm = 'AM') => {
  /**
   * @param {Number} hour
   * @param {String} amPm
   * @returns {String} String from 00-23
   * @refernce https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#examples
   */
  const getZeroBasedHour = (hour, amPm) => {
    switch (amPm.toLowerCase()) {
      case 'am':
        //  If 12AM return 00
        if (hour === 12) return '00';
        // If 1-9 return 01-09
        else if (hour < 10) return `0${hour}`;
        else throw new Error(`invalid hour input: ${hour}`);
      case 'pm':
        `${hour + 12}`;
        break;
      default:
        throw new Error(`invalid ampm input: ${amPm}`);
    }
  };
  //  New date object from parameters
  const d = new Date(`${date}T${getZeroBasedHour(parseInt(hour), amPm)}:00:00`);
  const unix = Math.floor(d.getTime() / 1000);

  if (isNaN(unix)) throw new Error('unix isNaN');

  return unix;
};

export { getCurrentUnix, getTimeStamp, getUnixFromFormInputs };
