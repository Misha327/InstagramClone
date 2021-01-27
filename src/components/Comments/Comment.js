import Ellipsis from "../../images/ellipsis.png";
import { Container, Nickname, Text, Options, Wrapper } from "./style/style";

import React, { Component } from "react";
import OptionsModal from "../OptionsModal/OptionsModal";
import authContext from "../../context/auth-context";

export default class Comment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inOptions: false,
			isCreator: false,
			nickname: "",
		};

		this.displayOptionsModal = this.displayOptionsModal.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}

	static contextType = authContext;

	componentDidMount() {
		if (this.props.creator._id == this.context.userId) {
			this.setState({
				isCreator: true,
			});
		}
		this.setState({
			nickname: this.props.creator.nickname,
		});
		this._isMounted = true;
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

	deleteComment() {
		const requestBody = {
			query: `
      mutation {
        deleteComment(commentId: "${this.props.id}") {
          _id
          text
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
				// console.log(resData.data.deleteComment._id);
				this.props.refreshComments(resData.data.deleteComment._id);
				this.displayOptionsModal();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<>
				{this.state.inOptions && (
					<OptionsModal
						handleDelete={this.deleteComment}
						handleCancel={this.displayOptionsModal}
					/>
				)}
				<Container>
					<Nickname to={"/profile/" + this.state.nickname}>
						{this.props.nickname}
					</Nickname>
					<Text>{this.props.text}</Text>
					{/* <Wrapper> */}
					{this.state.isCreator && (
						<Options
							src={Ellipsis}
							onClick={this.displayOptionsModal}
						></Options>
					)}
					{/* </Wrapper> */}
				</Container>
			</>
		);
	}
}
