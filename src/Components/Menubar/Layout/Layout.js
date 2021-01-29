import React, { Component } from "react";

import classes from "./Layout.module.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import NavCategory from "../../NavCategory/NavCategory";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<div
			style={{position:'relative'}}
			>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
				<div className={`hide  container ${classes.nopadd}`}>
					<NavCategory />
				</div>
			</div>
		);
	}
}

export default Layout;
