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
import TextField from 'material-ui/TextField';
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
	constructor(){
		super();
		this.name = '';
		this.password = '';
		if (navigator.credentials) {
            navigator.credentials.get({
                password: true,
				unmediated: true
            }).then(function (c) {
                console.log(c,'this is c')
            });
        }
	}
	handlerClick(){
		console.log(this.name,this.password)
		var _name = this.name;
			var _password= this.password;
			if (navigator&&navigator.credentials) {
				var credential = new PasswordCredential({
                    id: _name,
                    password: _password,
                    name: _name,
                });
				navigator.credentials.store(credential);        
                // fetch("/ajax/loginHandler.js?action=login", { method: "POST", credentials: credential }).then(function (responese) {
                //     if (responese && responese.status === 200) {
                //         return responese.json();
                //     }
                // }).then(function(json){
                // 	if (json && json.code == 1) {
                // 		navigator.credentials.store(credential);        
                //         location.href = $("#returnUrl").val() || window.Url.homeUrl;
                //     }
                // });
			}
	}
	handlerCancel(){
		console.log('hello')
		if (navigator.credentials) {
			console.log('hello world')
			navigator.credentials.requireUserMediation();
		};
	}
	render() {

		return (
			<FullWidthSection>
				<div style={styles.root}>
					<RaisedButton className="notification-btn" label="Secondary" secondary={true} style={styles.buttonStyle} />
				</div>
				<div>
					<TextField
					hintText="user name"
					onChange={(e) => {this.name = e.target.value}}
					/><br />
					<br />
					<TextField
					hintText="password"
					onChange={(e) => {this.password = e.target.value}}
					/><br />
					<RaisedButton onClick={()=>this.handlerClick()} className="notification-btn" label="Submit" secondary={true} style={styles.buttonStyle} />
					<RaisedButton onClick={()=>this.handlerCancel()} className="notification-btn" label="Cancel" secondary={true} style={styles.buttonStyle} />
				</div>
			</FullWidthSection>

		);
	}
}

export default withWidth()(DiningTable);
