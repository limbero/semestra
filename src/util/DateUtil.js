class DateUtil {
  static zeropad(num, len) {
    let numstr = String(num);
    while (numstr.length < len) {
      numstr = `0${numstr}`;
    }
    return numstr;
  }
  static fullDateTimeString(date, separator = ' ') {
    return this.dateStringYYYYMMDD(date) + separator + this.timeStringHHMMSSMMM(date);
  }
  static dateTimeStringYYYYMMDDHHMM(date, separator = ' ') {
    return this.dateStringYYYYMMDD(date) + separator + this.timeStringHHMM(date);
  }
  static utcDateTimeStringYYYYMMDDHHMM(date) {
    return `${this.dateTimeStringYYYYMMDDHHMM(date, 'T')}Z`;
  }
  static utcDateTimeStringYYYYMMDDHHMMSSMMM(date) {
    return `${this.fullDateTimeString(date, 'T')}Z`;
  }
  static dateStringYYYYMMDD(date, separator = '-') {
    return date.getUTCFullYear() + separator + this.dateStringMMDD(date, separator);
  }
  static dateStringMMDD(date, separator = '-') {
    let dateString = this.zeropad(date.getUTCMonth() + 1, 2) + separator;
    dateString += this.zeropad(date.getUTCDate(), 2);
    return dateString;
  }
  static timeStringHHMM(date, separator = ':') {
    let timeString = this.zeropad(date.getUTCHours(), 2) + separator;
    timeString += this.zeropad(date.getUTCMinutes(), 2);
    return timeString;
  }
  static timeStringHHMMSS(date, separator = ':') {
    return this.timeStringHHMM(date) + separator + this.zeropad(date.getUTCSeconds(), 2);
  }
  static timeStringHHMMSSMMM(date, separator = '.') {
    return this.timeStringHHMMSS(date) + separator + this.zeropad(date.getUTCMilliseconds(), 3);
  }
  static dateFromUTCFormControlString(string) {
    return new Date(`${string}Z`);
  }

  static isSameDate(a, b) {
    return (a.getUTCFullYear() === b.getUTCFullYear()) && (a.getUTCMonth() === b.getUTCMonth()) && (a.getUTCDate() === b.getUTCDate());
  }
  static isBefore(a, b) {
    return (a.getUTCFullYear() <= b.getUTCFullYear()) && (a.getUTCMonth() <= b.getUTCMonth()) && (a.getUTCDate() < b.getUTCDate());
  }

  static weekdayFromDate(date) {
    return this.weekday(date.getUTCDay());
  }

  static weekdayNameFromDate(date) {
    return this.weekdayName(this.weekdayFromDate(date));
  }

  static weekday(index) {
    return [6, 0, 1, 2, 3, 4, 5][index];
  }

  /* Huge thanks to https://stackoverflow.com/a/6117889
  * For a given date, get the ISO week number
  *
  * Based on information at:
  *
  *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
  *
  * Algorithm is to find nearest thursday, it's year
  * is the year of the week number. Then get weeks
  * between that date and the first day of that year.
  *
  * Note that dates in one year can be weeks of previous
  * or next year, overlap is up to 3 days.
  *
  * e.g. 2014/12/29 is Monday in week  1 of 2015
  *      2012/1/1   is Sunday in week 52 of 2011
  */
  static getWeekNumber(d) {
    // Copy date so don't modify original
    const d2 = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d2.setUTCDate(d2.getUTCDate() + 4 - (d2.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d2.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d2 - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d2.getUTCFullYear(), weekNo];
  }

  static weekdayName(index) {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return weekdays[index];
  }

  static months() {
    return {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
  }

  static isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  static lengthOfMonth(month, year) {
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.isLeapYear(year)) {
      daysInMonth[1] = 29;
    }
    return daysInMonth[month];
  }
}

export default DateUtil;
