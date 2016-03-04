import React from 'react';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import '../../node_modules/leaflet/dist/leaflet.css';
import './map.scss';

const Map = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className='map' ref='map' />
    );
  },

  componentDidMount: function() {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: [40.7127837, -74.0059413],
      zoom: 12,
      zoomControl: false
    });

    L.Icon.Default.imagePath = './';

    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    map.on('moveend', this.moveEnd);

    var color = '#f62'

    var geojsonMarkerOptions = {
      radius: 4,
      fillColor: color,
      color: color,
      weight: 0,
      opacity: 1,
      fillOpacity: 0.8
    };

    var geoJsonLayer = L.geoJson(null, {
      // onEachFeature: onEachFeature
      style: {
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.05
      },

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(map);

    //     function whenClicked(e) {
    //       var feature = e.target.feature;
    //       console.log(feature.properties)
    //     }

    this.setState({
      map: map,
      geoJsonLayer: geoJsonLayer
    });
  },

  getOverlayLinesFromId: function(id) {
    var layer;
    this.state.geoJsonLayer.eachLayer(function (l) {
      var properties = l.feature.properties
      var layerId = properties.id || properties.uri
      if (id === layerId) {
        layer = l
      }
    });

    if (layer) {
      var bounds = layer.getBounds()
      var northEast = this.state.map.latLngToContainerPoint(bounds.getNorthEast())
      var southEast = this.state.map.latLngToContainerPoint(bounds.getSouthEast())
      return [
        [northEast.x, northEast.y + 35],
        [southEast.x, southEast.y + 35],
      ]
    } else {
      return null
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.state.geoJsonLayer) {
      this.state.geoJsonLayer.clearLayers();
      this.state.geoJsonLayer.addData(nextProps.pits);
    }

    if (nextProps.options.tileUrl) {
      if (!this.state.tileLayer) {
        var tileLayer = L.tileLayer(nextProps.options.tileUrl).addTo(this.state.map);
        this.setState({
          tileLayer: tileLayer
        });
      } else if (nextProps.options.tileUrl !== this.props.options.tileUrl){
        this.state.tileLayer.setUrl(nextProps.options.tileUrl);
      }
    }
  },

  moveEnd: function() {
    if (this.state.map) {
      var bounds = this.state.map.getBounds();
      var rect = [bounds.getNorthWest().lng, bounds.getNorthWest().lat, bounds.getSouthEast().lng, bounds.getSouthEast().lat];
      this.props.updateFilters({
        contains: rect
      });
    }
  }

});

export default Map;
