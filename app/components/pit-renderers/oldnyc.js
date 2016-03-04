import React from 'react';

import './oldnyc.scss';

const Renderer = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <img src={this.props.feature.properties.data.imageUrl} />
      </div>
    );
  },
});

export default Renderer;
