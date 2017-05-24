import * as types from '../action'

export function getWorkBenchDataSuccess(products) {
	return {
		type: types.GET_WORKBENCH_DATA_SUCCESS,
		products
	};
}

