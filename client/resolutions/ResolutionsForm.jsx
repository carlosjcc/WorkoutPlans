import React, { Component } from 'react';

export default class ResolutionsForm extends Component {

  changeName(props) {
    console.log("id: " + this.props.planId + " value: " + this.refs.name.value.trim());

    Meteor.call('changeName', this.props.planId, this.refs.name.value.trim());
  }

  addExercise(props) {
    Meteor.call('addExercise', this.props.planId, this.refs.resolution.value.trim());
  }

  addResolution(event) {
    event.preventDefault();
     var text = this.refs.resolution.value.trim();

    if (text) {
      Meteor.call('addResolution', text, (error, data) => {
        if(error) {
          Bert.alert('Please login before submittin', 'danger', 'fixed-top', 'fa-frown-o')
        } else {
          this.refs.resolution.value = "";
        }
      });
    }
  }

  render() {
    return(

      <div>        
        <form onChange={this.changeName.bind(this)} value="New Workout Plan">
          <input
            placeholder="New Workout Plan" 
            ref="name"
            type="text"            
          />
        </form>

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