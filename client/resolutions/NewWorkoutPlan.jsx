import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import WorkoutForm from './WorkoutForm.jsx';

import ExSingle from './ExSingle.jsx';


export default class NewWorkoutPlan extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      },
      isLoggedIn: true,
      planId: ""
    };

  }

  addBlankPlan() {

    //console.log("adding blank");

    Meteor.call('addBlankPlan', (error, data) => {
      //console.log("id: " + data);
      
      if(error) {
        Bert.alert('Please login before submittin', 'danger', 'fixed-top', 'fa-frown-o')
      } else {
        //this.refs.resolution.value = "";
        this.setState({planId: data});
      }
    });
  }

  componentDidMount() {
    //console.log("mounted");
    this.addBlankPlan();
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolutions() {
    // find returns a cursos - fetch returns the object
    return Resolutions.find().fetch();
  }

  // get all excersices of a workout routine
  getExercises() {

    // array to return the excersices 
    let arr = [];

    // find document that's being edited
    let plan = Resolutions.find({_id: this.state.planId});

    // copy excersices to return array
    plan.map((ele) =>  arr.push(ele.workOuts));

    if (arr.length == 0) {
      return arr;
    }
    else {
      return arr[0];
    }

  }

  render() {

    let isLoggedIn = Meteor.userId();

    let arr = this.getExercises();

    if (isLoggedIn) {
      return (
        <ReactCSSTransitionGroup
                component="div"
                transitionName="route"
                transitionEnterTimeout={600}
                transitionAppearTimeout={600}
                transitionLeaveTimeout={400}
                transitionAppear={true}
                >

          <WorkoutForm planId={this.state.planId}/>

          <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >

            { arr.map( (ex, i) => {
                //console.log("ex: " + ex + " index: " + i);
                return <ExSingle pl={ex}  key={i} id={this.state.planId}/>;
            })}

          </ReactCSSTransitionGroup>

        </ReactCSSTransitionGroup>
      )
    }

    else {
      return <h1>Please Log in.</h1>;
    }

  }
}