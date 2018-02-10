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
    console.log(this);
    Meteor.call('deleteResolution', this.props.resolution);
  }

  updateResolution() {
    console.log(this.props.resolution);
    this.props.resolution.text = `${this.props.resolution.text}!`;
    console.log(this.props.resolution);
    //Meteor.call('updateResolution', this.props.resolution);
  }

  render() {
    
    const resolutionClass = this.props.resolution.complete ? "checked" : "";
    const status = this.props.resolution.complete ? <span className="completed">Completed</span> : '';
    
    return (

      <li className={resolutionClass}>
        <input 
              type="checkbox"
              readOnly={true}
              checked={this.props.resolution.complete}
              onClick={this.toggleChecked.bind(this)} />

        {/*<a href={`/resolutions/${this.props.resolution._id}`}>{this.props.resolution.text}</a>*/}        
        {this.props.resolution.text} {status}

        <button className="btn-cancel"
                onClick={this.deleteResolution.bind(this)}>
                &times;
        </button>
      </li>
    )
  }
}