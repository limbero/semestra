import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';

const WeekNumber = styled.div`
  grid-column-start: weeknos;

  grid-row-start: ${props => props.$startRow || 'auto'};
  grid-row-end: span 1;

  box-sizing: border-box;
  padding: 5px;

  font-size: 1.35rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--inactive);
`;

function WeekNumbers({days}) {
  const weekNumbers = [];
  for (let i = 0; i < days.length; i++) {
    const wn = DateUtil.getWeekNumber(days[i])[1];
    if (wn !== weekNumbers[weekNumbers.length - 1]) {
      weekNumbers.push(wn);
    }
  }
  return (
    <>
      {
        weekNumbers.map((weekNumber, index) => (
          <WeekNumber key={index} $startRow={index + 2}>
            {weekNumber}
          </WeekNumber>
        ))
      }
    </>
  );
}

export default WeekNumbers;
