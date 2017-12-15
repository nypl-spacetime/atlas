import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { createSelector } from 'reselect'

import {
  loadOAuth,
  setPaneMode,
  setPaneIndex,
  toggleMetadata
} from '../App/actions'

import {
  selectError,
  selectPaneMode,
} from 'containers/App/selectors'

import Header from 'components/Header'
import Menu from 'containers/Menu'

import { Container, Contents } from './styles'

export class App extends React.Component {

  componentWillMount () {

  }

  componentDidMount () {
    this.boundKeyDown = this.keyDown.bind(this)
    window.addEventListener('keydown', this.boundKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.boundKeyDown)
  }

  render () {
    const defaultTitle = 'Atlas - NYC Space/Time Directory'

    let homepageLink = '/'
    if (this.props.item && this.props.item.id) {
      homepageLink += this.props.item.id
    }

    let contents = this.props.children

    return (
      <Container>
        <Helmet titleTemplate={`%s - ${defaultTitle}`}
          defaultTitle={defaultTitle} />
        <Header homepageLink={homepageLink}>
          <Menu path={this.props.location.pathname.slice(1)} paneMode={this.props.paneMode} homepageLink={homepageLink}
            singlePaneClick={this.singlePaneClick.bind(this)} splitPaneClick={this.splitPaneClick.bind(this)} />
        </Header>
        <Contents>
          {contents}
        </Contents>
      </Container>
    )
  }

  singlePaneClick () {
    // this.toGeotagger()
    this.props.setPaneMode('single')
  }

  splitPaneClick () {
    // this.toGeotagger()
    this.props.setPaneMode('split')
  }

  toGeotagger () {
    if (!this.props.params.id) {
      this.props.replaceRoute('/' + (this.props.item.id || ''))
    }
  }

  keyDown (event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 219) {
      // Code: [
      this.props.setPaneIndex(0)
    } else if (code === 221) {
      // Code: ]
      this.props.setPaneIndex(1)
    } else if (code === 49) {
      // Code: 1
      this.props.setPaneMode('single')
    } else if (code === 50) {
      // Code: 2
      this.props.setPaneMode('split')
    } else if (code === 77) {
      // Code: M
      // this.props.toggleMetadata()
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPaneMode: (mode) => dispatch(setPaneMode(mode)),
    setPaneIndex: (index) => dispatch(setPaneIndex(index)),
    replaceRoute: (url) => dispatch(replace(url)),
    dispatch
  }
}

export default connect(createSelector(
  selectError(),
  selectPaneMode(),
  (error, paneMode) => ({
    error, paneMode
  })
), mapDispatchToProps)(App)
