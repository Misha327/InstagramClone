const Comment = require("../../models/comment");
const Post = require("../../models/post");
const User = require("../../models/user");
const { findUser, transformPost } = require("./merge");

module.exports = {
	// comments: async (args) => {
	// 	try {
	// 		const fetchedComments = await Comment.find();
	// 		return fetchedComments.map((comment) => {
	// 			return { ...comment._doc, _id: comment.id };
	// 		});
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// },
	createComment: async (args, req) => {
		// throw new Error("in create comment!");

		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}
		console.log(args.commentInput.text);
		const comment = new Comment({
			text: args.commentInput.text,
			creator: req.userId,
		});
		try {
			const result = await comment.save();

			const post = await Post.findById(args.commentInput.postId);

			if (!post) {
				throw new Error("Post doesn't exist!");
			}
			post.comments.push(comment);
			await post.save();

			return { ...comment._doc, _id: comment.id };
		} catch (error) {
			throw error;
		}
	},
	deleteComment: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}
		try {

			const comment = await Comment.findById(args.commentId);
			const user = comment.creator;

			if (user._id != req.userId) {
				throw new Error("Not your comment!");
			}

			await Comment.deleteOne(comment);

			return { ...comment._doc, _id: comment.id };
		} catch (error) {
			throw error;
		}
	},
};
