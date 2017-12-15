import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import {
  SEARCH,
  GET_SINGLE_OBJECT
} from 'containers/App/constants'

import {
  searchSuccess,
  searchError,
  getSingleObjectSuccess,
  getSingleObjectError
} from 'containers/App/actions'

import {
  selectApiConfig,
  selectFilters
} from 'containers/App/selectors'

import request from 'utils/request'

import { filtersToUrlParams } from 'utils/utils'

function* getSingleObject (action) {
  const datasetId = action.datasetId
  const objectId = action.objectId

  if (!datasetId || !objectId) {
    return
  }

  const apiConfig = yield select(selectApiConfig())
  const url = `${apiConfig.url}datasets/${datasetId}/objects/${objectId}`

  try {
    const data = yield call(request, url)
    yield put(getSingleObjectSuccess(data))
  } catch (err) {
    yield put(getSingleObjectError(err))
  }
}

function* getSingleObjectSaga () {
  yield * takeEvery(GET_SINGLE_OBJECT, getSingleObject)
}

function* search (action) {
  const filters = yield select(selectFilters())
  const urlParams = filtersToUrlParams(filters)

  const apiConfig = yield select(selectApiConfig())
  const url = `${apiConfig.url}search` + urlParams

  try {
    const data = yield call(request, url)
    yield put(searchSuccess(data))
  } catch (err) {
    yield put(searchError(err))
  }
}

function* searchSaga () {
  yield * takeEvery(SEARCH, search)
}

export default [
  getSingleObjectSaga,
  searchSaga
]
