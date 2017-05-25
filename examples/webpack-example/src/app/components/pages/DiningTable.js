/**
 * Created by lxg on 29/03/2017.
 */
import React, {Component, PropTypes} from 'react';
import HomeFeature from './HomeFeature';
import FullWidthSection from '../FullWidthSection';
import RaisedButton from 'material-ui/RaisedButton';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';
const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin : 24
	},
	buttonStyle : {
		margin: 12,
	}
}
class DiningTable extends Component {

	render() {

		return (
			<FullWidthSection>
				<div style={styles.root}>
					<RaisedButton className="notification-btn" label="Secondary" secondary={true} style={styles.buttonStyle} />
				</div>
			</FullWidthSection>

		);
	}
}

export default withWidth()(DiningTable);
