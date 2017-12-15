import React from 'react'

export class Renderer extends React.Component {

  render () {
    return (
      <div>
        <img style={{width: '50%'}} src={this.props.object.data.imageUrl} />
      </div>
    )
  }
}

export default Renderer
