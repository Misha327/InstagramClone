import React from "react";
import styled from "styled-components";
import StoryPanel from "../../components/StoryPanel/StoryPanel";
import Posts from "../../components/Posts/Posts";
import AuthContext from "../../context/auth-context";
import Backdrop from "../../components/Backdrop/Backdrop";
import AddPictureModal from "../../components/AddPictureModal/AddPictureModal";
import Header from "../../components/Header/Header";
import ProfilePage from "../ProfilePage/profile";
import { Route, Switch } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";

// ES6 React classes methods do not auto-bind to class. So if we don't add this.handler = this.handler.bind(this) in constructor, this inside the handler function will reference the function closure, not the class. If don't want to bind all your functions in constructor, there are two more ways to deal with this using arrow functions. You could just write the click handler as onClick={()=> this.setState(...)}, or you could use property initialisers together with arrow functions as described here babeljs.io/blog/2015/06/07/react-on-es6-plus under "Arrow functions"

export default class MainPage extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this._isMounted = true;

		this.state = {
			isLoading: false,
			posts: [],
			creating: false,
		};
		// research this more later!!!!!!!!
		this.fetchPosts = this.fetchPosts.bind(this);
		this.refreshPosts = this.refreshPosts.bind(this);
		this.refreshDelete = this.refreshDelete.bind(this);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidMount() {
		if (this._isMounted) {
			this.fetchPosts();
		}
	}

	fetchPosts() {
		this.setState({ isLoading: true });
		const requestBody = {
			query: `
      query {
        posts {
          _id
          picture
          caption
          likes {
            _id
          }
          comments {
            _id
            text
            creator {
              _id
              nickname
            }
          }
          creator {
            _id
            nickname
            avatar {
              picture
            }
          }
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
				const posts = resData.data.posts.reverse();
				if (this._isMounted) {
					this.setState({ posts: posts, isLoading: false });
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({ isLoading: false });
			});
	}

	refreshPosts(postData) {
		this.setState((state) => {
			let updatedEvents = [...state.posts];
			updatedEvents.unshift(postData);
			return { posts: updatedEvents };
		});
	}

	refreshDelete(deletedPostId) {
		this.setState((state) => ({
			posts: state.posts.filter((post) => deletedPostId !== post._id),
		}));
	}

	creatingPost() {
		if (this._isMounted) {
			this.setState((prevState) => ({
				creating: !prevState.creating,
			}));
		}
	}

	// Need to dynamically create a Route for each unique user
	render() {
		return (
			<>
				<Header inHome={this._isMounted} refreshPosts={this.refreshPosts} />

				<PageWrapper>
					{/* <StoryPanel></StoryPanel> */}
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
						<Posts
							refreshDelete={this.refreshDelete}
							posts={this.state.posts}
						></Posts>
					)}
				</PageWrapper>
			</>
		);
	}
}

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	@media only screen and (min-width: 620px) {
		width: 600px;
	}
	margin: 0 auto;
	padding: 55px 0 60px;
`;
