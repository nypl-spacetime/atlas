import React from 'react'

import JSONData from 'components/JSONData'

export class Renderer extends React.Component {
  render () {
    return (
      <JSONData data={this.props.object.data} />
    )
  }
}

export default Renderer
