import React from 'react';
import ReactSlider from 'react-slider';

import './filters.scss';

const Filters = React.createClass({

  getInitialState: function() {
    return {
      type: {
        'hg:Address': true,
        'hg:Building': true,
        'hg:Street': true,
        'hg:Neighbourhood': true,
        'hg:Borough': true,
        'hg:Ward': true,
        // 'hg:State': true,
        'hg:Place': true,
        'hg:Municipality': true,
        'hg:Region': true,
        'hg:Water': true,
        'hg:County': true,
        // 'hg:Province': true,
        // 'hg:Country': true,
        'hg:Area': true,
        // 'st:Person': true,
        // 'st:Company': true,
        'st:Photo': true,
        'st:Map': true,
      }
    };
  },

  render: function() {
    var minYear = 1500
    var currentYear = new Date().getFullYear()

    return (
      <div className='filters'>
        <ol>
          {Object.keys(this.state.type).map((type) => {
            var filtered = this.state.type[type]

            return (
              <li key={type}>
                <button className={filtered ? '' : 'hond'} onClick={this.toggleType.bind(this, type)}>
                  {type.split(':')[1]}
                </button>
              </li>
            )
          })}
        </ol>
        <ReactSlider className='horizontal-slider' defaultValue={[minYear, currentYear]}
          ref='yearSlider' min={minYear} max={currentYear} pearling onAfterChange={this.changeYears} />
      </div>
    );
  },

  changeYears: function() {
    var years = this.refs.yearSlider.getValue()
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
