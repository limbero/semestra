import React from 'react';
import styled from 'styled-components';

import DateUtil from '../util/DateUtil';

const Weekday = styled.div`
  grid-column-start: ${props => props.$weekday || 'auto'};
  grid-column-end: span 1;

  box-sizing: border-box;
  height: 75px;
  padding: 5px;

  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  line-height: 75px;
`;

function Weekdays(props) {
  return (
    <>
      {
        [...Array(7).keys()].map((index) => (
          <Weekday
            key={index}
            $weekday={DateUtil.weekdayName(index).toLowerCase()}
          >
            {DateUtil.weekdayName(index).slice(0, 3)}
          </Weekday>
        ))
      }
    </>
  );
}

export default Weekdays;
