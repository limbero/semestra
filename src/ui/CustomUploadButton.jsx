import React from 'react';
import styled from 'styled-components';

const StyledCustomUploadButton = styled.button`
  & input[type="file"] {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    // alternative to pointer-events, compatible with all browsers, just make it impossible to find
    width: 1px;
    height: 1px;
  }

  background: #EEE;
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

  &:not(:disabled):hover, & label:hover {
    cursor: pointer;
  }

  &:not(:disabled):not(:active):not(:focus):hover {
    stroke: #FD4;
  }
  &:active, &:focus {
    outline: none;
    stroke: #000;
    background-color: #FD4;
  }
`;

function CustomUploadButton({children, onChange, name}) {
  return (
    <StyledCustomUploadButton>
      <label htmlFor={name}>{children}</label>
      <input id={name} type='file' onChange={onChange} accept='application/json'/>
    </StyledCustomUploadButton>
  );
}

export default CustomUploadButton;