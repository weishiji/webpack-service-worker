import { combineReducers } from 'redux';

// Reducers
import {workbenchReducer} from './workbench-reducer';
import {settlementReducer} from './settlement-reducer';

// Combine Reducers
var reducers = combineReducers({
	workbenchState : workbenchReducer,
	settlementReducer : settlementReducer

});

export default reducers;