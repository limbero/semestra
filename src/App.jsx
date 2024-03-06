import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import DownloadLink from "react-download-link";

import DownloadIcon from './icons/download.svg?react';
import UploadIcon from './icons/upload.svg?react';

import countries_states from "./data/countries_states";

import Spreads from "./util/Spreads";

import Year from "./calendar/Year";
import VacationMeter from "./ui/VacationMeter";
import CustomUploadButton from "./ui/CustomUploadButton";
import DateUtil from "./util/DateUtil";
import { getFlagEmoji } from "./util/Flags";

const thisYear = (new Date()).getFullYear();
const years = [(thisYear - 1), thisYear, (thisYear + 1)];
const months = DateUtil.months();
const monthsOptions = Object.entries(months).map(([monthNum, monthName]) => ({
  value: monthNum,
  label: monthName,
}));

function App() {
  const [startMonth, setStartMonth] = useLocalStorage('semestra-startmonth', 1);
  const preSelectedMonth = monthsOptions[startMonth - 1];

  const [activeYear, setYear] = useLocalStorage('semestra-year', thisYear);
  const textYears = startMonth === 1
    ? years.map(year => year.toString())
    : years.map(year => `${year.toString().slice(2)}/${(year + 1).toString().slice(2)}`);

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useLocalStorage("semestra-country", "SE");
  const [subdivision, setSubdivision] = useLocalStorage("semestra-subdivision", null);
  const location = country + (subdivision ? `-${subdivision}` : "");

  const [holidays, setHolidays] = useState([]);
  let filteredHolidays = holidays.filter(holiday => holiday.global);

  const countriesOptions = countries.map(country => ({
    value: country.countryCode,
    label: `${getFlagEmoji(country.countryCode)} ${country.name}`,
  }));
  const preSelectedCountry = countriesOptions.find(option => option.value === country);

  const shouldShowSubdivisions = holidays.filter(holiday => holiday.global === false).length > 0;
  let subdivisions = [];
  let subdivisionsOptions = [];
  let preSelectedSubdivision = null;
  if (shouldShowSubdivisions) {
    subdivisions = countries_states.find(cs => cs.iso2 === country).states;
    if (country === "GB") {
      subdivisions = subdivisions.filter(subdivision => ["England", "Northern Ireland", "Scotland", "Wales"].includes(subdivision.name));
    }
    subdivisionsOptions = subdivisions.map(subdivision => ({
      value: subdivision.state_code,
      label: subdivision.name,
    }));
    preSelectedSubdivision = subdivisionsOptions.find(option => option.value === subdivision);

    if (subdivision) {
      filteredHolidays = holidays.filter(holiday => {
        return holiday.global || holiday.counties.includes(location);
      });
    }
  }
  const holidaysObject = {};
  filteredHolidays.forEach(holiday => {
    holidaysObject[holiday.date] = holiday.localName;
  });

  useEffect(() => {
    fetch("https://date.nager.at/api/v3/AvailableCountries")
      .then(res => res.json())
      .then(countriesResponse => setCountries(countriesResponse));
  }, []);

  useEffect(() => {
    initializeNumVacationDays(activeYear, location, 25);
    initializeVacationDays(activeYear, location);
    initializeWorkedHolidays(activeYear, location);

    const thisYearsHolidays = fetch(`https://date.nager.at/api/v3/PublicHolidays/${activeYear}/${country}`).then(res => res.json());
    const nextYearsHolidays = fetch(`https://date.nager.at/api/v3/PublicHolidays/${activeYear + 1}/${country}`).then(res => res.json());
    Promise.all([thisYearsHolidays, nextYearsHolidays])
      .then(holidaysResponses => {
        setHolidays(holidaysResponses.flat());
      })
  }, [activeYear, location]);

  const [numVacationDays, setNumVacationDays] = useLocalStorage(
    "semestra-vacationAllotment",
    {}
  );
  const [vacationDays, setVacationDays] = useLocalStorage(
    "semestra-vacationDays",
    {}
  );
  const [workedHolidays, setWorkedHolidays] = useLocalStorage(
    "semestra-workedHolidays",
    {}
  );

  function initializeNumVacationDays(y, loc, n = 25) {
    let tempNumVacationDays = { ...numVacationDays };
    if (!tempNumVacationDays?.[y]) {
      tempNumVacationDays[y] = {
        [loc]: n,
      };
    }
    if (!tempNumVacationDays?.[y]?.[loc]) {
      tempNumVacationDays[y][loc] = n;
    }
    setNumVacationDays(tempNumVacationDays);
  }

  function initializeVacationDays(y, loc) {
    let tempVacationDays = { ...vacationDays };
    if (!tempVacationDays?.[loc]) {
      tempVacationDays[loc] = [];
    }
    setVacationDays(tempVacationDays);
  }

  function initializeWorkedHolidays(y, loc) {
    let tempWorkedHolidays = { ...workedHolidays };
    if (!tempWorkedHolidays?.[loc]) {
      tempWorkedHolidays[loc] = [];
    }
    setWorkedHolidays(tempWorkedHolidays);
  }

  function changeNumVacationDays(newNum) {
    if (thereAreDaysLeftOff(newNum) + 1) {
      setNumVacationDays({
        ...numVacationDays,
        [activeYear]: {
          ...numVacationDays[activeYear],
          [location]: newNum,
        },
      });
    }
  }

  function addNumVacationDays(num) {
    changeNumVacationDays(numVacationDays[activeYear][location] + num);
  }

  function thereAreDaysLeftOff(from = numVacationDays?.[activeYear]?.[location]) {
    return numVacationDaysLeft(from) > 0;
  }

  function getDaysForTwelveMonthSpan(days) {
    let start = 0;
    let startSet = false;
    let stop = days.length;

    const activeYearString = activeYear.toString();
    const nextYearString = (activeYear + 1).toString();
    const startMonthString = String(startMonth).padStart(2, "0");
    for (let idx = 0; idx < days.length; idx++) {
      if (
        !startSet
        && days[idx].slice(0, 4) === activeYearString
        && days[idx].slice(5, 7) === startMonthString
      ) {
        startSet = true;
        start = idx;
      }
      if (
        days[idx].slice(0, 4) === nextYearString
        && days[idx].slice(5, 7) === startMonthString
      ) {
        stop = idx;
        break;
      }
    }
    return days.slice(start, stop);
  }

  function numVacationDaysLeft(from = numVacationDays?.[activeYear]?.[location]) {
    const twelveMonthVacationDays = getDaysForTwelveMonthSpan(vacationDays?.[location]);
    const twelveMonthWorkedHolidays = getDaysForTwelveMonthSpan(workedHolidays?.[location]);

    return (
      from -
      twelveMonthVacationDays.length +
      twelveMonthWorkedHolidays.length
    );
  }

  function toggleDayOff(yyyymmdd) {
    if (vacationDays[location].includes(yyyymmdd)) {
      setVacationDaysHelper(
        Spreads.removeFromArray(vacationDays[location], yyyymmdd).slice().sort()
      );
    } else if (thereAreDaysLeftOff()) {
      setVacationDaysHelper(
        Spreads.addToArray(vacationDays[location], yyyymmdd).slice().sort()
      );
    }
  }

  function setVacationDaysHelper(days) {
    doFunctionForNestedState(
      vacationDays,
      setVacationDays,
      location,
      days
    );
  }

  function setWorkedHolidaysHelper(days) {
    doFunctionForNestedState(
      workedHolidays,
      setWorkedHolidays,
      location,
      days
    );
  }

  function doFunctionForNestedState(obj, fun, loc, days) {
    fun({
      ...obj,
      [loc]: days,
    });
  }

  function toggleWorkedHoliday(yyyymmdd) {
    if (workedHolidays[location].includes(yyyymmdd)) {
      if (!thereAreDaysLeftOff()) {
        return;
      }
      setWorkedHolidaysHelper(
        Spreads.removeFromArray(workedHolidays[location], yyyymmdd)
      );
    } else {
      setWorkedHolidaysHelper(
        Spreads.addToArray(workedHolidays[location], yyyymmdd)
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
      {countries.length === 0 ? null : (
        <>
          <div style={{ textAlign: "right" }}>
            <VacationMeter
              vacationDaysLeft={numVacationDaysLeft()}
              numVacationDays={numVacationDays?.[activeYear]?.[location]}
              addNumVacationDays={addNumVacationDays}
            />
          </div>
          <Flex style={{ margin: "20px 0" }}>
            <nav>
              {years.map((year, ydx) => (
                <PickerButton
                  key={year}
                  value={year}
                  currentlyPicked={activeYear}
                  pick={setYear}
                >
                  {textYears[ydx]}
                </PickerButton>
              ))}
            </nav>
            <div style={{ width: "25%", color: "#000" }}>
              <Select
                defaultValue={preSelectedMonth}
                onChange={(e) => { setStartMonth(Number(e.value)); }}
                options={monthsOptions}
              />
            </div>
          </Flex>
          <Flex style={{ margin: "20px 0" }}>
            <Flex style={{ width: "50%", color: "#000" }}>
              <div style={{ width: "48%" }}>
                <Select
                  defaultValue={preSelectedCountry}
                  onChange={(e) => { setCountry(e.value); setSubdivision(null); }}
                  options={countriesOptions}
                />
              </div>
              {
                shouldShowSubdivisions ? (
                  <div style={{ width: "48%" }}>
                    <Select
                      defaultValue={preSelectedSubdivision}
                      onChange={(e) => { setSubdivision(e.value) }}
                      options={subdivisionsOptions}
                    />
                  </div>
                ) : null
              }
            </Flex>
            <div>
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
            </div>
          </Flex>
          {Object.keys(filteredHolidays).length === 0 ? null : (
            <Year
              year={activeYear}
              startMonth={startMonth}
              holidays={holidaysObject}
              toggleDayOff={toggleDayOff}
              toggleWorkedHoliday={toggleWorkedHoliday}
              vacationDays={vacationDays?.[location] || []}
              workedHolidays={workedHolidays?.[location] || []}
            />
          )}
        </>
      )}
      <p>
        Proudly by <a href="https://github.com/limbero">@limbero</a> with lots of help from{
        } <a href="https://github.com/hughrawlinson">@hughrawlinson</a>.
      </p>
    </Wrapper>
  );
}


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

const Title = styled.h1`
  font-family: monospace;
  font-size: 4rem;
  margin: 1rem 0;
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

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = JSON.parse(window.localStorage.getItem(key));
      if (item) {
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
