import React, {useState} from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';
import Colors from '../util/Colors';
import Measurements from '../util/Measurements';

const DayCell = styled.div`
  grid-column-start: ${props => props.weekday || 'auto'};
  grid-column-end: span 1;
  background-color: ${props => {
    if (props.workedHoliday) { return Colors.arbetadHelgdag; }
    else if (todayIsOff(props.weekday, props.holiday)) { return Colors.helgdag; }
    else if (props.vacationing) { return Colors.semester; }
    else { return Colors.vardag; }
  }};
  ${props => {
    if (props.month === 11) { return ''; }
    if (props.date === DateUtil.lengthOfMonth(props.month, props.year) && props.weekday !== 'sunday') {
      return (
        `box-shadow: 0 ${Measurements.year.padding*4}px 0 -${Measurements.year.borderRadius*5}px ${Colors.monthDivider}, ` +
        `${Measurements.year.padding*4}px 0 0 -${Measurements.year.borderRadius*5}px ${Colors.monthDivider};`
      );
    }
    if (DateUtil.lengthOfMonth(props.month, props.year) - props.date < 7) {
      return (
        `box-shadow: 0 ${Measurements.year.padding*4}px 0 -${Measurements.year.borderRadius*5}px ${Colors.monthDivider};`
      );
    }
  }}

  box-sizing: border-box;
  height: 75px;
  padding: 7px;
  border-radius: 5px;

  p.date {
    margin: 0;
  }
  p.holiday {
    margin: 5px 0 0 0;
    font-size: 0.8rem;
    color: #444;
    ${props => props.workedHoliday ? 'text-decoration: line-through;' : '' }
  }
`;

function todayIsOff(weekday, holiday) {
  return todayIsTheWeekend(weekday) || holiday;
}

function todayIsTheWeekend(weekday) {
  return ['saturday', 'sunday'].includes(weekday);
}

function Day(props) {
  const [vacationing, setVacationing] = useState(false);
  const [workedHoliday, setWorkedHoliday] = useState(false);

  const weekday = DateUtil.weekdayNameFromDate(props.day).toLowerCase()

  function toggleTodayOff() {
    if (todayIsTheWeekend(weekday)) {
      return false;
    }

    if (props.holiday) {
      if (!workedHoliday) {
        props.useVacationDays(-1);
        setWorkedHoliday(true);
      } else {
        if (props.useVacationDays(1)) {
          setWorkedHoliday(false);
        }
      }
      return;
    }

    if (!vacationing) {
      if (props.useVacationDays(1)) {
        setVacationing(true);
      }
    } else {
      props.useVacationDays(-1);
      setVacationing(false);
    }
  }
  return (
    <DayCell
      weekday={weekday}
      month={props.day.getUTCMonth()}
      date={props.day.getUTCDate()}
      year={props.day.getUTCFullYear()}
      vacationing={vacationing}
      workedHoliday={workedHoliday}
      onClick={() => toggleTodayOff()}
      {...props}
    >
      <p className="date">{props.day.getUTCDate()}</p>
      <p className="holiday">{props.holiday}</p>
    </DayCell>
  );
}

export default Day;
