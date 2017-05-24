import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';



import * as workbenchData from '../../api/workbench-api';
import * as settlementData from '../../api/settlement-api';
const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		display: 'flex',
		//flexWrap: 'nowrap',
		//overflowX: 'auto',
	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	},

};


/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */

class Index extends Component{
	constructor(props){
		super(props);
		workbenchData.getMainData();
	}
	componentDidMount(){

	}
	_handlerAddProduct(){
		settlementData.pushSettlementData({
			'product_id' : Math.random()
			,'title' : '提拉米苏'
			,'size' : '中杯'
			,'quantity' : 1
			,'remark' : ['加糖','加冰','加水','拿铁','星巴克']
			,'price' : {
				unitPrice : 28.99
				,priceTotal : 28.99
				,'currency' : '¥'
			}

		})
	}
	render(){
		return (
			<div style={styles.root}>
				<Title render={(previousTitle) => `Required Knowledge - ${previousTitle}`} />
				<GridList style={styles.gridList}
				          cols={4}
				>
					{this.props.products.map((tile) => (
						<GridTile
							key={tile.img}
							title={tile.title}
							actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
							titleStyle={styles.titleStyle}
							titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							onTouchTap={()=>this._handlerAddProduct()}
						>
							<img src={tile.img} />
						</GridTile>
					))}
				</GridList>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		products: store.workbenchState.products
	};
};
export default connect(mapStateToProps)(Index);
