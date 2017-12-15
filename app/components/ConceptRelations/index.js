import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router'

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

// const Timeline = styled.div`
//   width: 100%;
//   margin-top: 0.75em;
//   position: absolute;
//   border-bottom-style: solid;
//   border-bottom-color: black;
//   border-bottom-width: 2px;
// `

// const Year = styled.span`
//   position: absolute;
//   background-color: white;
//   border-radius: 5px;
//   border-width: 2px;
//   border-style: solid;
// `

function hasRelations (object) {
  return object.relations.length
}

// <span>{feature.properties.validSince} - {feature.properties.validUntil}</span>
function ConceptRelations (props) {
  // let relations

  // relations = props.concept.properties.data.objects
  //   .filter((object) => object.relations)
  //   .filter((object) => Object.keys(object.relations.outgoing))

  //   .reduce((relations, object) => relations.concat(object.relations), [])
  //   .filter((relation) => relation.type !== 'st:sameAs')

  // if (!relations || !relations.length) {
  //   return null
  // }


//   const validSince = props.concept && props.concept.properties && props.concept.properties.validSince
//   const validUntil = props.concept && props.concept.properties && props.concept.properties.validUntil

//   if (!validSince && !validUntil) {
//     return null
//   }

//   const minYear = 1700
//   const maxYear = 2016

//   const validSinceYear = parseInt(validSince)
//   const validUntilYear = parseInt(validUntil)



//   const left = Math.round((validSinceYear - minYear) / (maxYear - minYear) * 100)

// // validSince
// // :
// // 1939
// // validUntil
// // :
// // 1939

// // getFullYear()

  return (
    <List>
      {props.concept.properties.data.objects
        .filter(hasRelations)
        .map((object) => (
          <li key={object.id}>
            <List>
              {object.relations
                .filter((relation) => relation.direction === 'out')
                .slice(0, 10)
                .map((relation, index) => {
                  let title
                  if (relation.objectName) {
                    title = relation.objectName
                  } else {
                    title = <code>{relation.id}</code>
                  }

                  return (
                    <li key={index}>
                      <code>{relation.type}</code>
                      <span> </span>
                      <Link to={relation.id}>{title}</Link>
                    </li>
                  )
                })
              }
            </List>
          </li>
        ))
      }
    </List>
  )
}

export default ConceptRelations
