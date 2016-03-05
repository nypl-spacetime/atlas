import React from 'react';

import Map from './components/map';
import Sidebar from './components/sidebar';

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      map: {},
      sidebar: {},
      filters: {
        type: [
          // 'hg:Street',
          // 'hg:Building',
          // 'st:Map'
        ]
      },
      pits: {
        type: 'FeatureCollection',
        features: []
      },
      showOverlayLines: false,
      overlayLines: [
        [
          [0, 0],
          [0, 0]
        ],
        [
          [0, 0],
          [0, 0]
        ]
      ]
    };
  },

  render: function() {
    var svg

    if (this.state.showOverlayLines) {
      svg = (
        <svg>
          <line x1={this.state.overlayLines[0][0][0]} y1={this.state.overlayLines[0][0][1]}
            x2={this.state.overlayLines[0][1][0]} y2={this.state.overlayLines[0][1][1]} />
          <line x1={this.state.overlayLines[1][0][0]} y1={this.state.overlayLines[1][0][1]}
            x2={this.state.overlayLines[1][1][0]} y2={this.state.overlayLines[1][1][1]} />
        </svg>
      )
    }

    return (
      <div id='app'>
        <header>
          <h1>🚀 Space/Time Directory - Atlas</h1>
          <span>All Space/Time Directory objects on a map! <b>Experimental viewer for experimental data! Very experimental!</b></span>
        </header>
        <section className='map-container'>
          <Map ref='map' pits={this.state.pits} updateFilters={this.mapUpdateFilters} updateOverlay={this.updateOverlay}
            hideOverlay={this.hideOverlay} api={this.props.api} options={this.state.map} modifySidebar={this.modifySidebar} />
        </section>
        <section className='sidebar-container'>
          <Sidebar ref='sidebar' pits={this.state.pits} updateFilters={this.sidebarUpdateFilters}
            updateFilters={this.updateFilters} api={this.props.api} updateOverlay={this.updateOverlay}
            hideOverlay={this.hideOverlay} options={this.state.sidebar} modifyMap={this.modifyMap} />
        </section>

        <div className='svg-overlay'>
          {svg}
        </div>

      </div>
    );
  },

  mapUpdateFilters: function(filters) {
    this.loadPits(Object.assign(this.state.filters, filters));
  },

  loadPits: function(filters) {
    var filterUrlParts = []
    if (filters.contains) {
      filterUrlParts.push('contains=' + filters.contains.join(','))
    }

    if (filters.name) {
      filterUrlParts.push('name=' + filters.name)
    }

    if (filters.type) {
      filterUrlParts.push('type=' + filters.type.join(','))
    }

    if (filters.years) {
      if (filters.years[1]) {
        filterUrlParts.push('before=' + filters.years[1])
      }
      if (filters.years[0]) {
        filterUrlParts.push('after=' + filters.years[0])
      }
    }

    var filterUrl

    if (filterUrlParts.length) {
      filterUrl = '?' + filterUrlParts.join('&')
    }

    fetch(this.props.api.url + 'search' + filterUrl)
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
          showOverlayLines: false,
        //   filters: filters,
          pits: json
        });
      }).catch(err => {
        console.error(err);
      });
  },

  hideOverlay: function() {
    this.setState({
      showOverlayLines: false
    })
  },

  updateOverlay: function(id, from, to) {
    var overlayLines = this.state.overlayLines

    if (from) {
      overlayLines[0][0] = from[0]
      overlayLines[1][0] = from[1]
    }
    if (to) {
      overlayLines[0][1] = to[0]
      overlayLines[1][1] = to[1]

      var from = this.refs.map.getOverlayLinesFromId(id)
      overlayLines[0][0] = from[0]
      overlayLines[1][0] = from[1]
    }

    this.setState({
      showOverlayLines: true,
      overlayLines: overlayLines
    })
  },

  updateFilters: function(filters) {
    this.loadPits(Object.assign(this.state.filters, filters));
  },

  modifySidebar: function(options) {

  },

  modifyMap: function(options) {
    this.setState({
      map: {
        tileUrl: options.tileUrl
      }
    })
  }

});

export default App;
