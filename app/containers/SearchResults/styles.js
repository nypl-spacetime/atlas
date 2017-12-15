/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding

export const List = styled.ul`
  list-style-type: none;
  padding: ${padding};
`

export const Item = styled.li`
  padding: ${padding};
`
