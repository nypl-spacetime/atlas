import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { findDOMNode } from 'react-dom'

import {
  selectSingleObject,
  selectSearchResults,
  selectPaneMode,
  selectPaneIndex,
  selectSelectedConceptId,
  selectDataReceivedTimestamp
} from 'containers/App/selectors'

import {
  search,
  updateFilter
} from '../App/actions'

import { roundDecimals } from 'utils/utils'

import { Map } from './styles'

const OPACITY = {
  muted: 0.1,
  default: 0.5,
  selected: 1
}

export class MapPane extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      mapLoaded: false
    }
  }

  makeTypeIdFilter (type, id) {
    return[
      'all',
      [type === 'Point' ? '==' : '!=', '$type', 'Point'],
      ['==', 'id', id || '']
    ]
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.dataReceivedTimestamp !== nextProps.dataReceivedTimestamp) {
      if (this.state.mapLoaded) {
        this.map.getSource('spacetime').setData(nextProps.searchResults)
console.log('KAZEN')
        if (this.props.paneMode !== nextProps.paneMode || this.props.paneIndex !== nextProps.paneIndex) {
          window.setTimeout(() => this.map.resize(), 300)
        }
      }
    }

    // nextProps.selectedConceptId
    // htis.props.selectedConceptId
    if (this.props.selectedConceptId !== nextProps.selectedConceptId) {
      if (nextProps.selectedConceptId) {
        console.log('Vlezen')
        this.map.setFilter('spacetime-lines-selected', this.makeTypeIdFilter('LineString', nextProps.selectedConceptId))
        this.map.setFilter('spacetime-points-selected', this.makeTypeIdFilter('Point', nextProps.selectedConceptId))

        this.map.setPaintProperty('spacetime-lines', 'line-opacity', OPACITY.muted)
        this.map.setPaintProperty('spacetime-points', 'circle-opacity', OPACITY.muted)

      } else {
        console.log('beren')
        this.map.setFilter('spacetime-lines-selected', this.makeTypeIdFilter('LineString'))
        this.map.setFilter('spacetime-points-selected', this.makeTypeIdFilter('Point'))

        this.map.setPaintProperty('spacetime-lines', 'line-opacity', OPACITY.default)
        this.map.setPaintProperty('spacetime-points', 'circle-opacity', OPACITY.default)
      }
    }
  }

  render () {
    return (
      <Map ref='map'/>
    )
  }

  componentDidMount () {
    const node = findDOMNode(this.refs.map)

    // TODO: read from config

    mapboxgl.accessToken = 'pk.eyJ1IjoibnlwbGxhYnMiLCJhIjoiSFVmbFM0YyJ9.sl0CRaO71he1XMf_362FZQ'

    const map = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/nypllabs/cj2gmix25005o2rpapartqm07',
      center: [-73.98579, 40.71571],
      zoom: 14,
      dragRotate: false,
      pitchWithRotate: false
    })

    this.map = map

    map.on('load', this.onMapLoad.bind(this))
    map.on('moveend', this.onMapMoveEnd.bind(this))
  }

  onMapLoad () {
    this.map.addSource('spacetime', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

    this.map.addLayer({
      id: 'spacetime-lines',
      source: 'spacetime',
      type: 'line',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': __CONFIG__.cssVariables.colors.main,
        'line-opacity': OPACITY.default,
        'line-width': 2
      },
      filter: ['!=', '$type', 'Point']
    })

    this.map.addLayer({
      id: 'spacetime-lines-selected',
      source: 'spacetime',
      type: 'line',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': __CONFIG__.cssVariables.colors.main,
        'line-opacity': OPACITY.selected,
        'line-width': 5
      },
      filter: this.makeTypeIdFilter('LineString')
    })

    this.map.addLayer({
      id: 'spacetime-points',
      source: 'spacetime',
      type: 'circle',
      paint: {
        'circle-color': __CONFIG__.cssVariables.colors.main,
        'circle-radius': 7,
        'circle-opacity': OPACITY.default
      },
      filter: ['==', '$type', 'Point']
    })

    this.map.addLayer({
      id: 'spacetime-points-selected',
      source: 'spacetime',
      type: 'circle',
      paint: {
        'circle-color': __CONFIG__.cssVariables.colors.main,
        'circle-radius': 12,
        'circle-opacity': OPACITY.selected
      },
      filter: this.makeTypeIdFilter('Point')
    })

    this.setState({
      mapLoaded: true
    })
  }

  onMapMoveEnd () {
    if (!this.props.singleObject) {
      const bounds = this.map.getBounds().toArray()
      const boundsStr = [
        bounds[0][0],
        bounds[1][1],
        bounds[1][0],
        bounds[0][1]
      ].map((coordinate) => roundDecimals(coordinate, 6)).join(',')

      this.props.updateFilter('geometry', boundsStr)
      this.props.search()
    }
  }

}

function mapDispatchToProps (dispatch) {
  return {
    search: (params) => dispatch(search(params)),
    updateFilter: (filter, data) => dispatch(updateFilter(filter, data)),
    dispatch
  }
}

export default connect(createSelector(
  selectSearchResults(),
  selectPaneMode(),
  selectPaneIndex(),
  selectSingleObject(),
  selectSelectedConceptId(),
  selectDataReceivedTimestamp(),
  (searchResults, paneMode, paneIndex, singleObject, selectedConceptId, dataReceivedTimestamp) => ({
    searchResults, paneMode, paneIndex, singleObject, selectedConceptId, dataReceivedTimestamp
  })
), mapDispatchToProps)(MapPane)
