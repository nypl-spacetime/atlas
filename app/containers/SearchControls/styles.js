/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding

export const Form = styled.form`
  padding: ${padding};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Filter = styled.div`
  padding: ${padding};
`

export const Controls = styled.div`
  padding: ${padding};

  & > * {
    width: 100%;
  }
`

export const Types = styled.fieldset`
  padding: 0;

  & > div {
    columns: 3;
  }
`

export const Labeled = styled.div`
  & > label {
    margin-left: 0.5em;
  }

  margin-right: 1em;
`