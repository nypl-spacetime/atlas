import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { Link } from 'react-router'

import {
  selectSingleObject
} from 'containers/App/selectors'

import Concept from 'containers/Concept'

import { Container } from './styles'

export class SingleObjectPane extends React.Component {

  render () {
    return (
      <Container>
        <div>
          <Link to='/'>Back</Link>
        </div>
        <div>
          <Concept feature={this.props.singleObject} detailed={true} />
        </div>
      </Container>
    )
  }

}

export default connect(createSelector(
  selectSingleObject(),
  (singleObject) => ({
    singleObject
  })
))(SingleObjectPane)
