const Post = require("../../models/post");
const User = require("../../models/user");

const {
	transformPost,
	findPosts: transform,
	findUser,
	postLoader,
} = require("./merge");

module.exports = {
	user: async (args, req) => {
		return findUser(args.userId);
	},
	posts: async () => {
		try {
			const posts = await Post.find();

			return posts.map((post) => {
				return transformPost(post);
			});
		} catch (error) {
			throw error;
		}
	},
	createPost: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}
		const post = new Post({
			picture: args.postInput.picture,
			caption: args.postInput.caption,
			public_id: args.postInput.public_id,
			comments: [],
			likes: [],
			creator: req.userId,
		});
		let createdPost;
		try {
			const result = await post.save();
			createdPost = transformPost(result);
			const creator = await User.findById(req.userId);

			if (!creator) {
				throw new Error("User not found.");
			}
			creator.createdPosts.push(post);
			await creator.save();

			return createdPost;
		} catch (err) {
			throw err;
		}
	},

	deletePost: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}

		try {
			const post = await Post.findById(args.postId);
      
			if (req.userId != post.creator._id) {
				throw new Error("Not your post!");
			}
			await Post.deleteOne(post);

			return { ...post._doc, _id: post.id };
		} catch (error) {
			throw error;
		}
	},
	post: async (args) => {
		try {
			const post = await postLoader.load(args.postId);
			return { ...post._doc, id: post._id };
		} catch (error) {
			throw error;
		}
	},
	likePost: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}
		try {
			let post = await Post.findById(args.likeInput.postId);

			if (post.likes.includes(args.likeInput.userId)) {
				const index = await post.likes.indexOf(args.likeInput.userId);
				if (index > -1) {
					post.likes.splice(index, 1);
				}
			} else {
				post.likes.push(args.likeInput.userId);
			}
			const result = await post.save();
			return { ...result._doc, id: result._id };
		} catch (error) {
			throw error;
		}
	},
};
