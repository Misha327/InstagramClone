const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	nickname: {
		type: String,
		required: true,
	},
	avatar: {
		type: Schema.Types.ObjectId,
		ref: "Avatar",
	},
	bio: {
		type: String,
	},
});

module.exports = mongoose.model("User", userSchema);
