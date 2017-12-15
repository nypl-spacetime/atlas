import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectError,
  selectSearchResults,
  selectSearchParams
} from 'containers/App/selectors'

import Error from 'containers/Error'
import SearchControls from 'containers/SearchControls'
import SearchResults from 'containers/SearchResults'

import { Container } from './styles'

export class SearchPane extends React.Component {

  render () {
    let mainContent

    if (this.props.error) {
      mainContent = (
        <Error />
      )
    } else {
      mainContent = (
        <Container>
          <SearchControls params={this.props.searchParams} />
          <SearchResults results={this.props.searchResults} />
        </Container>
      )
    }

    return mainContent
  }

}

export default connect(createSelector(
  selectError(),
  selectSearchResults(),
  selectSearchParams(),
  (error, searchResults, searchParams) => ({
    error, searchResults, searchParams
  })
))(SearchPane)
