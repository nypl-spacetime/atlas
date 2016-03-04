import React from 'react';

// import './mapwarper.scss';

const Renderer = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <img src={'http://images.nypl.org/index.php?t=w&id=' + this.props.feature.properties.data.nyplDigitalId} />
        <a href='javascript:;' onClick={this.addTiles}>Show on map</a>
      </div>
    );
  },

  addTiles: function() {
    var mapId = this.props.feature.properties.id.replace('mapwarper/', '');
    this.props.modifyMap({
      tileUrl: `http://maps.nypl.org/warper/maps/tile/${mapId}/{z}/{x}/{y}.png`
    });
  }
});

export default Renderer;
