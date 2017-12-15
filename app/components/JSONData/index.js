import React from 'react'
import styled from 'styled-components'

export const Pre = styled.pre`
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
`

function JSONData (props) {
  if (!props.data || Object.keys(props.data).length === 0) {
    return null
  }

  return (
    <Pre><code>{JSON.stringify(props.data, null, 2)}</code></Pre>
  )
}

export default JSONData
