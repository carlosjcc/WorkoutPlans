import React, { Component } from 'react';

export default class ResolutionsForm extends Component {

  // changes the workout plan name
  changeName(event, props) {
    event.preventDefault();
    //console.log("id: " + this.props.planId + " value: " + this.refs.name.value.trim());

    if (this.refs.name.value.trim()=== "") {
      Meteor.call('changeName', this.props.planId, "New Plan");
    }
    else {
      Meteor.call('changeName', this.props.planId, this.refs.name.value.trim());
    }
  }

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

    const defValue = this.props.name ? this.props.name : "";

    return(

      <div>        
        <form onChange={this.changeName.bind(this)} onSubmit={this.changeName.bind(this)} >
          <input
            placeholder="New Workout Plan"
            ref="name"
            type="text"
            defaultValue={defValue}
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