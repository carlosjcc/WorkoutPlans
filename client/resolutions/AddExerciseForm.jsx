import React, { Component } from 'react';

export default class AddExerciseForm extends Component {


  // adds an excersice list to the workout plan
  addExercise(event, props) {
    event.preventDefault();

    let text = this.refs.resolution.value.trim();

    if (text) {
      Meteor.call('addExercise', this.props.planId, text, (error, data) => {
        if(error) {
          Bert.alert('Please login before submittin', 'danger', 'fixed-top', 'fa-frown-o')
        } else {
          this.refs.resolution.value = "";
        }
      });
    }
  }

  render() {
    //console.log(this.props);

    return(

      <div>
        <form className="new-resolution" onSubmit={this.addExercise.bind(this)}>
          <input
            type="text"
            ref="resolution"
            placeholder="Add Workout"
          />
        </form>
      </div>
    )
  }
}