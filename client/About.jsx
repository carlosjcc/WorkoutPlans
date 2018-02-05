import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class About extends Component {

  setVar() {
      Session.set('Meteor.loginButtons.dropdownVisible', true);
    }

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
        <h1>About Us</h1>
        <p>asdfasdf sd fas asdf asdf asdf asdf sdfsdf asdf asdf asdf asdf asdf asdf </p>
        <button onClick={this.setVar}>Sign Up</button>
      </ReactCSSTransitionGroup>
    )
  }
}