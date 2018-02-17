import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ExSingle from './ExSingle.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class RoutineDetail extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      },
      isLoggedIn: true,
      planId: ""
    }
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  componentDidMount(){
    //console.log(this.props.id);
    this.setState({planId: this.props.id});
  }

  resolution() {
    // find() returns a cursos - fetch() returns the object
    //return Resolutions.find({_id: this.props.id}).fetch();
    //console.log(this.state.planId);
    return Resolutions.findOne(this.props.id);
  }

  getExercises() {

    // array to return the excersices 
    let arr = [];

    //let plan = Resolutions.find(this.state.planId).fetch();

    // find document
    let plan = Resolutions.find({_id: this.state.planId});

    // print on console
    //plan.forEach((pl) =>  console.log(pl.workOuts));
    //return plan;

    //console.log(arr);

    // copy excersices to return array
    plan.map((ele) =>  arr.push(ele.workOuts));

    //console.log(arr);

    if (arr.length == 0) {
      return arr;
    }
    else {
      return arr[0];
    }

  }
  
  render() {

    let res = this.resolution();
    if (!res) {
      return(<div>Loading...</div>);
    }

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
      
        <h1>{res.name}</h1>

        <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >

          { arr.map( (ex, i) => {
                  //console.log("ex: " + ex + " index: " + i);
                  return <ExSingle pl={ex}  key={i} />;
          })}

        </ReactCSSTransitionGroup>

      </ReactCSSTransitionGroup>
    )
  }
}