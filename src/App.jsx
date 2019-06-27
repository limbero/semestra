import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Year from './calendar/Year';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70vw;
  max-width: 900px;
  min-width: 600px;
`;

function App() {
  let year = 2019;

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
      <h2>{year}</h2>
      <Year year={year} holidays={holidays} />
    </Wrapper>
  );
}

export default App;
