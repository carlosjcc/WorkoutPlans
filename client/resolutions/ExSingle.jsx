import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



export default class ResolutionSingle extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      }
    }
  }

  toggleChecked() {
    console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteExercise() {
    //console.log(this.props.id + " " + this.props.pl);
    Meteor.call('deleteExercise', this.props.id, this.props.pl);
  }

  render() {

    return (
      <div>

        <li className="list">

          {this.props.pl}

          <button className="btn-cancel"
                onClick={this.deleteExercise.bind(this)}>
                &times;
          </button>
        </li>

      </div>
    )
  }
}