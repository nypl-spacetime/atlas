import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Concept from 'containers/Concept'

import {
  selectSelectedConceptId,
  selectDataReceivedTimestamp
} from 'containers/App/selectors'

import {
  setSelectedConceptId
} from '../App/actions'

import { List, Item } from './styles'

export class SearchResults extends React.Component {

  itemMouseEnter (feature) {
    const conceptId = feature.properties.id
    this.props.setSelectedConceptId(conceptId)
  }

  itemMouseLeave () {
    this.props.setSelectedConceptId()
  }

  shouldComponentUpdate (nextProps) {
    console.log('Update:', this.props.dataReceivedTimestamp, nextProps.dataReceivedTimestamp)
    // return false
    return this.props.dataReceivedTimestamp !== nextProps.dataReceivedTimestamp
  }

  render () {
    const results = this.props.results
    if (results && results.features && results.features.length) {
      console.log('nu het maken', results.features.length)
      return (
        <List>
          {results.features.map((feature) => (
            <Item key={feature.properties.id} onMouseEnter={this.itemMouseEnter.bind(this, feature)} onMouseLeave={this.itemMouseLeave.bind(this)} >
              <Concept feature={feature} detailed={false} />
            </Item>
          ))}
        </List>
      )
    } else {
      return <span>No results found</span>
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSelectedConceptId: (conceptId) => dispatch(setSelectedConceptId(conceptId)),
    dispatch
  }
}

export default connect(createSelector(
  selectSelectedConceptId(),
  selectDataReceivedTimestamp(),
  (selectedConceptId, dataReceivedTimestamp) => ({
    selectedConceptId, dataReceivedTimestamp
  })
), mapDispatchToProps)(SearchResults)
