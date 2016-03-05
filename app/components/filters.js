import React from 'react';
import ReactSlider from 'react-slider';

import './filters.scss';

const Filters = React.createClass({

  getInitialState: function() {
    return {
      yearBounds: [
        1500,
        new Date().getFullYear()
      ],
      type: {
        'hg:Address': true,
        'hg:Building': true,
        'hg:Street': true,
        'hg:Neighbourhood': true,
        'hg:Borough': true,
        'hg:Ward': true,
        // 'hg:State': true,
        'hg:Place': true,
        // 'hg:Municipality': true,
        // 'hg:Region': true,
        // 'hg:Water': true,
        'hg:County': true,
        // 'hg:Province': true,
        // 'hg:Country': true,
        // 'hg:Area': true,
        // 'st:Person': true,
        // 'st:Company': true,
        'st:Photo': true,
        'st:Map': true,
      }
    };
  },

  render: function() {

    var years = [
      this.state.yearBounds[0],
      this.state.yearBounds[1]
    ]
    if (this.refs.yearSlider) {
      years = this.refs.yearSlider.getValue()
    }

    return (
      <div className='filters'>
        <div>
          <h3>Types:</h3>
          <ol className='filter'>
            {Object.keys(this.state.type).map((type) => {
              var filtered = this.state.type[type]

              return (
                <li key={type}>
                  <button className={filtered ? '' : 'inactive'} onClick={this.toggleType.bind(this, type)}>
                    {type.split(':')[1]}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
        <div>
          <h3>Year:</h3>
          <div className='year-slider filter'>
            <span>{years[0]}</span>
            <ReactSlider className='horizontal-slider' defaultValue={this.state.yearBounds.slice()} onChange={this.changingYears}
              ref='yearSlider' min={this.state.yearBounds[0]} max={this.state.yearBounds[1]} pearling onAfterChange={this.changeYears} />
            <span>{years[1]}</span>
          </div>

        </div>
        <div>
          <h3>Name:</h3>
          <input ref='name' className='filter' onChange={this.changeName}></input>
        </div>
      </div>
    );
  },

  changeName: function() {
    var name = this.refs.name.value
    this.props.updateFilters({
      name: name
    })
  },

  changingYears: function() {
    this.forceUpdate()
  },

  changeYears: function() {
    var years = this.refs.yearSlider.getValue().slice()

    if (years[0] === this.state.yearBounds[0]) {
      years[0] = null
    }

    if (years[1] === this.state.yearBounds[1]) {
      years[1] = null
    }

    this.props.updateFilters({
      years: years
    })
  },

  toggleType: function(type, e) {
    var shift = e.shiftKey

    var typeFilters = Object.assign({}, this.state.type)

    if (shift) {
      var current = typeFilters[type]
      Object.keys(typeFilters).forEach((type) => {
        typeFilters[type] = current
      })
      typeFilters[type] = !current
    } else {
      typeFilters[type] = !typeFilters[type]
    }

    this.props.updateFilters({
      type: Object.keys(typeFilters).filter((type) => typeFilters[type])
    })

    this.setState({
      type: typeFilters
    })
  }
});

export default Filters;
