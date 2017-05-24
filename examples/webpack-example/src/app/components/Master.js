import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900,grey600,grey700} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawer';
import FullWidthSection from './FullWidthSection';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';


class Master extends Component {
	static propTypes = {
		children: PropTypes.node,
		location: PropTypes.object,
		width: PropTypes.number.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	static childContextTypes = {
		muiTheme: PropTypes.object,
	};

	state = {
		navDrawerOpen: false,
	};

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme,
		};
	}

	componentWillMount() {
		this.setState({
			muiTheme: getMuiTheme(),
		});
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
		this.setState({
			muiTheme: newMuiTheme,
		});
	}

	getStyles() {
		const styles = {
			appBar: {
				position: 'fixed',
				// Needed to overlap the examples
				zIndex: this.state.muiTheme.zIndex.appBar + 1,
				top: 0,
			},
			root: {
				paddingTop: spacing.desktopKeylineIncrement,
				minHeight: 400,
				paddingBottom : spacing.desktopKeylineIncrement,
			},
			content: {
				margin: spacing.desktopGutter,
				
			},
			contentWhenMedium: {
				margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
			},
			footer: {
				backgroundColor: grey900,
				textAlign: 'center'
				,position : 'fixed'
				,width : '100%'
				,zIndex : this.state.muiTheme.zIndex.appBar + 101
				,paddingBottom : 0
				,paddingTop : 0
				,paddingLeft : 0
				,paddingRight : 0
				,bottom : 0
			},
			a: {
				color: darkWhite,
			},
			p: {
				margin: '0 auto',
				padding: 0,
				color: lightWhite,
				maxWidth: 356,
			},
			browserstack: {
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'center',
				margin: '25px 15px 0',
				padding: 0,
				color: lightWhite,
				lineHeight: '25px',
				fontSize: 12,
			},
			browserstackLogo: {
				margin: '0 3px',
			},
			iconButton: {
				color: darkWhite,
			},
			pageTabs : {
				backgroundColor : grey700
			}
		};

		if (this.props.width === MEDIUM || this.props.width === LARGE) {
			styles.content = Object.assign(styles.content, styles.contentWhenMedium);
		}

		return styles;
	}

	handleTouchTapLeftIconButton = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	};

	handleChangeRequestNavDrawer = (open) => {
		this.setState({
			navDrawerOpen: open,
		});
	};

	handleChangeList = (event, value) => {
		this.context.router.push(value);
		this.setState({
			navDrawerOpen: false,
		});
	};

	handleChangeMuiTheme = (muiTheme) => {
		this.setState({
			muiTheme: muiTheme,
		});
	};
	_handlerTabChange(value){
		this.context.router.push(value)
	}

	render() {
		const {
			location,
			children,
		} = this.props;

		let {
			navDrawerOpen,
		} = this.state;

		const {
			prepareStyles,
		} = this.state.muiTheme;

		const router = this.context.router;
		const styles = this.getStyles();

		//TODO:根据当前路径判断是否展开左边栏
		const title =
			router.isActive('/dining-table') ? 'Dining Table' :
				router.isActive('/order-list') ? 'Order List' :
					router.isActive('/components') ? 'Components' :
						router.isActive('/discover-more') ? 'Discover More' : '';
		let docked = false;
		let showMenuIconButton = true;
		if (this.props.width === LARGE && title === '') {
			docked = true;
			navDrawerOpen = true;
			showMenuIconButton = false;

			styles.navDrawer = {
				zIndex: styles.appBar.zIndex - 1,
			};
			styles.root.paddingLeft = 256;
			//styles.footer.paddingLeft = 256;
		}
		return (
			<div>
				<Title render="Material-UI"/>
				<AppBar
					onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
					title={title}
					zDepth={0}
					iconElementRight={
						<IconButton
							iconClassName="muidocs-icon-custom-github"
							href="https://github.com/callemall/material-ui"
						/>
					}
					style={styles.appBar}
					showMenuIconButton={showMenuIconButton}
				/>
				{title === '' ?
					 <div style={prepareStyles(styles.root)}>
						 <div style={prepareStyles(styles.content)}>
						    {React.cloneElement(children, {
						    onChangeMuiTheme: this.handleChangeMuiTheme,
						 })}
					    </div>
					 </div> : children
				 }
				<AppNavDrawer
					style={styles.navDrawer}
					location={location}
					docked={docked}
					onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
					onChangeList={this.handleChangeList}
					open={navDrawerOpen}
				/>
				<FullWidthSection style={styles.footer}>
					<Tabs
						onChange={(e)=>{this._handlerTabChange(e)}}
					    value={router.location.pathname}
						tabItemContainerStyle={styles.pageTabs}
					>
						<Tab
							icon={<FontIcon className="material-icons">phone</FontIcon>}
							label="RECENTS"
							value="/"
						/>
						<Tab
							icon={<FontIcon className="material-icons">favorite</FontIcon>}
							label="FAVORITES"
							value="/dining-table"
						/>
						<Tab
							icon={<MapsPersonPin />}
							label="NEARBY"
							value="/order-list"
						/>
					</Tabs>
				</FullWidthSection>
			</div>
		);
	}
}

export default withWidth()(Master);
