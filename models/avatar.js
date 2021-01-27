const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const avatarSchema = new Schema(
	{
		picture: {
			type: String,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		public_id: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Avatar", avatarSchema);
