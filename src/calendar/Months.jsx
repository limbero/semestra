import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


const Month = styled.div`
  grid-column-start: months;

  grid-row-start: ${props => props.startRow || 'auto'};
  grid-row-end: span ${props => props.spanRows || '1'};

  box-sizing: border-box;
  padding: 5px;

  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;

  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: ${props => 30 * props.spanRows / props.month.length}px;
  line-height: 100%;
`;

function Months(props) {
  const today = new Date(Date.UTC(props.year, 0, 1));

  let monthStartsOn = DateUtil.weekdayFromDate(today);
  let lastRow = 2;
  return (
    <>
      {
        months.map((month, index) => {
          let days = DateUtil.lengthOfMonth(index, props.year) + monthStartsOn;
          const startRow = lastRow;
          let height = 0;

          while (days >= 8) {
            days -= 7;
            height++;
          }
          
          monthStartsOn = days;

          lastRow = startRow + height;
          if (index === 0) {
            lastRow++;
            height++;
          }

          return (
            <Month
              key={month}
              startRow={startRow}
              spanRows={height}
              month={month}
            >
              {month}
            </Month>
          );
        })
      }
    </>
  );
}

export default Months;
