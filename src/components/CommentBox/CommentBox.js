import React from "react";
import authContext from "../../context/auth-context";
import {
	Comment,
	TimeStamp,
	AddCommentContainer,
	CommentForm,
	TextArea,
	SubmitButton,
	TimeStampWrapper,
} from "./style/style";

export default class CommentBox extends React.Component {
	constructor(props) {
		super(props);

		this.commentRef = React.createRef();
		this.postComment = this.postComment.bind(this);
	}
	static contextType = authContext;

	postComment = (event) => {
		// Refreshes the page
		event.preventDefault();
		const postId = this.props.postId;
		let comment = this.commentRef.current.value;

		if (comment.trim().length === 0) {
			return;
    }
    
		comment = comment.trim();
		const requestBody = {
			query: `
        mutation {
          createComment(commentInput: {text: "${comment}", postId: "${postId}"}) {
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
				console.log(resData);
				event.target.elements[0].value = "";
				this.props.refreshComment({
					_id: resData.data.createComment.id,
					text: resData.data.createComment.text,
					creator: {
						_id: this.context.userId,
						nickname: this.context.nickname,
					},
				});
			})
			.catch((error) => {
				throw error;
			});
	};

	render() {
		return (
			<>
				<AddCommentContainer>
					<CommentForm onSubmit={this.postComment}>
						<TextArea
							type="textarea"
							placeholder="Add a comment..."
							ref={this.commentRef}
						></TextArea>
						<SubmitButton type="submit">Post</SubmitButton>
					</CommentForm>
				</AddCommentContainer>
			</>
		);
	}
}
