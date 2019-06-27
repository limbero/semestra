import React, { useState } from 'react';
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
  const [vacationDays, setVacationDays] = useLocalStorage(`semestra-${year}-vacationDays`, []);
  const [workedHolidays, setWorkedHolidays] = useLocalStorage(`semestra-${year}-workedHolidays`, []);

  function thereAreDaysLeftOff() {
    return numVacationDaysLeft() > 0;
  }

  function numVacationDaysLeft() {
    return numVacationDays - vacationDays.length + workedHolidays.length;
  }

  function toggleDayOff(mmdd) {
    if (vacationDays.includes(mmdd)) {
      setVacationDays(vacationDays.filter(day => day !== mmdd));
    } else if (thereAreDaysLeftOff()) {
      setVacationDays([...vacationDays, mmdd]);
    }
  }

  function toggleWorkedHoliday(mmdd) {
    if (workedHolidays.includes(mmdd)) {
      if (!thereAreDaysLeftOff()) { return; }
      setWorkedHolidays(workedHolidays.filter(day => day !== mmdd));
    } else {
      setWorkedHolidays([...workedHolidays, mmdd]);
    }
  }
  
  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: 'right' }}>
        <VacationMeter vacationDaysLeft={numVacationDaysLeft()} />
      </div>
      <h2>{year}</h2>
      <Year
        year={year}
        holidays={holidays[`${year}`]['boston']}
        toggleDayOff={toggleDayOff}
        toggleWorkedHoliday={toggleWorkedHoliday}
        vacationDays={vacationDays}
        workedHolidays={workedHolidays}
      />
    </Wrapper>
  );
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default App;
