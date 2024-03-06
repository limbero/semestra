import React from 'react';
import styled from 'styled-components';

const VacationMeterItem = styled.div`
  background-color: var(--year-background);

  display: inline;
  box-sizing: border-box;
  padding: 19px 15px 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  position: fixed;
  top: -4px;
  width: 200px;

  box-shadow: 4px 4px 0 0 rgba(0,0,0, 0.3);
  transform: translateX(-100%);
`;

const TextButton = styled.button`
  background: none;
  border: none;

  padding: 0 4px 2px;
  margin-inline-start: 3px;

  font-size: 1rem;
  font-weight: bold;
  background-color: ${props => props.$accentColor};
  color: var(--background-color);

  border-radius: 3px;

  &:disabled {
    background-color: var(--inactive);
  }

  &:first-child {
    margin-inline-start: 0;
  }
  
  &:not(:disabled):not(:active):not(:focus):hover {
    color: #FD4;
  }
  
  &:not(:disabled):hover {
    cursor: pointer;
  }
  &:active, &:focus {
    outline: none;
    color: #000;
    background-color: ${props => props.$accentColor};
  }
`;

function VacationMeter(props) {
  return (
    <VacationMeterItem>
      <div style={{display:'inline-block'}}>
        <strong>Vacation days left:</strong> {props.vacationDaysLeft}/{props.numVacationDays}
      </div>
      <div style={{display:'inline-block', marginInlineStart: '10px'}}>
        <TextButton
          onClick={() => props.addNumVacationDays(-1)}
          disabled={props.vacationDaysLeft === 0}
          $accentColor={'var(--red)'}
        >
          –
        </TextButton>
        <TextButton
          onClick={() => props.addNumVacationDays(1)}
          $accentColor={'var(--green)'}
        >
          +
        </TextButton>
      </div>
    </VacationMeterItem>
  );
}

export default VacationMeter;
