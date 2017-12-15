import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Error from 'containers/Error'
import Loading from 'containers/Loading'
import Panes from 'containers/Panes'

import MapPane from 'containers/MapPane'
import SearchPane from 'containers/SearchPane'
import SingleObjectPane from 'containers/SingleObjectPane'

import {
  selectSingleObject
} from 'containers/App/selectors'

import {
  clearSingleObject,
  getSingleObject
} from '../App/actions'

export class HomePage extends React.Component {

  conceptContainsObject (datasetId, objectId) {

  }

  newSingleObject (props) {
    const paramDatasetId = this.props.params.datasetId
    const paramObjectId = this.props.params.objectId

    const propsDatasetId = props && props.params.datasetId
    const propsObjectId = props && props.params.objectId

    const newDatasetId = propsDatasetId !== paramDatasetId
    const newObjectId = propsObjectId !== paramObjectId

    if (!propsDatasetId || !propsObjectId) {
      this.props.clearSingleObject()
    } else if ((newDatasetId || newObjectId) && propsDatasetId && propsObjectId) {
      this.props.getSingleObject(propsDatasetId, propsObjectId)
    }
  }

  componentWillMount () {
    // const paramDatasetId = this.props.params.datasetId
    // const paramObjectId = this.props.params.objectId

    // if (paramDatasetId && paramObjectId) {

    //   console.log(this.props.singleObject)

    //   this.props.getSingleObject(paramDatasetId, paramObjectId)

    //   // console.log(this.props.selectSingleObject)
    // } else {
    //   // set single object undef
    // }
    // // console.log(this.props.params.objectId)
    // // if (!this.props.item.id) {
    //   // this.props.loadItem('nypl', this.props.params.id)
    // // }
  }

  componentWillReceiveProps (nextProps) {
    // const newDatasetId = props.params.datasetId
    // const newObjectId = props.params.objectId

    this.newSingleObject(nextProps)
    // id
    // console.log(this.props.singleObject)
  }

  render () {
    let sidebar
    if (this.props.singleObject) {
      sidebar = <SingleObjectPane />
    } else {
      sidebar = <SearchPane />
    }

    return (
      <Panes>
        <MapPane />
        {sidebar}
      </Panes>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    clearSingleObject: () => dispatch(clearSingleObject()),
    getSingleObject: (datasetId, objectId) => dispatch(getSingleObject(datasetId, objectId)),
    dispatch
  }
}

export default connect(createSelector(
  selectSingleObject(),
  (singleObject) => ({
    singleObject
  })
), mapDispatchToProps)(HomePage)
