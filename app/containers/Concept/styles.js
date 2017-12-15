/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const pageColor = __CONFIG__.cssVariables.pageColor
const headerBackground = __CONFIG__.cssVariables.headerBackground

export const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: ${padding};
  margin-bottom: ${padding};
  border-bottom-style: solid;
  border-bottom-color: ${headerBackground};
`

export const Type = styled.span`
  // font-family: monospace;
  // border-color: ${pageColor};
  background-color: #f9f9f9;
  border-color: #bbb;
  border-width: 1px;
  border-style: solid;
  border-radius: ${padding};
  padding: 3px 5px;
  margin-right: ${padding};
`

export const Period = styled.span`
  margin-left: ${padding};
  flex-grow: 1;
  text-align: right;
  font-weight: bold;
`

export const Name = styled.span`
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline;

  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  margin-right: ${padding};
`

export const ID = styled.div`
  font-family: monospace;
`

export const Objects = styled.ul`
  list-style-type: none;
  padding: 0;
`

export const ConceptObject = styled.li`
  & img {
    width: 100%;
  }
`
