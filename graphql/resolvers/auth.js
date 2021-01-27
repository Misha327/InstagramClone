const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformUser, transformPost, transformAvatar } = require("./merge");
const User = require("../../models/user");
const Avatar = require("../../models/avatar");

module.exports = {
	createUser: async (args) => {
		try {
			const existingUser = await User.findOne({ email: args.userInput.email });
			if (existingUser) {
				throw new Error("User already exists!");
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
			const user = new User({
				nickname: args.userInput.nickname,
				email: args.userInput.email,
				password: hashedPassword,
				createdPosts: [],
			});
			console.log("creating jon doe");
			const result = await user.save();

			return { ...result._doc, password: null, _id: result.id };
		} catch (error) {
			throw error;
		}
	},
	login: async ({ email, password }) => {
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error("User does not exist!");
		}
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			throw new Error("Password is incorrect!");
		}
		// Check how to decide hashing key
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			"supersecretkey",
			{ expiresIn: "1h" }
		);

		return {
			userId: user.id,
			token: token,
			tokenExpiration: 1,
			nickname: user.nickname,
		};
	},

	users: async () => {
		try {
			const users = await User.find();
			return users.map((user) => {
				return transformUser(user);
			});
		} catch (error) {
			throw error;
		}
	},
	updateAvatar: async (args, req) => {
		try {
			const avatar = new Avatar({
				creator: req.userId,
				picture: args.picture,
				public_id: args.public_id,
			});
			const result = await avatar.save();
			const createdAvatar = transformAvatar(result);
			let user = await User.findOneAndUpdate(
				{ _id: req.userId },
				{ avatar: createdAvatar }
			);
			if (!user) {
				throw new Error("User not found.");
			}

			await user.save();

			return createdAvatar;
		} catch (error) {
			throw error;
		}
	},
	updateBio: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated!");
		}
		try {
			let user;
			console.log(args.profileData.nickname);
			if (args.profileData.nickname != null && args.profileData.bio != null) {
				user = await User.findOneAndUpdate(
					{ _id: req.userId },
					{ bio: args.profileData.bio, nickname: args.profileData.nickname }
				);
			} else if (args.profileData.bio != null) {
				user = await User.findOneAndUpdate(
					{ _id: req.userId },
					{ nickname: args.profileData.nickname }
				);
			} else {
				user = await User.findOneAndUpdate(
					{ _id: req.userId },
					{ bio: args.profileData.bio }
				);
			}
			if (!user) {
				throw new Error("User not found!");
			}

			await user.save();

			return { bio: args.profileData.bio, nickname: args.profileData.nickname };
		} catch (error) {
			throw error;
		}
	},
	profile: async (args, req) => {
		try {
			console.log(req.userId);
			const user = await User.findById(req.userId);
			if (!user) {
				throw new Error("User not found!");
			}
			return transformUser(user);
		} catch (error) {
			throw error;
		}
	},
	userByName: async (args) => {
		try {
			const user = await User.findOne({ nickname: args.nickname });
			return transformUser(user);
		} catch (err) {
			throw err;
		}
	},
};
