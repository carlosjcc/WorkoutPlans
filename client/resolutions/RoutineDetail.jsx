import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ExSingle from './ExSingle.jsx';
import WorkoutForm from './WorkoutForm.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class RoutineDetail extends TrackerReact(Component) {

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

  // gets plan requested by user
  resolution() {    
    return Resolutions.findOne(this.props.id);
  }

  // get the exercises of the workout plan
  getExercises() {

    // array to return the excersices
    let arr = [];

    // find document that contais workout plan 
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

  editPlan() {

    this.state.editing ? this.setState( {editing: false} ) : this.setState( {editing: true} )
  }
  
  render() {

    let res = this.resolution();
    if (!res) {
      return(<div>Loading...</div>);
    }

    // get excersises list
    let arr = this.getExercises();

    return (

      <ReactCSSTransitionGroup
                component="div"
                transitionName="route"
                transitionEnterTimeout={600}
                transitionAppearTimeout={600}
                transitionLeaveTimeout={400}
                transitionAppear={true}
                >
        <div>
          {this.state.editing ? "" : <h1>{res.name}</h1>}
        </div>

        <div>
          {this.state.editing ? <WorkoutForm planId={this.state.planId} name={res.name} /> : ""}
        </div>

        <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >

          { arr.map( (ex, i) => {
                  return <ExSingle pl={ex}  key={i} id={this.state.planId} itemId={i}/>;
          })}

        </ReactCSSTransitionGroup>

        <button
          onClick={this.editPlan.bind(this)} 
          > 
          {this.state.editing ? "DONE" : "EDIT"} 
        </button>

      </ReactCSSTransitionGroup>
    )
  }
}