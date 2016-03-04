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
      overlayLines: [
        [
          [0, 0],
          [200, 200]
        ],
        [
          [0, 0],
          [200, 200]
        ]
      ]
    };
  },

  render: function() {
    return (
      <div id='app'>
        <header>
          <h1>Space/Time Directory - Atlas</h1>
          <span>Atlas shows the first 100 results from NYPL Labs Space/Time Directory of which the geometry fits completely in the bounding box of the map</span>
        </header>
        <section className='map-container'>
          <Map ref='map' pits={this.state.pits} updateFilters={this.mapUpdateFilters} updateOverlay={this.updateOverlay}
            api={this.props.api} options={this.state.map} modifySidebar={this.modifySidebar} />
        </section>
        <section className='sidebar-container'>
          <Sidebar ref='sidebar' pits={this.state.pits} updateFilters={this.sidebarUpdateFilters}
            updateFilters={this.updateFilters} api={this.props.api} updateOverlay={this.updateOverlay}
            options={this.state.sidebar} modifyMap={this.modifyMap} />
        </section>

        <div className='svg-overlay'>
          <svg>
            <line x1={this.state.overlayLines[0][0][0]} y1={this.state.overlayLines[0][0][1]}
              x2={this.state.overlayLines[0][1][0]} y2={this.state.overlayLines[0][1][1]} />
            <line x1={this.state.overlayLines[1][0][0]} y1={this.state.overlayLines[1][0][1]}
              x2={this.state.overlayLines[1][1][0]} y2={this.state.overlayLines[1][1][1]} />
          </svg>
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

    if (filters.type) {
      filterUrlParts.push('type=' + filters.type.join(','))
    }

    if (filters.years) {
      filterUrlParts.push('before=' + filters.years[1])
      filterUrlParts.push('after=' + filters.years[0])
    }

    var filterUrl

    if (filterUrlParts.length) {
      filterUrl = '?' + filterUrlParts.join('&')
    }

    console.log(this.props)
    console.log(this.dispatch)
    // this.props.onDoeHet({
    //   type: 'FeatureCollection',
    //   features: [
    //     {
    //       type: 'Feature',
    //       properties: {
    //         matt: 'nee'
    //       },
    //       geometry: {
    //         type: 'Point',
    //         coordinates: [73, -43]
    //       }
    //     }
    //   ]
    // })



    fetch(this.props.api.url + 'search' + filterUrl)
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
        //   filters: filters,
          pits: json
        });
      }).catch(err => {
        console.error(err);
      });
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