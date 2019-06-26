import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';
import Colors from '../util/Colors';
import Measurements from '../util/Measurements';

const DayCell = styled.div`
  grid-column-start: ${props => props.weekday || 'auto'};
  grid-column-end: span 1;
  background-color: ${props => (['saturday', 'sunday'].includes(props.weekday) ? Colors.helgdag : Colors.vardag)};
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
`;

function Day(props) {
  return (
    <DayCell
      weekday={DateUtil.weekdayNameFromDate(props.day).toLowerCase()}
      month={props.day.getUTCMonth()}
      date={props.day.getUTCDate()}
      year={props.day.getUTCFullYear()}
    >
      {props.day.getUTCDate()}
    </DayCell>
  );
}

export default Day;
