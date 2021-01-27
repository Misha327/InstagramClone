import React, { Component } from "react";
import MainPage from "../pages/MainPage/MainPage";
import ProfilePage from "../pages/ProfilePage/profile";
import AddPictureModal from "../components/AddPictureModal/AddPictureModal";
import styled from "styled-components/macro";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

export default class PagesCoupler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creating: false,
		};
		// this.creatingPost = this.creatingPost.bind(this);
		// this.handleBackdropClick = this.handleBackdropClick.bind(this);
		this.toggleState = this.toggleState.bind(this);
		this.generateKey = this.generateKey.bind(this);
	}

	// Try to update the pages after posting
	toggleState() {
		this.setState((state) => ({ creating: !state.creating }));
	}

	generateKey() {
		return Math.random();
	}

	render() {
		return (
			<>
				<Route path="/" render={(props) => <MainPage {...props} />} exact />

				<Route
					path="/profile/:nickname"
					render={(props) => (
						<ProfilePage timestamp={new Date().toString()} {...props} />
					)}
					exact
				/>
			</>
		);
	}
}
