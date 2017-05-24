import * as types from '../action';

const initialState = {
	products : []
};

export function workbenchReducer(state = initialState, action){
	switch(action.type) {
		case types.GET_WORKBENCH_DATA_SUCCESS:
			return Object.assign({}, state,{'products' : action.products})
	}
	return state;
}
