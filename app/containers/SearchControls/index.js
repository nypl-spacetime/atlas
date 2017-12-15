import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectFilters
} from 'containers/App/selectors'

import {
  search,
  updateFilter,
  resetFilter
} from '../App/actions'

import Button from 'components/Button'
import ResetFilter from 'components/ResetFilter'

const Slider = require('rc-slider')
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

import 'rc-slider/assets/index.css'

import { typeToText } from 'utils/utils'

import { Form, Header, Filter, Controls, Types, Labeled } from './styles'

export class SearchControls extends React.Component {

  render () {
    //<label htmlFor='filter-id'>Identifier:</label>
    //  <input type='text' id='filter-id' value={this.props.filters.id}
    //    onChange={this.handleIdChange.bind(this)} />



    // dataset?
    // geometry
    // - radius
    // - inside/intersect rect of shape

    // const geometryOperations = [
    //   'intersects',
    //   'contains'
    // ]

    // <label htmlFor='filter-geometry'>Geometry:</label>
    //  <input type='text' id='filter-geometry' value={this.props.filters.geometry}
    //    onChange={this.handleGeometryChange.bind(this)} />

    // <fieldset>
    //   {geometryOperations.map((operation) => (
    //     <div key={operation}>
    //       <input type='radio' id={`filter-geometry-operation-${operation}`}
    //         onChange={this.handleGeometryOperationChange.bind(this, operation)} checked={false} />
    //       <label htmlFor={`filter-geometry-operation-${operation}`}>{operation}</label>
    //     </div>
    //   ))}
    // </fieldset>

    return (
      <Form onSubmit={this.formSubmit.bind(this)} autoComplete='off'>

        <Filter>
          <Header>
            <label htmlFor='filter-name'>Name:</label>
            <ResetFilter onClick={this.resetFilter.bind(this, 'name')} />
          </Header>
          <Controls>
            <input type='text' id='filter-name' value={this.props.filters.name}
              onChange={this.handleNameChange.bind(this)} autoComplete='off' />
          </Controls>
        </Filter>

        <Filter>
          <Types>
            <Header>
              <legend>Types:</legend>
              <ResetFilter onClick={this.resetFilter.bind(this, 'types')} />
            </Header>
            <Controls>
              {Object.keys(this.props.filters.types).map((type) => (
                <Labeled key={type}>
                  <input type='checkbox' id={`filter-type-${type}`}
                    onChange={this.handleTypeChange.bind(this, type)}
                    checked={this.props.filters.types[type]} />
                  <label htmlFor={`filter-type-${type}`}>{typeToText(type)}</label>
                </Labeled>
              ))}
            </Controls>
          </Types>
        </Filter>

        <Filter>
          <Header>
            <label>Period:</label>
            <ResetFilter onClick={this.resetPeriod.bind(this)} />
          </Header>
          <Controls>
            <Range min={1600} max={2000} defaultValue={[1600, 2000]} allowCross={false}
              onChange={this.handlePeriodChange.bind(this)} />
          </Controls>
        </Filter>


        <Button type='submit'>Search</Button>
      </Form>
    )
  }

  resetFilter (filter) {
    this.props.resetFilter(filter)
  }

  formSubmit (event) {
    this.props.search()
    event.preventDefault()
  }

  handleNameChange (event) {
    this.props.updateFilter('name', event.target.value)
  }

  handleIdChange (event) {

  }

  handleGeometryChange (event) {

  }

  handleGeometryOperationChange (event) {

  }

  resetPeriod () {
    this.props.resetFilter('since')
    this.props.resetFilter('until')
  }

  handlePeriodChange (values) {
    const since = values[0]
    const until = values[1]

    this.props.updateFilter('since', since)
    this.props.updateFilter('until', until)
  }

  handleTypeChange (type, event) {
    const shift = event.nativeEvent.shiftKey
    const typeFilters = Object.assign({}, this.props.filters.types)

    if (shift) {
      const current = typeFilters[type]
      Object.keys(typeFilters).forEach((type) => {
        typeFilters[type] = current
      })
      typeFilters[type] = !current
    } else {
      typeFilters[type] = !typeFilters[type]
    }

    this.props.updateFilter('types', typeFilters)
  }

}

function mapDispatchToProps (dispatch) {
  return {
    updateFilter: (filter, data) => dispatch(updateFilter(filter, data)),
    resetFilter: (filter) => dispatch(resetFilter(filter)),
    search: () => dispatch(search()),
    dispatch
  }
}

export default connect(createSelector(
  selectFilters(),
  (filters) => ({
    filters
  })
), mapDispatchToProps)(SearchControls)
