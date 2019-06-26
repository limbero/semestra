import React from 'react';
import styled from 'styled-components';

import Year from './calendar/Year';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70vw;
  max-width: 900px;
  min-width: 600px;
`;

function App() {
  const year = 2019;
  
  return (
    <Wrapper>
      <h1>{year}</h1>
      <Year year={year} />
    </Wrapper>
  );
}

export default App;
