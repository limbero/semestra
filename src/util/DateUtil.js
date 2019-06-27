class DateUtil {
  static zeropad(num, len) {
    let numstr = String(num);
    while (numstr.length < len) {
      numstr = `0${ numstr}`;
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
    return `${this.dateTimeStringYYYYMMDDHHMM(date, 'T') }Z`;
  }
  static utcDateTimeStringYYYYMMDDHHMMSSMMM(date) {
    return `${this.fullDateTimeString(date, 'T') }Z`;
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

  static isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  static lengthOfMonth(month, year) {
    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (this.isLeapYear(year)) {
      daysInMonth[1] = 29;
    }
    return daysInMonth[month];
  }
}

export default DateUtil;
