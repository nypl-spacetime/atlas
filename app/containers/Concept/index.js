// title
// year

// dataset/type-specific renderer

// concept consists of n objects:
// /---\
// | 1 |
// \___/
//   |
// /---\
// | 2 |
// \___/
//   |
// /---\
// | n |
// \___/
// for each object: renderer, per dataset

// show data
// source
// report error

// “”

// knop: show only this!

// filter using this item
//   - year
//   - location

// show relaties
//  - (maak in etl-building-inspector (en andere): relatie met st:Map!!)
//  - knop: laat deze ook zien!

import React from 'react'

import ConceptPeriod from 'components/ConceptPeriod'
import ConceptRelations from 'components/ConceptRelations'
import ConceptIDs from 'components/ConceptIDs'

const ObjectRenderers = {}
function requireAll (r) {
  r.keys().forEach((filename) => {
    const dataset = filename.match(/\/(.*)\.js$/)[1]
    if (r(filename).default) {
      ObjectRenderers[dataset] = r(filename).default
    }
  })
}
requireAll(require.context('object-renderers/', false, /\.js$/))

import { typeToText } from 'utils/utils'

import { Heading, Objects, ConceptObject, Name, ID, Type, Period } from './styles'

// show data
// show relations, for each relation, find object
// find items - close by, inside

export class Concept extends React.Component {
  render () {
    const feature = this.props.feature

    if (feature) {
      const objectCount = feature.properties.data.objects.length
      let conceptText
      if (objectCount > 1) {
        conceptText = (
          <div>
            Concept consists of {objectCount} objects
          </div>
        )
      }

      let name
      if (feature.properties.name) {
        name = (
          <Name>{feature.properties.name}</Name>
        )
      }

      let period
      if (feature.properties.validSince || feature.properties.validUntil) {
        const years = [feature.properties.validSince, feature.properties.validUntil]
          .filter((date) => date)
          .map((date) => date.slice(0, 4))

        if (years.length === 2 && years[0] == years[1]) {
          period = <Period>{years[0]}</Period>
        } else {
          period = <Period>{years.join(' – ')}</Period>
        }
      }

// ADDDD Datasets

      return (
        <div>
          <Heading>
            <Type>{typeToText(feature.properties.type)}</Type>
            {name}
            {period}
          </Heading>

          <ConceptIDs concept={feature}/>

          <ConceptRelations concept={feature}/>
          <Objects>
          {feature.properties.data.objects.map((object, index) => (
            <ConceptObject key={object.id}>
              <div>

              </div>
              { React.createElement(this.getRenderer(object), {
                object,
                feature
              })}
            </ConceptObject>
          ))}
          </Objects>
        </div>
      )
    } else {
      return null
    }
  }

  getRenderer (object) {
    return ObjectRenderers[object.dataset] || ObjectRenderers.default
  }

}

export default Concept
