/**
 * Created by lxg on 24/03/2017.
 */

import * as types from '../action';

const initialState = {
	settlement : {
		'list' : []
		,'totals' : {}
	}
};

export function settlementReducer(state = initialState, action){
	switch(action.type) {
		case types.SETTLEMENT_CENTER_DATA_SUCCESS:
			return Object.assign({}, state,{'settlement' : action.settlement})
	}
	return state;
}
