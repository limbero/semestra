import React from 'react';
import styled from 'styled-components';

const VacationMeterItem = styled.div`
  background-color: #FAFAFA;

  display: inline;
  box-sizing: border-box;
  padding: 19px 15px 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  position: fixed;
  top: -4px;

  box-shadow: 4px 4px 0 0 rgba(0,0,0, 0.3);
  transform: translateX(-100%);
`;

function VacationMeter(props) {
  return (
    <VacationMeterItem>
      <strong>Vacation days left:</strong> {props.vacationDaysLeft}
    </VacationMeterItem>
  );
}

export default VacationMeter;
