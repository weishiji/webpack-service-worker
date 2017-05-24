/**
 * Created by lxg on 24/03/2017.
 * 左边栏的结算中心
 */
import * as types from '../action'

export function getSettlement(settlement) {
	console.log(settlement,'this is seesssese')
	return {
		type: types.SETTLEMENT_CENTER_DATA_SUCCESS,
		settlement
	};
}


