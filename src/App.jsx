import React, { useState } from "react";
import styled from "styled-components";
import DownloadLink from "react-download-link";

import { ReactComponent as DownloadIcon } from "./icons/download.svg";
import { ReactComponent as UploadIcon } from "./icons/upload.svg";

import holidays from "./data/holidays";
import vacation_allotment from "./data/vacation_allotment";

import Spreads from "./util/Spreads";

import Year from "./calendar/Year";
import VacationMeter from "./ui/VacationMeter";
import CustomUploadButton from "./ui/CustomUploadButton";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80vw;
  max-width: 1000px;
  min-width: 600px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IOControls = styled.div`
  margin: 20px 0;
`;

const Title = styled.h1`
  font-family: monospace;
  font-size: 4rem;
  margin: 1rem 0;
`;

const Picker = styled.nav`
  margin: 20px 0;
`;

const SvgBtn = styled.button`
  background: #eee;
  border: none;

  stroke: #000;

  padding: 5px 5px 0;
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

  &:last-child {
    margin-inline-end: 0;
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }

  &:not(:disabled):not(:active):not(:focus):hover {
    stroke: #fd4;
  }
  &:active,
  &:focus {
    outline: none;
    stroke: #000;
    background-color: #fd4;
  }
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
    color: #fd4;
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
    color: #000;
    background-color: #fd4;
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

const years = ["2019", "2020"];
const locations = ["boston", "uk", "sweden", "nyc"];
function yearsInLocs(thing) {
  const obj = {};
  locations.forEach((loc) => {
    obj[loc] = {};
    years.forEach((yr) => {
      obj[loc][yr] = thing;
    });
  });
  return obj;
}

const schemaShapes = {
  "semestra-year": 5,
  "semestra-location": "someplace",
  "semestra-vacationAllotment": yearsInLocs(5),
  "semestra-vacationDays": yearsInLocs([]),
  "semestra-workedHolidays": yearsInLocs([]),
};

function App() {
  const years = [2019, 2020];
  const [activeYear, setYear] = useLocalStorage("semestra-year", 2019);

  const [location, setLocation] = useLocalStorage(
    "semestra-location",
    "boston"
  );

  function empty(filler) {
    const empty = {};
    locations.forEach((loc) => {
      empty[loc] = {};
      years.forEach((year) => {
        let val = filler;
        if (typeof filler === "function") {
          val = filler(loc, year);
        }
        empty[loc][`${year}`] = val;
      });
    });
    return empty;
  }

  const [numVacationDays, setNumVacationDays] = useLocalStorage(
    "semestra-vacationAllotment",
    empty((loc, yr) => vacation_allotment[loc])
  );
  const [vacationDays, setVacationDays] = useLocalStorage(
    "semestra-vacationDays",
    empty([])
  );
  const [workedHolidays, setWorkedHolidays] = useLocalStorage(
    "semestra-workedHolidays",
    empty([])
  );

  function changeNumVacationDays(newNum) {
    if (thereAreDaysLeftOff(newNum) + 1) {
      setNumVacationDays({
        ...numVacationDays,
        [location]: {
          ...numVacationDays[location],
          [activeYear]: newNum,
        },
      });
    }
  }

  function addNumVacationDays(num) {
    changeNumVacationDays(numVacationDays[location][activeYear] + num);
  }

  function thereAreDaysLeftOff(from = numVacationDays[location][activeYear]) {
    return numVacationDaysLeft(from) > 0;
  }

  function numVacationDaysLeft(from = numVacationDays[location][activeYear]) {
    return (
      from -
      vacationDays[location][activeYear].length +
      workedHolidays[location][activeYear].length
    );
  }

  function toggleDayOff(mmdd) {
    if (vacationDays[location][activeYear].includes(mmdd)) {
      setVacationDaysHelper(
        Spreads.removeFromArray(vacationDays[location][activeYear], mmdd)
      );
    } else if (thereAreDaysLeftOff()) {
      setVacationDaysHelper(
        Spreads.addToArray(vacationDays[location][activeYear], mmdd)
      );
    }
  }

  function setVacationDaysHelper(days) {
    doFunctionForNestedState(
      vacationDays,
      setVacationDays,
      location,
      activeYear,
      days
    );
  }

  function setWorkedHolidaysHelper(days) {
    doFunctionForNestedState(
      workedHolidays,
      setWorkedHolidays,
      location,
      activeYear,
      days
    );
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
      if (!thereAreDaysLeftOff()) {
        return;
      }
      setWorkedHolidaysHelper(
        Spreads.removeFromArray(workedHolidays[location][activeYear], mmdd)
      );
    } else {
      setWorkedHolidaysHelper(
        Spreads.addToArray(workedHolidays[location][activeYear], mmdd)
      );
    }
  }

  function handleStateUpload(event) {
    // User cancelled
    if (!event.target.files[0]) {
      return;
    }
    let reader = new FileReader();
    reader.onerror = (error) => {
      alert(error);
    };
    reader.onload = (data) => {
      const uploadedState = JSON.parse(data.target.result);
      setNumVacationDays(uploadedState.numVacationDays);
      setVacationDays(uploadedState.vacationDays);
      setWorkedHolidays(uploadedState.workedHolidays);
    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: "right" }}>
        <VacationMeter
          vacationDaysLeft={numVacationDaysLeft()}
          numVacationDays={numVacationDays[location][activeYear]}
          addNumVacationDays={addNumVacationDays}
        />
      </div>
      <Picker>
        {years.map((year) => (
          <PickerButton
            key={year}
            value={year}
            currentlyPicked={activeYear}
            pick={setYear}
          >
            {year}
          </PickerButton>
        ))}
      </Picker>
      <Flex>
        <Picker>
          {locations.map((loc) => (
            <PickerButton
              key={loc}
              value={loc}
              currentlyPicked={location}
              pick={setLocation}
            >
              <img
                alt={loc}
                style={{ display: "block" }}
                height={32}
                src={`/icons/${loc}.png`}
              />
            </PickerButton>
          ))}
        </Picker>
        <IOControls>
          <CustomUploadButton
            onChange={handleStateUpload}
            name={"uploadButton"}
          >
            <UploadIcon height="32" />
          </CustomUploadButton>
          <DownloadLink
            filename="semestra-vacation-plans.json"
            exportFile={() =>
              JSON.stringify(
                { numVacationDays, vacationDays, workedHolidays },
                null,
                2
              )
            }
            label={
              <SvgBtn
                type="button"
                name="downloadInput"
                alt="Download"
                title="Download"
              >
                <DownloadIcon height="32" />
              </SvgBtn>
            }
          />
        </IOControls>
      </Flex>
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

function shapeMatches(obj, match) {
  if (!obj) {
    return true;
  } else if (typeof obj !== typeof match) {
    return false;
  } else if (Array.isArray(obj)) {
    if (!Array.isArray(match)) {
      return false;
    }
    for (let i = 0; i < match.length; i++) {
      if (!shapeMatches(obj[i], match[i])) {
        return false;
      }
    }
  } else if (typeof obj === "object") {
    const oks = Object.keys(obj);
    const mks = Object.keys(obj);

    if (oks.length > mks.length) {
      return false;
    }
    for (let k = 0; k < oks.length; k++) {
      if (!mks.includes(oks[k])) {
        return false;
      } else {
        return shapeMatches(obj[oks[k]], match[mks[k]]);
      }
    }
  }
  return true;
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = JSON.parse(window.localStorage.getItem(key));
      if (item && shapeMatches(item, schemaShapes[key])) {
        return item;
      } else {
        return initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
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
