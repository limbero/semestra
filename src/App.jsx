import React, { useState } from 'react';
import styled from 'styled-components';

import holidays from './data/holidays';

import Spreads from './util/Spreads';

import Year from './calendar/Year';
import VacationMeter from './ui/VacationMeter';


const Wrapper = styled.div`
  margin: 0 auto;
  width: 70vw;
  max-width: 900px;
  min-width: 600px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const Title = styled.h1`
  font-family: monospace;
  font-size: 4rem;
  margin: 1rem 0;
`;

const YearNav = styled.nav`
  margin: 20px 0;
`;

const YearBtn = styled.button`
  background: none;
  border: none;

  padding: 5px;
  margin: 0 15px;

  font-size: 1.5rem;
  font-weight: bold;
  color: var(--inactive);

  border-radius: 3px;

  &:disabled {
    color: var(--text-color);
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
    background-color: #FD4;
  }
`;

function YearButton(props) {
  return (
    <YearBtn
      disabled={props.year === props.currentYear}
      onClick={() => props.setYear(props.year)}
    >
      {props.year}
    </YearBtn>
  );
}

function App() {
  const years = [2019, 2020];
  const [activeYear, setYear] = useLocalStorage('semestra-year', 2019);

  const empty = {};
  years.forEach(year => empty[`${year}`] = []);

  const numVacationDays = 23;
  const [vacationDays, setVacationDays] = useLocalStorage('semestra-vacationDays', empty);
  const [workedHolidays, setWorkedHolidays] = useLocalStorage('semestra-workedHolidays', empty);

  function thereAreDaysLeftOff() {
    return numVacationDaysLeft() > 0;
  }

  function numVacationDaysLeft() {
    return numVacationDays - vacationDays[activeYear].length + workedHolidays[activeYear].length;
  }

  function toggleDayOff(mmdd) {
    if (vacationDays[activeYear].includes(mmdd)) {
      setVacationDays({
        ...vacationDays,
        [activeYear]: Spreads.removeFromArray(vacationDays[activeYear], mmdd)
      });
    } else if (thereAreDaysLeftOff()) {
      setVacationDays({
        ...vacationDays,
        [activeYear]: Spreads.addToArray(vacationDays[activeYear], mmdd)
      });
    }
  }

  function toggleWorkedHoliday(mmdd) {
    if (workedHolidays[activeYear].includes(mmdd)) {
      if (!thereAreDaysLeftOff()) { return; }
      setWorkedHolidays({
        ...workedHolidays,
        [activeYear]: Spreads.removeFromArray(workedHolidays[activeYear], mmdd)
      });
    } else {
      setWorkedHolidays({
        ...workedHolidays,
        [activeYear]: Spreads.addToArray(workedHolidays[activeYear], mmdd)
      });
    }
  }
  
  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: 'right' }}>
        <VacationMeter vacationDaysLeft={numVacationDaysLeft()} numVacationDays={numVacationDays} />
      </div>
      <YearNav>
        {
          years.map(year => (
            <YearButton year={year} currentYear={activeYear} setYear={setYear} />
          ))
        }
      </YearNav>
      <Year
        year={activeYear}
        holidays={holidays[`${activeYear}`]['boston']}
        toggleDayOff={toggleDayOff}
        toggleWorkedHoliday={toggleWorkedHoliday}
        vacationDays={vacationDays[activeYear] || []}
        workedHolidays={workedHolidays[activeYear] || []}
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
