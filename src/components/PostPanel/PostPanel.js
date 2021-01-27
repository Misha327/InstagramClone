import React from "react";
import {
	Container,
	BottomSection,
	ActionContainer,
	ListContainer,
	BookmarkButton,
	ActionButton,
	LikeBox,
	TimeStampWrapper,
	TimeStamp,
} from "./style/style";

import UserSection from "../UserSection/UserSection";
import CaptionBox from "../CaptionBox/CaptionBox";
import PictureContainer from "../OpenPostPanel/Picture/PictureContainer";
import CommentBox from "../CommentBox/CommentBox";
import likeIcon from "../../images/actionbar/svgexport-2.svg";
import redHeartIcon from "../../images/PostIcons/heart-fill-red.svg";
import commentIcon from "../../images/actionbar/svgexport-3.svg";
import shareIcon from "../../images/actionbar/svgexport-4.svg";
import bookmarkIcon from "../../images/actionbar/svgexport-5.svg";
import CommentsList from "../Comments/CommentsList";

import authContext from "../../context/auth-context";
const { cloudinary } = require("../../utils/cloudinary.js");

export default class PostPanel extends React.Component {
	constructor(props) {
		super(props);
		this._isMounted = true;

		this.state = {
			isCreator: false,
			comments: [],
			inOptions: false,
			isLiked: false,
			numLikes: 0,
		};
		this.displayOptionsModal = this.displayOptionsModal.bind(this);
		this.refreshComments = this.refreshComments.bind(this);
		this.updateAfterDelete = this.updateAfterDelete.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.toggleIsLiked = this.toggleIsLiked.bind(this);
	}

	static contextType = authContext;

	componentDidMount() {
		if (this._isMounted) {
			this.props.likes.map((like) => {
				if (like._id == this.context.userId) {
					this.setState({
						isLiked: true,
					});
				}
			});
			this.setState({
				numLikes: this.props.likes.length,
			});

			if (this.props.creator._id == this.context.userId) {
				this.setState({
					isCreator: true,
				});
			}

			this.setState({
				comments: this.props.comments,
			});
		}
	}

	toggleIsLiked() {
		if (this.state.isLiked == false) {
			this.setState((state) => ({
				numLikes: state.numLikes + 1,
			}));
		} else if (this.state.isLiked == true) {
			this.setState((state) => ({
				numLikes: state.numLikes - 1,
			}));
		}
		this.setState((state) => ({
			isLiked: !state.isLiked,
		}));
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	displayOptionsModal() {
		if (this._isMounted) {
			this.setState((state) => ({
				inOptions: !state.inOptions,
			}));
		}
	}

	deletePost() {
		const requestBody = {
			query: `
        mutation {
          deletePost(postId: "${this.props.id}") {
            _id
            public_id
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
				this.props.handleDelete(resData.data.deletePost._id);
				console.log(resData);
				this.displayOptionsModal();
				if (resData.data !== null) {
					this.deleteFromCloud(resData.data.deletePost.public_id);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteFromCloud = async (picturePublicId) => {
		try {
			const uploadRespone = await cloudinary.uploader.destroy(picturePublicId);
			console.log(uploadRespone);
		} catch (error) {
			throw error;
		}
	};

	refreshComments(comment) {
		if (this._isMounted) {
			this.setState((state) => {
				let updatedComments = [...state.comments];
				updatedComments.push(comment);
				return { comments: updatedComments };
			});
		}
	}

	updateAfterDelete(deletedCommentId) {
		console.log("in updateAndDelete");
		if (this._isMounted) {
			this.setState((state) => {
				const updatedComments = state.comments.filter((comment) => {
					return comment._id !== deletedCommentId;
				});
				return { comments: updatedComments };
			});
		}
	}

	handleLike = () => {
		const postId = this.props.id;
		const userId = this.context.userId;

		if (postId === null || userId === null) {
			console.log("not wokring ");
		}

		const requestBody = {
			query: ` 
      mutation {
        likePost(
          likeInput: {
            postId: "${postId}"
            userId: "${userId}"
          }
        ) {
          _id
          likes {
            _id
          }
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
				this.toggleIsLiked();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const creator = this.props.creator;
		// const avatar = this.props.avatar;
		const picture = this.props.picture;
		const caption = this.props.caption;
		const comments = this.props.comments;

		return (
			<>
				<Container>
					<UserSection
						creatorUsername={this.props.nickname}
						avatar={this.props.avatar}
						isCreator={this.state.isCreator}
						toggleInOptions={this.displayOptionsModal}
						inOptions={this.state.inOptions}
						handleDelete={this.deletePost}
					></UserSection>

					<PictureContainer
						postId={this.props.id}
						picture={picture}
						likes={this.props.likes}
						toggleIsLiked={this.toggleIsLiked}
						isLiked={this.state.isLiked}
					></PictureContainer>

					<BottomSection>
						<ActionContainer>
							<ActionButton
								onClick={this.handleLike}
								src={this.state.isLiked ? redHeartIcon : likeIcon}
								// style={{ height: "30px", width: "30px" }}
							></ActionButton>
							<ActionButton
								style={{ padding: "1px" }}
								src={commentIcon}
							></ActionButton>
							<ActionButton
								style={{ padding: "1px" }}
								src={shareIcon}
							></ActionButton>
							<ListContainer>
								{/* <ListIndicator></ListIndicator> */}
							</ListContainer>
							<BookmarkButton src={bookmarkIcon}></BookmarkButton>
						</ActionContainer>
						{this.state.numLikes == 0 || this.state.numLikes > 1 ? (
							<LikeBox>{this.state.numLikes} likes</LikeBox>
						) : (
							<LikeBox>{this.state.numLikes} like</LikeBox>
						)}

						<CaptionBox
							caption={this.props.caption}
							creator={this.props.creator}
						/>

						<CommentsList
							refreshComments={this.updateAfterDelete}
							comments={this.state.comments}
						></CommentsList>

						<TimeStampWrapper>
							<TimeStamp>12 hours ago</TimeStamp>
						</TimeStampWrapper>
						<CommentBox
							refreshComment={this.refreshComments}
							postId={this.props.id}
						></CommentBox>
					</BottomSection>
				</Container>
			</>
		);
	}
}
