import React from "react";
import { Link } from "../../components/Header/styles/style";
import { Spinner } from "../../components/Spinner/Spinner";
import AuthContext from "../../context/auth-context";
import {
	PageContainer,
	PageWrapper,
	LoginContainer,
	LoginWrapper,
	LoginForm,
	LoginField,
	LoginButton,
	Title,
	Button,
	MessageContainer,
	Message,
} from "./style/loginpage";

class LoginPage extends React.Component {
	state = {
		_isMounted: true,
		isLogin: true,
		notification: false,
		isLoading: false,
	};
	constructor(props) {
		super(props);
		this.nicknameEl = React.createRef();
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}

	// functional component cant use static type
	static contextType = AuthContext;

	login = () => {
		if (this.state._isMounted) {
			this.setState({ isLoading: true });
		}

		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		let requestBody = {
			query: `
      query {
        login(email: "${email}", password: "${password}") {
          userId
          token
          tokenExpiration
          nickname
        }
      }
      `,
		};

		let key = process.env.REACT_APP_URI;
		if (process.env.REACT_APP_URI === undefined) {
			key = "http://localhost:4000/graphql";
		}
		fetch(key, {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed!");
				}
				return res.json();
			})
			.then((resData) => {
				if (this.state._isMounted) {
					this.setState({ isLoading: false });

					if (resData.data.login.token) {
						this.context.login(
							resData.data.login.token,
							resData.data.login.userId,
							resData.data.login.nickname
						);
					}
				}
			})
			.catch((error) => {
				this.setState({ isLoading: false });
				console.log(error);
			});
	};

	submitHandler = (event) => {
		event.preventDefault();
		if (this.state.isLogin === true) {
			this.login();
			return;
		}
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (email.trim().length === 0 || email.trim().length === 0) {
			return;
		}

		let requestBody = {
			query: `
      query {
        login(email: "${email}", password: "${password}") {
          userId
          token
          tokenExpiration
          nickname
        }
      }
      `,
		};

		if (!this.state.isLogin) {
			const nickname = this.nicknameEl.current.value;

			requestBody = {
				query: `
        mutation {
          createUser(userInput: {nickname: "${nickname}", email: "${email}", password: "${password}"})
          {
            _id
            nickname

          }
          }
        `,
			};
		}
		let key = process.env.REACT_APP_URI;
		if (process.env.REACT_APP_URI === undefined) {
			key = "http://localhost:4000/graphql";
		}
		fetch(key, {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed!");
				}
				return res.json();
			})
			.then((resData) => {
				if (!this.state.isLogin) {
					this.setState({ notification: true });
				} else if (resData.data.login.token) {
					this.context.login(
						resData.data.login.token,
						resData.data.login.userId,
						resData.data.login.nickname
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	switchModeHandler = () => {
		this.setState((prevState) => {
			// Check why you need return here
			return { isLogin: !prevState.isLogin, notification: false };
		});
	};

	render() {
		return (
			<>
				<PageContainer>
					{this.state.isLoading && (
						<div
							style={{
								position: "absolute",
								left: "50%",
								top: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							<Spinner />
						</div>
					)}
					{!this.state.isLoading && (
						<>
							<PageWrapper>
								<MessageContainer>
									<h3 style={{ color: "white" }}>Current Features:</h3>
									<ul style={{ margin: "10px" }}>
										<li style={{ color: "white" }}>
											Authentication with encrypted password.
										</li>

										<li style={{ color: "white" }}>Upload and manage posts.</li>
										<li style={{ color: "white" }}>View and edit profiles.</li>

										<li style={{ color: "white" }}>Likes and comments.</li>
										<li style={{ color: "white" }}>Fully responsive!</li>
									</ul>
									<Message>
										Create a user with a fake email (has to include an '@'
										symbol) to login.
									</Message>
								</MessageContainer>
							</PageWrapper>

							<LoginContainer>
								<LoginWrapper>
									<Title>Instaclone</Title>

									<LoginForm onSubmit={this.submitHandler}>
										{this.state.notification && (
											<Title style={{ paddingTop: "0", color: "green" }}>
												User created
											</Title>
										)}

										{!this.state.isLogin && (
											<LoginField
												type="text"
												placeholder="Nickname"
												ref={this.nicknameEl}
											/>
										)}
										<LoginField
											type="email"
											placeholder="Email"
											ref={this.emailEl}
										></LoginField>
										<LoginField
											type="password"
											placeholder="Password"
											ref={this.passwordEl}
										></LoginField>
										<LoginButton
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.8 }}
											type="submit"
										>
											{this.state.isLogin ? "Login" : "Sign Up"}
										</LoginButton>
										<Button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.8 }}
											type="button"
											onClick={this.switchModeHandler}
										>
											Swtich to {this.state.isLogin ? "Sign Up" : "Login"}
										</Button>
									</LoginForm>
								</LoginWrapper>
							</LoginContainer>
						</>
					)}
				</PageContainer>
			</>
		);
	}
}

export default LoginPage;
