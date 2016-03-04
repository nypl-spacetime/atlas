import React from 'react';

const Renderer = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        {this.props.feature.properties.name}
      </div>
    );
  }

});

export default Renderer;
