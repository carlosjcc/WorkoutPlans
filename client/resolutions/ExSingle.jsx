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

  deleteResolution() {
    console.log(this.props);
    Meteor.call('deleteResolution', this.props.resolution);
  }

  deleteExercise() {
    //console.log(this.props.id + " " + this.props.pl);
    Meteor.call('deleteExercise', this.props.id, this.props.pl);
  }

  updateResolution() {
    console.log(this.props.resolution);
    this.props.resolution.text = `${this.props.resolution.text}!`;
    console.log(this.props.resolution);
    //Meteor.call('updateResolution', this.props.resolution);
  }

  render() {

    //console.log(this.props);

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