import React from 'react';

const Renderer = React.createClass({

  getInitialState: function() {
    return {
      people: []
    };
  },

  render: function() {
    var livedIn = 'on this address'
    if (this.props.feature.properties.type === 'hg:Building') {
      livedIn = 'in this building'
    }

    return (
      <div>
        <a href='javascript:;' onClick={this.findMap}>Show Building Inspector map</a>, or find
        out <a href='javascript:;' onClick={this.findPeople}>who lived {livedIn}</a>?
        <ul>
          {this.state.people.map(function(person, i) {
            var name = `${person.firstName} ${person.lastName}`.trim()
            return (
              <li key={i}>{`${name} - ${person.profession}`}</li>
            )
          })}
        </ul>
      </div>
    );
  },

  findPeople: function(e) {
    e.preventDefault();

    var buildingId = this.props.feature.properties.id
    // buildingId = 'building-inspector/polygon-84529'
    fetch(this.props.api.url + `hond?id=${buildingId}`)
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
          people: json,
        });
      }).catch(err => {
        console.error(err);
      });
  },

  findMap: function(e) {
    e.preventDefault();

    var sheetId = this.props.feature.properties.data.sheetId
    fetch(this.props.api.url + `vis`)
      .then(response => {
        return response.json();
      }).then(json => {
        var sheets = json.features.filter((f) => f.properties.id === sheetId)
        if (sheets) {
          var sheet = sheets[0]
          var mapId = sheet.properties.map_id
          this.props.modifyMap({
            tileUrl: `http://maps.nypl.org/warper/maps/tile/${mapId}/{z}/{x}/{y}.png`
          });
        }
      }).catch(err => {
        console.error(err);
      });
  }
});

export default Renderer;
