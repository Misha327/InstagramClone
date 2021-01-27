import React from "react";
import styled from "styled-components/macro";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header/Header";

import AuthContext from "./context/auth-context";
import PagesCoupler from "./pages/PagesCoupler";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
// });

class App extends React.Component {
	state = {
		token: null,
		userId: null,
		nickname: null,
	};

	componentDidMount() {
		if (
			sessionStorage.getItem("token") != null &&
			sessionStorage.getItem("userId") != null &&
			sessionStorage.getItem("nickname") != null
		) {
			this.setState({
				token: sessionStorage.getItem("token"),
				userId: sessionStorage.getItem("userId"),
				nickname: sessionStorage.getItem("nickname"),
			});
		}
	}

	login = (token, userId, nickname) => {
		this.setState({ token, userId, nickname });
		sessionStorage.setItem("token", token);
		sessionStorage.setItem("userId", userId);
		sessionStorage.setItem("nickname", nickname);
	};

	logout = () => {
		this.setState({ token: null, userId: null, nickname: null });
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("nickname");
	};

	changeNickname = (newNickname) => {
		this.setState({ nickname: newNickname });
		sessionStorage.setItem("nickname", this.state.nickname);
	};

	render() {
		return (
			<Router>
				{/* Used globally as context when imported */}
				<AuthContext.Provider
					value={{
						token: this.state.token,
						userId: this.state.userId,
						nickname: this.state.nickname,
						login: this.login,
						logout: this.logout,
						changeNickname: this.changeNickname,
					}}
				>
					<Switch>
						{!this.state.token && <Redirect from="/" to="/login" exact />}
						{this.state.token && <Redirect from="/login" to="/" exact />}
						{!this.state.token && (
							<Route path="/login" component={LoginPage} exact />
						)}

						{this.state.token && (
							<>
								<PagesCoupler updateNickname={this.changeNickname} />
							</>
						)}

						{!this.state.token && <Redirect to="/login" exact />}
					</Switch>
				</AuthContext.Provider>
			</Router>
			// <Router>
			// 	<>
			// 		<PagesCoupler />
			// 	</>
			// </Router>
		);
	}
}
export default App;
