const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const Avatar = require("../../models/avatar");
const { dateToString } = require("../../helpers/date");
const DataLoader = require("dataloader");
const { users } = require("cloudinary/lib/provisioning/account");

const postLoader = new DataLoader((postIds) => {
	return posts(postIds);
});

const userLoader = new DataLoader((userIds) => {
	return User.find({ _id: { $in: userIds } });
});

const commentLoader = new DataLoader((commentIds) => {
	console.log(commentIds);
	return Comment.find({ _id: { $in: commentIds } });
});

const posts = async (postIds) => {
	try {
		const Posts = await Post.find({ _id: { $in: postIds } });
		return Posts.map((post) => {
			return transformPost(post);
		});
	} catch (error) {
		throw error;
	}
};

const userByName = async (args) => {
	try {
		const user = await User.findOne({ nickname: args.nickname });
		return {
			...user._doc,
			_id: user.id,
			createdPosts: () => {
				postLoader.loadMany.bind(user._doc.createdPosts);
			},
		};
	} catch (err) {
		throw err;
	}
};

const user = async (userId) => {
	try {
		const user = await userLoader.load(userId.toString());
		return {
			...user._doc,
			_id: user.id,
			createdPosts: () => {
				postLoader.loadMany.bind(user._doc.createdPosts);
			},
			avatar: avatar.bind(this, user.avatar),
		};
	} catch (err) {
		throw err;
	}
};
const comment = async (commentId) => {
	try {
		const comments = await Comment.find({ _id: { $in: commentId } });
		return comments.map((comment) => {
			return {
				...comment._doc,
				_id: comment.id,
				creator: user.bind(this, comment.creator),
			};
		});
	} catch (error) {
		throw error;
	}
};

const transformAvatar = (avatar) => {
	return {
		...avatar._doc,
		_id: avatar.id,
		creator: user.bind(this, avatar.user),
	};
};

const avatar = async (id) => {
	try {
		const avatar = await Avatar.findById(id);
		return transformAvatar(avatar);
	} catch (error) {
		throw error;
	}
};

const transformUser = (user) => {
	return {
		...user._doc,
		_id: user.id,
		createdPosts: posts.bind(this, user.createdPosts),
		avatar: avatar.bind(this, user.avatar),
	};
};

const transformPost = (post) => {
	return {
		...post._doc,
		_id: post.id,
		createdAt: dateToString(post._doc.createdAt),
		updatedAt: dateToString(post._doc.updatedAt),
		comments: comment.bind(this, post._doc.comments),
		creator: user.bind(this, post.creator),
	};
};

exports.findPosts = posts;
exports.postLoader = postLoader;
exports.findUser = user;
exports.transformPost = transformPost;
exports.transformUser = transformUser;
exports.transformAvatar = transformAvatar;
exports.userByName = userByName;
