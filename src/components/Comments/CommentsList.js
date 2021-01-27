import React, { Component } from "react";
import Comment from "./Comment";

const CommentsList = (props) => {
	// componentDidUpdate(prevProps){

	// }
	// if (props.comments != null) {
		let comments = props.comments.map((comment) => {
			if (props.secondary != null) {
				return (
					<Comment
						key={comment._id + "c"}
						id={comment._id}
						creator={comment.creator}
						nickname={comment.creator.nickname}
						text={comment.text}
						refreshComments={props.refreshComments}
					/>
				);
			} else {
				return (
					<Comment
						key={comment._id}
						id={comment._id}
						creator={comment.creator}
						nickname={comment.creator.nickname}
						text={comment.text}
						refreshComments={props.refreshComments}
					/>
				);
			}
		});
		return <>{comments}</>;
	// } else return <></>;
};

export default CommentsList;
