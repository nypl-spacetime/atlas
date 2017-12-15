import React from 'react'

import styled from 'styled-components'

const Underlined = styled.button`
  text-decoration: underline;
`

function ResetFilter (props) {
  return <Underlined type='button' onClick={props.onClick}>Reset</Underlined>
}

export default ResetFilter
