import React from 'react';

import Pit from './pit';
import Filters from './filters';

import './sidebar.scss';

const Sidebar = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className='sidebar'>
        <div>
          <Filters pits={this.props.pits} filters={this.props.filters} updateFilters={this.props.updateFilters}/>
        </div>
        <div>
          <h3>Results:</h3>
          <ul>
            { this.props.pits.features.map((feature) => {
              var key = feature.properties.uri || feature.properties.id
              return <Pit key={key} feature={feature} api={this.props.api} hideOverlay={this.props.hideOverlay}
                updateOverlay={this.props.updateOverlay} modifyMap={this.props.modifyMap}/>
            })}
          </ul>
        </div>
      </div>
    );
  }

});

export default Sidebar;
