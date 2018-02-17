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
    //console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteResolution() {
    //console.log(this);
    Meteor.call('deleteResolution', this.props.resolution);
  }

  updateResolution() {
    //console.log(this.props.resolution);
    this.props.resolution.text = `${this.props.resolution.text}!`;
    //console.log(this.props.resolution);
    //Meteor.call('updateResolution', this.props.resolution);
  }

  render() {

    //console.log(this.props.resolution);

    return (

      <li >

        {/*<a href={`/resolutions/${this.props.resolution._id}`}>{this.props.resolution.text}</a>*/}
        {/*this.props.resolution.name*/}

        {<a href={`/plan/${this.props.resolution._id}`}>{this.props.resolution.name}</a>}

        <button className="btn-cancel"
                onClick={this.deleteResolution.bind(this)}>
                &times;
        </button>


      </li>
    )
  }
}