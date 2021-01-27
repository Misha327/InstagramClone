import React, { useState, useContext, useEffect } from "react";
import {
	Container,
	PictureList,
	Picture,
	AnimationContainer,
	HeartIcon,
} from "./style";

import heartSVG from "../../../images/PostIcons/heart-straight-fill.svg";
import authContext from "../../../context/auth-context";
import { set } from "mongoose";

export default class PictureContainer extends React.Component {
	constructor(props) {
		super(props);
		this._isMounted = true;
		this._clicked = false;

		this.state = {
			playAnimation: false,
			isLiked: false,
    };
	}

	static contextType = authContext;

	componentDidMount() {}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleLike = () => {
		const postId = this.props.postId;
		const userId = this.context.userId;


		const requestBody = {
			query: ` 
      mutation {
        likePost(
          likeInput: {
            postId: "${this.props.postId}"
            userId: "${this.context.userId}"
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
				this.props.toggleIsLiked();

				if (this.props.isLiked == true) {
					this.setState({
						playAnimation: true,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({
			playAnimation: false,
		});
	};

	render() {
		return (
			<Container onDoubleClick={this.handleLike}>
				<AnimationContainer>
					{/* { && ( */}
					<HeartIcon likeAnimation={this.state.playAnimation} src={heartSVG} />
					{/* )} */}
				</AnimationContainer>
				<PictureList>
					<Picture src={this.props.picture} />
				</PictureList>
			</Container>
		);
	}
}
