import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



export default class ResolutionSingle extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      },
      editing: false
    }
  }

  toggleChecked() {
    console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteExercise(event) {
    //console.log(this.props.id + " " + this.props.pl);
    event.stopPropagation();

    Meteor.call('deleteExercise', this.props.id, this.props.pl);
  }

  editText(props) {
    //console.log(this.props.itemId + " clicked");

    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true})

  }

  changeEx (event, props) {

    event.preventDefault();

    //console.log(this.refs.exercise.value);
    //console.log(this.props.pl);

    if (this.refs.exercise.value.trim()=== "") {
      //console.log("uno");
      Meteor.call('changeEx', this.props.id, this.props.pl, "Exercise");
    }
    else {
      //console.log("dos");
      //console.log(this.props.planId, this.props.pl, this.refs.exercise.value.trim());
      Meteor.call('changeEx', this.props.id, this.props.pl, this.refs.exercise.value.trim());
    }

    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true})

  }

  render() {

    //console.log(this.props);

    const defValue = this.props.pl ? this.props.pl : "";



    if (this.state.editing) {

      return (

        <form onSubmit={this.changeEx.bind(this)} onBlur={this.changeEx.bind(this)} >
          <input
            ref="exercise"
            type="text"
            defaultValue={defValue}
            autoFocus
          />
        </form>
      )

    }

    else {

      return (
        <li className="list" onClick={this.editText.bind(this)} >

          {this.props.pl}

          <button className="btn-cancel"
                  onClick={this.deleteExercise.bind(this)}>
                  &times;
          </button>

        </li>

      )

    }

  }
}