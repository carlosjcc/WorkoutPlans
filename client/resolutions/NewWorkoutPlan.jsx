import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';

//Resolutions = new Mongo.Collection("resolutions");

export default class NewWorkoutPlan extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      },

      isLoggedIn: true,
    };
    
  }

  addBlankPlan() {

    //console.log("metodo para insertar");
    //event.preventDefault();

    
    Meteor.call('addBlankPlan', (error, data) => {
      if(error) {
        Bert.alert('Please login before submittin', 'danger', 'fixed-top', 'fa-frown-o')
      } else {
        //this.refs.resolution.value = "";  
      }
    });
  }
  

  componentDidMount() {
    console.log("mounted");
    this.addBlankPlan();
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolutions() {
    // find returns a cursos - fetch returns the object
    return Resolutions.find().fetch();
  }

  render() {    
    
    let isLoggedIn = Meteor.userId();    

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
            <h1> My Resolutions - {Session.get('test')} </h1>
            
          <ResolutionsForm/>

          <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >
            {this.resolutions().map( (resolution) => {
              return <ResolutionSingle key={resolution._id} resolution={resolution} />
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