import React from "react";
import GridItem from "./GridItem/GridItem";

export const GridList = (props) => {
	const posts = props.posts.map((post) => {
		if (post.creator.avatar == null) {
			return (
				<GridItem
					key={post._id + "p"}
					id={post._id}
					isCreator={props.isCreator}
					caption={post.caption}
					comments={post.comments}
					creator={post.creator}
					avatar={""}
					nickname={post.creator.nickname}
					clickHandle={props.clickHandle}
					picture={post.picture}
					refreshDelete={props.refreshDelete}
					likes={post.likes}
				/>
			);
		} else {
			return (
				<GridItem
					key={post._id + "p"}
					id={post._id}
					isCreator={props.isCreator}
					caption={post.caption}
					comments={post.comments}
					avatar={post.creator.avatar.picture}
					creator={post.creator}
					nickname={post.creator.nickname}
					clickHandle={props.clickHandle}
					picture={post.picture}
					refreshDelete={props.refreshDelete}
					likes={post.likes}
				/>
			);
		}
	});
	return <>{posts.reverse()}</>;
};
