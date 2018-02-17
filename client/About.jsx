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
        <h1>About This App</h1>
        <p>This app was created by Carlos Corrales using Meteor, React, ES6 and JSX</p>
        <p>contact: carloscorralesch@gmail.com</p>
        {/*<button onClick={this.setVar}>Sign Up</button>*/}
      </ReactCSSTransitionGroup>
    )
  }
}