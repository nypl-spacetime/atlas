import React from 'react';

import './digital-collections.scss';

const Renderer = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <img src={'http://images.nypl.org/index.php?t=w&id=' + this.props.feature.properties.data.imageId} />
      </div>
    );
  },
});

export default Renderer;
