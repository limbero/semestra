import React, { useState } from 'react';
import styled from 'styled-components';

import holidays from './data/holidays';
import vacation_allotment from './data/vacation_allotment';

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

const Picker = styled.nav`
  margin: 20px 0;
`;

const PickerBtn = styled.button`
  background: none;
  border: none;

  padding: 5px;
  margin: 0 15px;

  font-size: 1.5rem;
  font-weight: bold;
  color: var(--inactive);

  border-radius: 3px;

  &:disabled {
    background-color: var(--text-color);
    color: var(--background-color);
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

function PickerButton(props) {
  return (
    <PickerBtn
      disabled={props.value === props.currentlyPicked}
      onClick={() => props.pick(props.value)}
    >
      {props.children}
    </PickerBtn>
  );
}

function App() {
  const years = [2019, 2020];
  const [activeYear, setYear] = useLocalStorage('semestra-year', 2019);

  const locations = ['boston', 'uk', 'sweden'];
  const [location, setLocation] = useLocalStorage('semestra-location', 'boston');

  const empty = {};
  locations.forEach(loc => {
    empty[loc] = {};
    years.forEach(year => empty[loc][`${year}`] = []);
  });

  const [numVacationDays, setNumVacationDays] = useLocalStorage('semestra-vacationAllotment', vacation_allotment);
  const [vacationDays, setVacationDays] = useLocalStorage('semestra-vacationDays', empty);
  const [workedHolidays, setWorkedHolidays] = useLocalStorage('semestra-workedHolidays', empty);

  function changeNumVacationDays(newNum) {
    if (thereAreDaysLeftOff(newNum) + 1) {
      setNumVacationDays(
        {
          ...numVacationDays,
          [location]: newNum,
        }
      );
    }
  }

  function addNumVacationDays(num) {
    changeNumVacationDays(numVacationDays[location] + num);
  }

  function thereAreDaysLeftOff(from = numVacationDays[location]) {
    return numVacationDaysLeft(from) > 0;
  }

  function numVacationDaysLeft(from = numVacationDays[location]) {
    return from - vacationDays[location][activeYear].length + workedHolidays[location][activeYear].length;
  }

  function toggleDayOff(mmdd) {
    if (vacationDays[location][activeYear].includes(mmdd)) {
      setVacationDaysHelper(Spreads.removeFromArray(vacationDays[location][activeYear], mmdd));
    } else if (thereAreDaysLeftOff()) {
      setVacationDaysHelper(Spreads.addToArray(vacationDays[location][activeYear], mmdd));
    }
  }

  function setVacationDaysHelper(days) {
    doFunctionForNestedState(vacationDays, setVacationDays, location, activeYear, days);
  }

  function setWorkedHolidaysHelper(days) {
    doFunctionForNestedState(workedHolidays, setWorkedHolidays, location, activeYear, days);
  }

  function doFunctionForNestedState(obj, fun, loc, yr, days) {
    fun({
      ...obj,
      [loc]: {
        ...obj[loc],
        [yr]: days,
      },
    });
  }

  function toggleWorkedHoliday(mmdd) {
    if (workedHolidays[location][activeYear].includes(mmdd)) {
      if (!thereAreDaysLeftOff()) { return; }
      setWorkedHolidaysHelper(
        Spreads.removeFromArray(
          workedHolidays[location][activeYear],
          mmdd
        )
      );
    } else {
      setWorkedHolidaysHelper(
        Spreads.addToArray(
          workedHolidays[location][activeYear],
          mmdd
        )
      );
    }
  }
  
  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: 'right' }}>
        <VacationMeter vacationDaysLeft={numVacationDaysLeft()} numVacationDays={numVacationDays[location]} addNumVacationDays={addNumVacationDays} />
      </div>
      <Picker>
        {
          years.map(year => (
            <PickerButton key={year} value={year} currentlyPicked={activeYear} pick={setYear}>{year}</PickerButton>
          ))
        }
      </Picker>
      <Picker>
        {
          locations.map(loc => (
            <PickerButton key={loc} value={loc} currentlyPicked={location} pick={setLocation}>
              <img alt={loc} style={{display:'block'}} height={32} src={`/icons/${loc}.png`} />
            </PickerButton>
          ))
        }
      </Picker>
      <Year
        year={activeYear}
        holidays={holidays[`${activeYear}`][location]}
        toggleDayOff={toggleDayOff}
        toggleWorkedHoliday={toggleWorkedHoliday}
        vacationDays={vacationDays[location][activeYear] || []}
        workedHolidays={workedHolidays[location][activeYear] || []}
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
