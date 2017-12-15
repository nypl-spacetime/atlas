 /* global __CONFIG__ */

import {
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SET_PANE_INDEX,
  SET_PANE_MODE,
  SET_ERROR,
  UPDATE_FILTER,
  RESET_FILTER,
  CLEAR_SINGLE_OBJECT,
  GET_SINGLE_OBJECT_SUCCESS,
  SET_SELECTED_CONCEPT_ID
} from './constants'
import { fromJS } from 'immutable'

// Initial state
const initialState = fromJS({
  hasTouch: 'ontouchstart' in window,
  filters: fromJS(initialFilters()),
  panes: fromJS({
    index: 0,
    mode: 'split' // 'single' or 'split'
  }),
  selectedConceptId: undefined,
  singleObject: undefined,
  searchResults: emptyFeatureCollection(),
  searchResultsLoaded: false,
  dataReceivedTimestamp: undefined,
  searchParams: fromJS({}),
  config: fromJS(__CONFIG__),
  error: undefined
})

function initialFilters (filter) {
  const filters = {
    id: '',
    name: '',
    geometry: '',
    'geometry-operation': 'intersects', // 'contains' or 'intersects'
    before: (new Date()).getFullYear(),
    after: 1600,
    types: {
      'st:Photo': true,
      'st:Map': true,
      'st:Address': true,
      'st:Building': true,
      'st:Street': true,
      'st:Church': true,
      'st:EnumerationDistrict': true,
      'st:Ward': true,
      // 'st:Person': true,
      'st:Document': true
    }
  }

  if (filter) {
    return filters[filter]
  }

  return filters
}

function emptyFeatureCollection () {
  return fromJS({
    type: 'FeatureCollection',
    features: []
  })
}

function getTimestamp () {
  return new Date().getTime()
}

function appReducer (state = initialState, action) {
console.log(action.type)
  switch (action.type) {
    case UPDATE_FILTER:
      return state
        .setIn(['filters', action.filter], fromJS(action.data))
    case RESET_FILTER:
      console.log(RESET_FILTER, action)
      return state
        .setIn(['filters', action.filter], fromJS(initialFilters(action.filter)))
    case SET_PANE_INDEX:
      return state
        .setIn(['panes', 'index'], action.index)
    case SET_PANE_MODE:
      return state
        .setIn(['panes', 'mode'], action.mode)
    case SET_SELECTED_CONCEPT_ID:
      return state
        .set('selectedConceptId', action.conceptId)
    case CLEAR_SINGLE_OBJECT:
      return state
        .set('singleObject', undefined)
    case GET_SINGLE_OBJECT_SUCCESS:
      return state
        .set('dataReceivedTimestamp', getTimestamp())
        .set('singleObject', fromJS(action.data))
    case SEARCH_SUCCESS:
      return state
        .set('dataReceivedTimestamp', getTimestamp())
        .set('searchResults', fromJS(action.data))
    case SEARCH_ERROR:
      if (action.error.status === 404) {
        return state
          .set('dataReceivedTimestamp', getTimestamp())
          .set('searchResults', emptyFeatureCollection())
      } else {
        return state
          .set('error', {
            type: action.type,
            message: 'Error!',
            error: action.error
          })
      }
    default:
      return state
  }
}

export default appReducer
