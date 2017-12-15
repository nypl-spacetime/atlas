import { createSelector } from 'reselect'

const selectGlobal = () => (state) => state.get('global')

const selectHasTouch = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('hasTouch')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const loaded = globalState.get('loaded').toJS()
    return !Object
      .values(loaded)
      .reduce((acc, val) => acc && val, true)
  }
)

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
)

// TODO: selectMapConfig
const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
)

// TODO: selectCssConfig
const selectCSSVariables = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'cssVariables']).toJS()
)

const selectApiConfig = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'api']).toJS()
)

const selectFilters = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('filters').toJS()
)

const selectSelectedConceptId = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedConceptId')
)

const selectDataReceivedTimestamp = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('dataReceivedTimestamp')
)

const selectSingleObject = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const singleObject = globalState.get('singleObject')
    if (singleObject) {
      return singleObject.toJS()
    }
  }
)

const selectSearchResults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('searchResults').toJS()
)

const selectSearchParams = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('searchParams').toJS()
)

const selectPaneMode = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['panes', 'mode'])
)

const selectPaneIndex = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['panes', 'index'])
)

const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectHasTouch,
  selectGlobal,
  selectCSSVariables,
  selectApiConfig,
  selectMapDefaults,
  selectLoading,
  selectError,
  selectSearchResults,
  selectSelectedConceptId,
  selectSingleObject,
  selectSearchParams,
  selectFilters,
  selectPaneMode,
  selectPaneIndex,
  selectDataReceivedTimestamp,
  selectLocationState
}
