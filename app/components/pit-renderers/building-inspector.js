import React from 'react';

const Renderer = React.createClass({

  getInitialState: function() {
    return {
      people: []
    };
  },

  render: function() {
    var livedIn = 'on this address'
    var isBuilding = this.props.feature.properties.type === 'hg:Building'
    if (isBuilding) {
      livedIn = 'in this building'
    }

    var link
    if (isBuilding) {
      link = <span>
        <a href='javascript:;' onClick={this.findMap}>Show Building Inspector map</a>, or find
        out <a href='javascript:;' onClick={this.findPeople}>who lived {livedIn}</a>?
      </span>
    } else {
      link = <span>
        Find out <a href='javascript:;' onClick={this.findPeople}>who lived {livedIn}</a>?
      </span>
    }

    return (
      <div>
        {link}
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
    fetch(this.props.api.url + `persons-in-pit?id=${buildingId}`)
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
    fetch(this.props.api.url + `building-inspect-sheets`)
      .then(response => {
        return response.json();
      }).then(json => {
        var sheets = json.features.filter((f) => f.properties.id === sheetId)
        if (sheets.length) {
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
