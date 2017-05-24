import React from 'react';
import {
	Route,
	Redirect,
	IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Index from './components/pages/Index';
import DiningTable from './components/pages/DiningTable';
import OrderList from './components/pages/OrderList';

import RequiredKnowledge from './components/pages/get-started/RequiredKnowledge';

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (

	<Route path="/" component={Master}>
		<IndexRoute component={Index}/>
		<Route path="home" component={Index}/>
		<Route path="dining-table" component={DiningTable} />
		<Route path="order-list" component={OrderList} />
		<Redirect from="get-started" to="/get-started/required-knowledge"/>
		<Route path="get-started">
			<Route path="required-knowledge" component={RequiredKnowledge}/>
		</Route>
	</Route>
);

export default AppRoutes;
