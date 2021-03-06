import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PlanSingle from './PlanSingle.jsx';

Resolutions = new Mongo.Collection("resolutions");

export default class WorkoutPlansList extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      }
    };
  }

  NewPlan() {
    //console.log("clicked");
    FlowRouter.go('/new');
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  // get the list of workout plans
  resolutions() {
    // find returns a cursos - fetch returns the object
    return Resolutions.find().fetch();
  }

  render() {
    
    let isLoggedIn = Meteor.userId();

    //console.log(isLoggedIn);

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

          <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >

            { this.resolutions().map( (resolution) => {
              return <PlanSingle key={resolution._id} resolution={resolution} />
            }) }

          </ReactCSSTransitionGroup>

          <a className="btn waves-effect waves-light" onClick={this.NewPlan}>New Routine</a>

        </ReactCSSTransitionGroup>
      )
    }

    else {
      return <h1>Please Log in.</h1>;
    }

  }
}