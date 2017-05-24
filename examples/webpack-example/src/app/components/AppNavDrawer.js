import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {darkWhite, lightWhite,grey600,grey700, grey800,grey900,} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentPencil from './svg-icons/content/pencil';
import RaisedButton from 'material-ui/RaisedButton';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import MobileTearSheet from './MobileTearSheet'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const SelectableList = makeSelectable(List);



import { connect } from 'react-redux';
import * as settlementApi from './../api/settlement-api';



const styles = {
	logo: {
		cursor: 'pointer',
		fontSize: 24,
		color: typography.textFullWhite,
		lineHeight: `${spacing.desktopKeylineIncrement}px`,
		fontWeight: typography.fontWeightLight,
		backgroundColor: cyan500,
		paddingLeft: spacing.desktopGutter,
		marginBottom: 8,
	},
	version: {
		paddingLeft: spacing.desktopGutterLess,
		fontSize: 16,
	},
	pencilEdit : {
		position: 'absolute'
		,right: '10px'
		,top: '10px'
	}
	,price : {
		position: 'absolute'
		,right: '0'
		,top: '10px'
		,color : '#333'
		,fontSize : '20px'

	}
	,orderCard : {
		marginBottom : '12px'
	}
	,settlementList : {
		overflowY : 'auto'
	}
	,settlementFooter : {
		position : 'absolute'
		,bottom : '73px'
		,width : '100%'
	}
	,makeOrderButton : {
		lineHeight : '60px'
		,height : '60px'
		,fontSize : '20px'
	}
	,modalTitle : {
		backgroundColor : grey800
		,color : '#FFF'
	}
	,buttonMargin : {
		margin : 12
	}
};
class AppNavDrawer extends Component {
	static propTypes = {
		docked: PropTypes.bool.isRequired,
		location: PropTypes.object.isRequired,
		onChangeList: PropTypes.func.isRequired,
		onRequestChangeNavDrawer: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,
		style: PropTypes.object,
	};

	static contextTypes = {
		muiTheme: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
	};
	constructor(){
		super();
		this.state = {
			open : false
			,listHeight : window.innerHeight - (64+72+72)
		}
		settlementApi.getSettlementDataList()
	}

	componentDidMount() {
		window.onresize = () => {
			this.setState({
				listHeight : window.innerHeight - (64+72+72)
			})
		}

	}

	handleTouchTapHeader = () => {
		this.context.router.push('/');
		this.props.onRequestChangeNavDrawer(false);
	};

	_handlerGetMore() {
		//workbenchData.getMainMore();
	}
	_handleOpen(){
		this.setState({
			open : true
		})
	}
	_handlerQuantity(data,num){
		if(data.quantity < 2 && num == -1) return;
		data.quantity += num;
		data.price.priceTotal = data.price.unitPrice * data.quantity;
		settlementApi.updateSettlementData(data);

	}
	handleClose = () => {
		this.setState({
			open : false
		})
	};
	render() {
		const {list,totals} = this.props.settlement;
		const {
			location,
			docked,
			onRequestChangeNavDrawer,
			onChangeList,
			open,
			style,
		} = this.props;
		return (
			<Drawer
				style={style}
				docked={docked}
				open={open}
				onRequestChange={onRequestChangeNavDrawer}
				containerStyle={{zIndex: zIndex.drawer - 100}}
			>
				<div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
					BETA
				</div>
				{/*<SelectableList
					value={location.pathname}
					onChange={onChangeList}
				>
					<ListItem
						primaryText="Get Started"
						primaryTogglesNestedList={true}
						nestedItems={[
							<ListItem primaryText="Required Knowledge" value="/get-started/required-knowledge"/>,
						]}
					/>
				</SelectableList>
				<Divider/>*/}
				<div id="settlement-list"
					style={Object.assign({
						height : this.state.listHeight + 'px'
					},styles.settlementList)}
				>
					{list.map((data,key)=>{
						var remark = data.remark.join(' ');
						return (
							<Card style={styles.orderCard} key={key}>
								<CardTitle title={data.title} subtitle={remark} >
									<FloatingActionButton
										style={styles.pencilEdit}
										mini={true}
										onTouchTap={()=>{this._handleOpen()}}
									>
										<ContentPencil/>
									</FloatingActionButton>
								</CardTitle>

								<Divider/>
								<CardActions>
									<FloatingActionButton
										secondary={true}
										mini={true}
										onTouchTap={() => this._handlerQuantity(data,-1)}
									>
										<ContentRemove />
									</FloatingActionButton>
									<FloatingActionButton
										mini={true}
										disabled={true}
									>
										{data.quantity}
									</FloatingActionButton>
									<FloatingActionButton
										secondary={true}
										mini={true}
										onTouchTap={()=> {
											//this._handlerGetMore()
											this._handlerQuantity(data,1)
										}}
									>
										<ContentAdd />
									</FloatingActionButton>
									<FlatButton
										disabled={true}
										style={styles.price}
									>
										{data.price.currency + data.price.priceTotal.toFixed(2)}
									</FlatButton>
								</CardActions>
							</Card>
						)
					})}
				</div>

				<div style={styles.settlementFooter}>
					<RaisedButton
						labelStyle={styles.makeOrderButton}
						buttonStyle={styles.makeOrderButton}
						primary={true}
						fullWidth={true}
						label={'下单：' + totals.currency + totals.totalPrice}
						overlayStyle={styles.makeOrderButton}
					/>
					<Divider/>
				</div>
				{this.renderEditModal()}
			</Drawer>
		);
	}
	renderEditModal(){
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
		];

		return (
			<Dialog
				title="Dialog With Actions"
				actions={actions}
				modal={true}
				open={this.state.open}
				onRequestClose={this.handleClose}
				titleStyle={styles.modalTitle}
				autoScrollBodyContent={true}
			>
				<div>
					<p>规格</p>
					<div>
						<RaisedButton label="Default" />
						<RaisedButton label="Primary" primary={true} style={styles.buttonMargin} />
						<RaisedButton label="Secondary" secondary={true} style={styles.buttonMargin} />
						<RaisedButton label="Disabled" disabled={true} style={styles.buttonMargin} />
					</div>
				</div>
				<div>
					<p>规格</p>
					<div>
						<RaisedButton label="Default" />
						<RaisedButton label="Primary" primary={true} style={styles.buttonMargin} />
						<RaisedButton label="Secondary" secondary={true} style={styles.buttonMargin} />
						<RaisedButton label="Disabled" disabled={true} style={styles.buttonMargin} />
					</div>
				</div>
				<div>
					<p>规格</p>
					<div>
						<RaisedButton label="Default" />
						<RaisedButton label="Primary" primary={true} style={styles.buttonMargin} />
						<RaisedButton label="Secondary" secondary={true} style={styles.buttonMargin} />
						<RaisedButton label="Disabled" disabled={true} style={styles.buttonMargin} />
					</div>
				</div>
			</Dialog>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		settlement: store.settlementReducer.settlement
	};
};

export default connect(mapStateToProps)(AppNavDrawer);