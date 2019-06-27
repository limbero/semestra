import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';
import Measurements from '../util/Measurements';

import Weekdays from './Weekdays';
import Day from './Day';
import Months from './Months';

const YearGrid = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: ${Measurements.year.padding}px ${Measurements.year.padding*2}px ${Measurements.year.padding*2}px ${Measurements.year.padding}px;
  padding-bottom: ${Measurements.year.padding*2}px;
  margin-bottom: ${Measurements.year.padding*4}px;

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

  grid-gap: ${Measurements.year.padding}px;
  background-color: #EEE;
  border-radius: ${Measurements.year.borderRadius}px;
`;

function Year(props) {
  const today = new Date(Date.UTC(props.year, 0, 1));
  const days = [];
  while (today.getUTCFullYear() === props.year) {
    days.push(new Date(today.getTime()));
    today.setUTCDate(today.getUTCDate() + 1);
  }
  
  return (
    <YearGrid>
      <Weekdays />
      { 
        days.map(day => {
          const mmdd = DateUtil.dateStringMMDD(day);
          return (
            <Day
              key={DateUtil.dateStringYYYYMMDD(day)}
              day={day}
              holiday={props.holidays[mmdd] || ''}
              vacationing={props.vacationDays.includes(mmdd)}
              workedHoliday={props.workedHolidays.includes(mmdd)}
              {...props}
            />
          );
        })
      }
      <Months year={props.year} />
    </YearGrid>
  );
}

export default Year;
