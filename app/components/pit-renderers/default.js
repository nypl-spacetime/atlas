import React from 'react';

const Renderer = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    var code = ''
    var data = this.props.feature.properties.data
    if (data) {
      code = <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
    }

    return (
      <div>
        {code}
      </div>
    );
  },
});

export default Renderer;
