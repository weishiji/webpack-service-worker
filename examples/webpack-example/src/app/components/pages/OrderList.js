/**
 * Created by lxg on 29/03/2017.
 */
import React, {Component, PropTypes} from 'react';
import FullWidthSection from '../FullWidthSection';
import RaisedButton from 'material-ui/RaisedButton';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';


import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
		marginBottom : '24px'
	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	},
	cardMedia : {
		backgroundColor : blue500
		,minHeight : '200px'
		,height : 'auto'
		,padding : '12px'
		,color : '#FFF'
		,fontSize : '16px'
	},
	block: {
		maxWidth: 250,
	},
	checkbox: {
	},
	lineMargin : {
		marginTop : '12px'
		,marginBottom : '12px'
	}

};

class OrderList extends Component {
	constructor(){
		super()
		this.listData = [1,2,3,4,5,6,7];
	}

	render() {

		return (
			<FullWidthSection>
				<GridList style={styles.gridList}
				          cols={4}
				          cellHeight="auto"
				>
					{this.listData.map(() => {
						return (
							<Card>
								<CardMedia style={styles.cardMedia}>
									<p>单号：B</p>
									<p>时间：2017-10-10</p>
									<p>单号：B</p>
									<p>时间：2017-10-10</p>
									<p>单号：B</p>
									<p>时间：2017-10-10</p>
								</CardMedia>
								<CardTitle title="Card title" subtitle="Card subtitle" />
								<CardText>
									<div style={styles.block}>
										<Checkbox
											label="Simple"
											style={styles.checkbox}
										/>
										<Divider style={styles.lineMargin}/>
										<Checkbox
											label="Simple"
											style={styles.checkbox}
										/>
										<Divider style={styles.lineMargin}/>
										<Checkbox
											label="Simple"
											style={styles.checkbox}
										/>
										<Divider style={styles.lineMargin}/>
									</div>
								</CardText>
								<CardActions>
									{/*<FlatButton label="Action1" />
									 <FlatButton label="Action2" />*/}
								</CardActions>
							</Card>
						)
					})}
				</GridList>
			</FullWidthSection>

		);
	}
}

export default withWidth()(OrderList);
