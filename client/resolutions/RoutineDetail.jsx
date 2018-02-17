import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class RoutineDetail extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolution() {
    // find() returns a cursos - fetch() returns the object
    //return Resolutions.find({_id: this.props.id}).fetch();
    return Resolutions.findOne(this.props.id);
  }
  
  render() {

    let res = this.resolution();
    if (!res) {
      return(<div>Loading...</div>);
    }

    return (
      <div>
        <h1>{res.name}</h1>        
      </div>
    )
  }
}