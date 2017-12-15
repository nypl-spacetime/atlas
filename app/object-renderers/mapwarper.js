import React from 'react'

import Figure from 'components/Figure'

export class Renderer extends React.Component {

  render () {

    // uuid
    // title
    // console.log(this.props.object)
    return (
      <div>
        <Figure imageId={this.props.object.data.imageId} />
      </div>
    )
  }
}

export default Renderer
