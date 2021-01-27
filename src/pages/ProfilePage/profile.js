import React, { Component } from "react";

import {
	GridContainer,
	Container,
	ProfileContainer,
	Avatar,
	Bio,
	Username,
	ProfileTextContainer,
	AvatarContainer,
	ChangeAvatarButton,
	ChangeDetailsButton,
	TopContainer,
	BioInput,
	SubmitChangesButton,
	BioForm,
	NicknameInput,
	ProfileWrapper,
	FlexContainer,
} from "./style";

import MediaQuery from "react-responsive";

import AddPictureModal from "../../components/AddPictureModal/AddPictureModal";
import authContext from "../../context/auth-context";
import { GridList } from "../../components/GridPost/GridList";
import { Nickname } from "../../components/Comments/style/style";
import Header from "../../components/Header/Header";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Spinner } from "../../components/Spinner/Spinner";

export default class profile extends Component {
	constructor(props) {
		super(props);
		this.bioRef = React.createRef();
		this.nicknameRef = React.createRef();
		this.state = {
			isCreator: false,
			avatar: "",
			changingAvatar: false,
			posts: [],
			nickname: "",
			updatingBio: false,
			inPost: false,
			avatarPublicId: "",
			isLoading: false,
		};
		this._isMounted = true;
		let nicknameValue, bioValue;

		this.refreshDelete = this.refreshDelete.bind(this);
		this.fetchUser = this.fetchUser.bind(this);
		this.handleButton = this.handleButton.bind(this);
		this.refreshPosts = this.refreshPosts.bind(this);
		this.toggleUpdatingBio = this.toggleUpdatingBio.bind(this);
		this.updateBio = this.updateBio.bind(this);
		this.toggleInPost = this.toggleInPost.bind(this);
	}

	static contextType = authContext;

	handleButton() {
		this.setState((state) => ({ changingAvatar: !state.changingAvatar }));
	}

	toggleUpdatingBio() {
		this.setState((state) => ({ updatingBio: !state.updatingBio }));
	}

	componentDidMount() {
		const {
			match: { params },
		} = this.props;

		this.fetchUser();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(previousProps) {
		if (
			previousProps.match.params.nickname !== this.props.match.params.nickname
		) {
			this.fetchUser();
		}
	}
	// Check a better solution as it requires 2 click to go back to profile from another page

	fetchUser() {
		this.setState({ isLoading: true });

		const nickname = this.props.match.params.nickname;

		const requestBody = {
			query: `
            query {
              userByName(nickname: "${nickname}"){
                _id
                nickname
                bio
                createdPosts {
                  _id
                  picture
                  caption
                  likes {
                    _id
                  }
                  creator {
                    nickname
                    avatar {
                      picture
                    }
                  }
                  comments {
                    text
                    creator {
                      nickname
                    }
                  }
                }
                avatar {
                  picture
                  public_id
                }
              }
            }
          `,
		};

		fetch(process.env.REACT_APP_URI || "http://localhost:4000/graphql", {
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
				if (this.context.userId == resData.data.userByName._id) {
					this.setState({
						isCreator: true,
					});
				}
				const posts = resData.data.userByName.createdPosts;
				let avatar;
				if (resData.data.userByName.avatar != null) {
					avatar = resData.data.userByName.avatar.picture;
				}
				const nickname = resData.data.userByName.nickname;
				const bio = resData.data.userByName.bio;
				this.nicknameValue = nickname;
				this.bioValue = bio;
				if (this._isMounted) {
					if (avatar == null) {
						this.setState({
							posts: posts,
							nickname: nickname,
							bio: bio,
						});
					} else {
						this.setState({
							avatarPublicId: resData.data.userByName.avatar.public_id,
							posts: posts,
							avatar: avatar,
							nickname: nickname,
							bio: bio,
						});
					}
				}
				this.setState({ isLoading: false });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ isLoading: false });
			});
	}

	refreshPosts(postData) {
		if (this._isMounted) {
			this.setState((state) => {
				let updatedEvents = [...state.posts];
				updatedEvents.push(postData);
				return { posts: updatedEvents };
			});
		}
	}

	refreshDelete(deletedPostId) {
		this.setState((state) => ({
			posts: state.posts.filter((post) => deletedPostId !== post._id),
		}));
	}

	updateBio = (event) => {
		this.setState({ isLoading: true });

		event.preventDefault();

		let bio = this.bioRef.current.value;
		const nickname = this.nicknameRef.current.value;
		bio = bio.trim();

		const requestBody = {
			query: `
        mutation{
          updateBio(profileData: {bio: "${bio}", nickname: "${nickname}" }) {
            nickname
            bio
          }
        }
      `,
		};

		const token = this.context.token;

		fetch(process.env.REACT_APP_URI || "http://localhost:4000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed!");
				}
				return res.json();
			})
			.then((resData) => {
				this.context.changeNickname(resData.data.updateBio.nickname);
				this.setState((state) => ({
					bio: resData.data.updateBio.bio,
					nickname: resData.data.updateBio.nickname,
				}));
				this.toggleUpdatingBio();
				this.setState({ isLoading: false });
			})
			.catch((error) => {
				this.setState({ isLoading: false });

				throw error;
			});
	};

	toggleInPost() {
		this.setState({
			inPost: true,
		});
	}

	render() {
		return (
			<>
				<Header inProfile={this._isMounted} refreshPosts={this.refreshPosts} />
				{this.state.isLoading && (
					<div
						style={{
							position: "fixed",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<Spinner />
					</div>
				)}
				{!this.state.isLoading && (
					<Container>
						{this.state.changingAvatar && this.state.isCreator && (
							<AddPictureModal
								changingAvatar={this.state.changingAvatar}
								handleExit={this.handleButton}
								refreshPosts={this.fetchUser}
								avatar={this.state.avatar}
							/>
						)}
						<ProfileContainer>
							<ProfileWrapper>
								<FlexContainer>
									<AvatarContainer>
										<ChangeAvatarButton onClick={this.handleButton}>
											<Avatar src={this.state.avatar}></Avatar>
										</ChangeAvatarButton>
									</AvatarContainer>
								</FlexContainer>

								<ProfileTextContainer>
									{this.state.updatingBio ? (
										<BioForm onSubmit={this.updateBio}>
											<label>Username</label>
											<NicknameInput
												defaultValue={this.nicknameValue}
												ref={this.nicknameRef}
											/>

											<label>Bio</label>
											<BioInput
												defaultValue={this.bioValue}
												ref={this.bioRef}
											/>
											<SubmitChangesButton>Accept Changes</SubmitChangesButton>
										</BioForm>
									) : (
										<>
											<TopContainer>
												<Username>{this.props.match.params.nickname}</Username>
												{this.state.isCreator && (
													<ChangeDetailsButton onClick={this.toggleUpdatingBio}>
														Edit Details
													</ChangeDetailsButton>
												)}
											</TopContainer>
											<MediaQuery query="(min-width: 700px)">
												<Bio>{this.state.bio}</Bio>
											</MediaQuery>
										</>
									)}
								</ProfileTextContainer>
							</ProfileWrapper>
							<MediaQuery query="(max-width: 700px)">
								<Bio>{this.state.bio}</Bio>
							</MediaQuery>
						</ProfileContainer>
						<GridContainer>
							<GridList
								isCreator={this.state.isCreator}
								refreshDelete={this.refreshDelete}
								clickHandle={this.toggleInPost}
								posts={this.state.posts}
							></GridList>
						</GridContainer>
					</Container>
				)}
			</>
		);
	}
}
