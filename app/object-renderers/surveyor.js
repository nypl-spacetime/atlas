import React from 'react'

export class Renderer extends React.Component {

  render () {
    const imageId = this.props.object.data.data.image_id

    return (
      <div>
        <img src={`https://images.nypl.org/index.php?id=${imageId}&t=w`} />
      </div>
    )
  }
}

export default Renderer
