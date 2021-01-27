import React from "react";
import PostPanel from "../PostPanel/PostPanel";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage/profile";

const Posts = (props) => {
	const posts = props.posts.map((post) => {
		if (post.creator.avatar == null) {
			return (
				<PostPanel
					stuff={props.stuff}
					key={post._id}
					id={post._id}
					picture={post.picture}
					caption={post.caption}
					creator={post.creator}
					nickname={post.creator.nickname}
					avatar={""}
					comments={post.comments}
					likes={post.likes}
					handleDelete={props.refreshDelete}
				/>
			);
		} else {
			return (
				<PostPanel
					stuff={props.stuff}
					key={post._id}
					id={post._id}
					picture={post.picture}
					caption={post.caption}
					creator={post.creator}
					nickname={post.creator.nickname}
					avatar={post.creator.avatar.picture}
					comments={post.comments}
					likes={post.likes}
					handleDelete={props.refreshDelete}
				/>
			);
		}
	});
	return <>{posts}</>;
};

export default Posts;

{
	/* <Route
					key={`${post.creator._id}/${post._id}`}
					path={`/profile/${post.creator._id}`}
					render={(props) => (
						<ProfilePage
							{...props}
							key={`/profile/${post.creator._id}`}
							creatorId={props.creator._id}
						/>
					)}
					exact
				/> */
}
