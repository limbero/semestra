import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

  const vacationDays = 23;
  const [vacationDaysLeft, setVacationDaysLeft] = useState(vacationDays);

  const useVacationDays = (number) => {
    if (vacationDaysLeft >= number) {
      setVacationDaysLeft(vacationDaysLeft - number);
      return true;
    } else {
      return false;
    }
  };

  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        `/data/${year}/holidays_boston.json`,
      ).then(res => res.json()).catch(err => { return {}; });
      console.log(result);
      setHolidays(result);
    }
    fetchData();
  }, [year]);
  
  return (
    <Wrapper>
      <Title>semestra</Title>
      <div style={{ textAlign: 'right' }}>
        <VacationMeter vacationDaysLeft={vacationDaysLeft} />
      </div>
      <h2>{year}</h2>
      <Year year={year} holidays={holidays} useVacationDays={useVacationDays} />
    </Wrapper>
  );
}

export default App;
