import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ExSingle from './ExSingle.jsx';
import WorkoutForm from './WorkoutForm.jsx';

export default class RoutineName extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      },
      isLoggedIn: true,
      planId: "",
      editing: false
    }
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  componentDidMount(){
    //console.log(this.props.id);
    this.setState({planId: this.props.id});
  }

  editName() {
    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true});
  }

  changeName(event, props) {

    event.preventDefault();
    //console.log("id: " + this.props.planId + " value: " + this.refs.name.value.trim());
    //console.log(this.refs.name.value);

    if (this.refs.name.value.trim()=== "") {
      Meteor.call('changeName', this.props.planId, "New Plan");
    }
    else {
      Meteor.call('changeName', this.props.planId, this.refs.name.value.trim());
    }

    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true});
  }

  render() {

    const defValue = this.props.name ? this.props.name : "";

    if (this.state.editing) {
      return (

        <h1>
          <form onSubmit={this.changeName.bind(this)}>
            <input
              ref="name"
              type="text"
              defaultValue={defValue}
            />
          </form>
        </h1>
      )

    }

    else {
      return (
        <h1 onClick={this.editName.bind(this)} >{this.props.name}</h1>
      )      
    }

    
    
  }

}
