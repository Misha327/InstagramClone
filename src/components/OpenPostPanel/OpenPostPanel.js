import React, { Component } from "react";
import {
	Container,
	PictureSection,
	Picture,
	TextSection,
} from "./style/style.js";

import Backdrop from "../Backdrop/Backdrop";
import UserSection from "../UserSection/UserSection";
import CommentsList from "../Comments/CommentsList";
import PictureContainer from "./Picture/PictureContainer.js";
import authContext from "../../context/auth-context.js";
import CaptionBox from "../CaptionBox/CaptionBox";

import likeIcon from "../../images/actionbar/svgexport-2.svg";
import redHeartIcon from "../../images/PostIcons/heart-fill-red.svg";
import commentIcon from "../../images/actionbar/svgexport-3.svg";
import shareIcon from "../../images/actionbar/svgexport-4.svg";
import bookmarkIcon from "../../images/actionbar/svgexport-5.svg";

import {
	ActionContainer,
	ActionButton,
	BookmarkButton,
	LikeBox,
} from "../PostPanel/style/style";

export default class OpenPostPanel extends Component {
	constructor(props) {
		super(props);
		this._isMounted = true;

		this.state = {
			isLiked: false,
			numLikes: 0,
		};
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
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
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

	render() {
		return (
			<>
				<Backdrop handleExit={this.props.handleExit}></Backdrop>
				<Container>
					<PictureSection>
						<PictureContainer
							isLiked={this.state.isLiked}
							picture={this.props.picture}
							toggleIsLiked={this.toggleIsLiked}
							postId={this.props.id}
						></PictureContainer>
					</PictureSection>

					<TextSection>
						<UserSection
							creatorUsername={this.props.creatorUsername}
							avatar={this.props.avatar}
							isCreator={this.props.isCreator}
							displayOptionsModal={this.props.toggleInOptions}
							toggleInOptions={this.props.toggleInOptions}
						></UserSection>

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
							<BookmarkButton src={bookmarkIcon}></BookmarkButton>
						</ActionContainer>
						{this.state.numLikes == 0 || this.state.numLikes > 1 ? (
							<LikeBox>{this.state.numLikes} likes</LikeBox>
						) : (
							<LikeBox>{this.state.numLikes} like</LikeBox>
						)}

						<CaptionBox
							creator={this.props.creator}
							caption={this.props.caption}
						/>

						<CommentsList
							secondary={true}
							comments={this.props.comments}
						></CommentsList>
					</TextSection>
				</Container>
			</>
		);
	}
}
