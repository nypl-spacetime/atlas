import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 1.5em;
`

const Timeline = styled.div`
  width: 100%;
  margin-top: 0.75em;
  position: absolute;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 2px;
`

const Year = styled.span`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
`

// <span>{feature.properties.validSince} - {feature.properties.validUntil}</span>
function ConceptPeriod (props) {
  const validSince = props.concept && props.concept.properties && props.concept.properties.validSince
  const validUntil = props.concept && props.concept.properties && props.concept.properties.validUntil

  if (!validSince && !validUntil) {
    return null
  }

  const minYear = 1700
  const maxYear = 2016

  const validSinceYear = parseInt(validSince)
  const validUntilYear = parseInt(validUntil)



  const left = Math.round((validSinceYear - minYear) / (maxYear - minYear) * 100)

// validSince
// :
// 1939
// validUntil
// :
// 1939

// getFullYear()

  return (
    <Container>
      <Timeline />
      <Year style={{left: `${left}%`}}>{validSinceYear}</Year>
    </Container>
  )
}

export default ConceptPeriod
