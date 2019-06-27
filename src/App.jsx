import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import holidays from './data/holidays';

import Year from './calendar/Year';
import VacationMeter from './ui/VacationMeter';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70vw;
  max-width: 900px;
  min-width: 600px;
`;

const Title = styled.h1`
  font-family: monospace;
  font-size: 4rem;
  margin: 1rem 0;
`;

function App() {
  let year = 2019;

  const numVacationDays = 23;
  const [vacationDays, setVacationDays] = useState([]);
  const [workedHolidays, setWorkedHolidays] = useState([]);

  function thereAreDaysLeftOff() {
    return numVacationDaysLeft() > 0;
  }

  function numVacationDaysLeft() {
    return numVacationDays - vacationDays.length + workedHolidays.length;
  }

  function takeDayOff(mmdd, takeOff) {
    if (takeOff) { // trying to take this day off
      if (vacationDays.includes(mmdd) || !thereAreDaysLeftOff()) { // it's already off or you're out of days
        return false;
      } else {
        setVacationDays([...vacationDays, mmdd]);
        return true;
      }
    } else { // trying to turn it back into a working day
      if (vacationDays.includes(mmdd)) {
        setVacationDays(vacationDays.filter(day => day !== mmdd));
        return true;
      } else { // it's not off
        return false;
      }
    }
  }

  function workHoliday(mmdd, work) {
    if (work) { // trying to work this holiday
      if (workedHolidays.includes(mmdd)) { // already working it
        return false;
      } else {
        setWorkedHolidays([...workedHolidays, mmdd]);
        return true;
      }
    } else { // trying to have this holiday off
      if (workedHolidays.includes(mmdd) && thereAreDaysLeftOff()) {
        setWorkedHolidays(workedHolidays.filter(day => day !== mmdd));
        return true;
      } else { // it's already off
        return false;
      }
    }
  }
  
  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: 'right' }}>
        <VacationMeter vacationDaysLeft={numVacationDaysLeft()} />
      </div>
      <h2>{year}</h2>
      <Year year={year} holidays={holidays[`${year}`]['boston']} takeDayOff={takeDayOff} workHoliday={workHoliday} />
    </Wrapper>
  );
}

export default App;
