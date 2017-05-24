import React from 'react';
import {render} from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import AppRoutes from './AppRoutes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import { Provider } from 'react-redux';
import registerServiceWorker from './register-service-worker'
import store from './store';


registerServiceWorker();

// Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/reactjs/react-router/blob/master/docs/guides/README.md
 */
render(
	<Provider store={store}>
	  <Router
	    history={useRouterHistory(createHashHistory)({queryKey: false})}
	    onUpdate={() => window.scrollTo(0, 0)}
	  >
	    {AppRoutes}
	  </Router>
	</Provider>
, document.getElementById('app'));