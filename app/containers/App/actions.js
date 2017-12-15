import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  CLEAR_SINGLE_OBJECT,
  GET_SINGLE_OBJECT,
  GET_SINGLE_OBJECT_SUCCESS,
  GET_SINGLE_OBJECT_ERROR,
  SET_SELECTED_CONCEPT_ID,
  UPDATE_FILTER,
  RESET_FILTER,
  SET_PANE_MODE,
  SET_PANE_INDEX,
  SET_ERROR
} from './constants'

export function search () {
  return {
    type: SEARCH
  }
}

export function getSingleObject (datasetId, objectId) {
  return {
    type: GET_SINGLE_OBJECT,
    datasetId,
    objectId
  }
}

export function setSelectedConceptId  (conceptId) {
  return {
    type: SET_SELECTED_CONCEPT_ID,
    conceptId
  }
}

export function clearSingleObject () {
  return {
    type: CLEAR_SINGLE_OBJECT
  }
}

export function updateFilter (filter, data) {
  return {
    type: UPDATE_FILTER,
    filter,
    data
  }
}

export function resetFilter (filter) {
  return {
    type: RESET_FILTER,
    filter
  }
}

export function searchSuccess (data) {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}

export function searchError (error) {
  return {
    type: SEARCH_ERROR,
    error
  }
}

export function getSingleObjectSuccess (data) {
  return {
    type: GET_SINGLE_OBJECT_SUCCESS,
    data
  }
}

export function getSingleObjectError (error) {
  return {
    type: GET_SINGLE_OBJECT_ERROR,
    error
  }
}

export function setPaneMode (mode) {
  return {
    type: SET_PANE_MODE,
    mode
  }
}

export function setPaneIndex (index) {
  return {
    type: SET_PANE_INDEX,
    index
  }
}
