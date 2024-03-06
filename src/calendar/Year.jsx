import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';
import Measurements from '../util/Measurements';

import Weekdays from './Weekdays';
import Day from './Day';
import Months from './Months';
import WeekNumbers from './WeekNumbers';

const YearGrid = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: ${Measurements.year.padding}px ${Measurements.year.padding * 2}px ${Measurements.year.padding * 2}px ${Measurements.year.padding}px;
  padding-bottom: ${Measurements.year.padding * 2}px;
  margin-bottom: ${Measurements.year.padding * 4}px;

  display: grid;
  grid-template-columns:  
                          [months]    1fr
                          [monday]    3fr
                          [tuesday]   3fr
                          [wednesday] 3fr
                          [thursday]  3fr
                          [friday]    3fr
                          [saturday]  3fr
                          [sunday]    3fr;
                          [weeknos]   1fr;

  grid-gap: ${Measurements.year.padding}px;
  background-color: var(--year-background);
  border-radius: ${Measurements.year.borderRadius}px;
`;

function Year(props) {
  const today = new Date(Date.UTC(props.year, props.startMonth - 1, 1));
  const days = [];
  let leftStartMonth = false;
  while (true) {
    if (leftStartMonth && today.getUTCMonth() === (props.startMonth - 1)) {
      break;
    }
    days.push(new Date(today.getTime()));
    today.setUTCDate(today.getUTCDate() + 1);
    if (today.getUTCMonth() > (props.startMonth - 1)) {
      leftStartMonth = true;
    }
  }

  return (
    <YearGrid>
      <Weekdays />
      {
        days.map(day => {
          const mmdd = DateUtil.dateStringMMDD(day);
          const yyyymmdd = DateUtil.dateStringYYYYMMDD(day);
          return (
            <Day
              key={yyyymmdd}
              day={day}
              holiday={props.holidays[yyyymmdd] || ''}
              vacationing={props.vacationDays.includes(yyyymmdd)}
              workedHoliday={props.workedHolidays.includes(yyyymmdd)}
              startMonth={props.startMonth}
              {...props}
            />
          );
        })
      }
      <Months year={props.year} startMonth={props.startMonth} />
      <WeekNumbers days={days} />
    </YearGrid>
  );
}

export default Year;
