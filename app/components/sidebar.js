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
        <Filters pits={this.props.pits} filters={this.props.filters} updateFilters={this.props.updateFilters}/>
        <ul>
          { this.props.pits.features.map((feature) => {
            var key = feature.properties.uri || feature.properties.id
            return <Pit key={key} feature={feature} api={this.props.api}
              updateOverlay={this.props.updateOverlay} modifyMap={this.props.modifyMap}/>
          })}
        </ul>
      </div>
    );
  }

});

export default Sidebar;
