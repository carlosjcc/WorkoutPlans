import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import NewWorkoutPlan from './resolutions/NewWorkoutPlan.jsx';
import WorkoutPlansList from './resolutions/WorkoutPlansList.jsx';
import About from './About.jsx';
import ResolutionDetail from './resolutions/ResolutionDetail.jsx';
import ResolutionLogin from './resolutions/ResolutionLogin.jsx';
import RoutineDetail from './resolutions/RoutineDetail.jsx';


/*FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<ResolutionLogin />)
    })
  }
});*/

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<WorkoutPlansList />)
    })
  }
});

FlowRouter.route('/about', {
  action() {
    mount(MainLayout, {
      content: (<About />)
    })
  }
});

FlowRouter.route('/new', {
  action() {
    mount(MainLayout, {
      content: (<NewWorkoutPlan />)
    })
  }
});

FlowRouter.route('/plan/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<RoutineDetail id={params.id} />)
    })
  }
});
