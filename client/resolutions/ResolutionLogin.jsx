import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class ResolutionLogin extends React.Component {

  render() {
    return (
      <ReactCSSTransitionGroup
            component="div"
            transitionName="route"
            transitionEnterTimeout={600}
            transitionAppearTimeout={600}
            transitionLeaveTimeout={400}
            transitionAppear={true}
            >
        <h1> Please Log In - {Session.get('test')} </h1>



        

      </ReactCSSTransitionGroup>
    )
  }
}