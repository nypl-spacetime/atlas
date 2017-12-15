/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding

export const Container = styled.div`
  padding: ${padding};

  & > * {
    padding: ${padding};
  }
`
