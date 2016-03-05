import React from 'react';
import { findDOMNode } from 'react-dom';

import Filters from './filters';

import './pit.scss';

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

    var period = ''
    var validSince
    var validUntil
    if (feature.properties.validSince) {
      validSince = feature.properties.validSince.toString().replace('-01-01', '')
    }
    if (feature.properties.validUntil) {
      validUntil = feature.properties.validUntil.toString().replace('-12-31', '')
    }

    if (validSince && validUntil) {
      period = `${validSince} - ${validUntil}`
    } else if (validSince) {
      period = `From ${validSince}`
    } else if (validUntil) {
      period = `Until ${validUntil}`
    }

    var link
    var uri = this.props.feature.properties.uri
    if (uri) {
      link = <a href={uri} target='_black'>{uri}</a>
    }

    return (
      <li className='pit' onMouseEnter={this.lineToMap} onMouseLeave={this.props.hideOverlay}>
        <div className='pit-heading'>
          <h2>
            <span className='pit-title'>{title}</span>
            <span className='pit-type'>{type}</span>
          </h2>
          <h3>
            <span className='pit-dataset'>{dataset}</span>
            <span className='pit-period'>{period}</span>
          </h3>
          {link}
        </div>
        { React.createElement(this.getRenderer(feature), {
          api: this.props.api,
          feature: feature,
          modifyMap: this.props.modifyMap
        })}
      </li>
    )
  },

  lineToMap: function() {
    var node = findDOMNode(this)
    var rect = node.getBoundingClientRect()
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
