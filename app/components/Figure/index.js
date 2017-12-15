import React from 'react'

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding

const Fig = styled.figure`
  margin: ${padding};
  width: 150px;
`

const Img = styled.img`
  width: 150px;
`

function Figure (props) {
  let url
  let src

  if (props.imageId) {
    src = `http://images.nypl.org/index.php?id=${props.imageId}&t=r`
    // r = 300
    // w = 700
  } else {
    src = props.src
  }

  if (props.uuid) {
    url = `http://digitalcollections.nypl.org/items/${props.uuid}`
  } else {
    url = props.url
  }

  const title = props.title

  return (
    <a target='_blank' href={url}>
      <Fig>
        <Img src={src} alt={title} />
        <figcaption>
          <i>{title}</i>
        </figcaption>
      </Fig>
    </a>
  )
}

export default Figure
