import React from 'react';
import { findDOMNode } from 'react-dom';

import Filters from './filters';

var Renderers = {};
function requireAll(r) {
  r.keys().forEach((filename, i) => {
    var dataset = filename.match(/\.\/(.*)\.js/)[1]
    Renderers[dataset] = r(filename).default
  })
}
requireAll(require.context('./pit-renderers/', false, /\.js$/))

const Pit = React.createClass({

  getInitialState: function() {
    return {
      id: this.props.feature.properties.uri || this.props.feature.properties.id
    }
  },

  render: function() {
    var feature = this.props.feature
    var title = feature.properties.name || this.state.id

    var type = feature.properties.type.split(':')[1]
    var dataset = feature.properties.dataset

    return (
      <li onMouseEnter={this.lineToMap}>
        <h2>{title}</h2>
        { React.createElement(this.getRenderer(feature), {
          api: this.props.api,
          feature: feature,
          modifyMap: this.props.modifyMap
        })}
      </li>
    )
  },

  //  getOffset: function(el) {
  //   var x = 0
  //   var y = 0
  //   while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
  //     x += el.offsetLeft - el.scrollLeft
  //     y += el.offsetTop - el.scrollTop
  //     el = el.offsetParent
  //   }
  //
  //   return {
  //     top: y, left: x
  //   }
  // },

  lineToMap: function() {
    var node = findDOMNode(this)
    // var offset = this.getOffset(node)

    var rect = node.getBoundingClientRect()
    // console.log(rect)

    var top = rect.top
    var left = rect.left
    var height = rect.height
    this.props.updateOverlay(this.state.id, null, [
      [left, top],
      [left, top + height]
    ])
  },

  getRenderer: function(feature) {
    var dataset = feature.properties.dataset
    return Renderers[dataset] ? Renderers[dataset] : Renderers.default
  }
})

export default Pit
