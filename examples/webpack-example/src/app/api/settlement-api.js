/**
 * Created by lxg on 24/03/2017.
 */
import store from '../store';
import * as settlementAction from '../actions/settlement-action';

var Sales = {
	'list': [
		{
			'product_id' : '0'
			,'title' : '提拉米苏'
			,'size' : '中杯'
			,'quantity' : 1
			,'remark' : ['加糖','加冰','加水','拿铁','星巴克']
			,'price' : {
				unitPrice : 28.99
				,priceTotal : 28.99
				,'currency' : '¥'
			}

		}
	]
	,'totals' : {
		'remark' : ''
		,'totalPrice' : '28.99'
		,'currency' : '¥'
	}
}


export function getSettlementDataList(){

	store.dispatch(settlementAction.getSettlement(Sales))

}

export function updateSettlementData(_data){
	var totalPrice = 0;
	Sales.list.map((data,i)=>{
		if(data.product_id == _data.product_id){
			Sales.list[i] = _data;
		}
		totalPrice += data.price.priceTotal;
	});
	Sales.totals.totalPrice = totalPrice.toFixed(2);
	Sales = Object.assign({},Sales);


	store.dispatch(settlementAction.getSettlement(Sales));
}

export function pushSettlementData(_data){
	Sales.list.push(_data)
	var totalPrice = 0;
	Sales.list.map((data,i)=>{
		if(data.product_id == _data.product_id){
			Sales.list[i] = _data;
		}
		totalPrice += data.price.priceTotal;
	});
	Sales.totals.totalPrice = totalPrice.toFixed(2);
	Sales = Object.assign({},Sales);

	store.dispatch(settlementAction.getSettlement(Sales));

}

export function getSettlementData(product_id){
	Sales.list.map((data)=>{
		if(data.product_id == product_id){
			return data;
		}
	})
}
