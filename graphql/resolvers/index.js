const authResolver = require("./auth");
const postsResolver = require("./posts");
const commentResolver = require("./comments");
// const bookingResolver = require('./booking');

const rootResolver = {
	...authResolver,
	...postsResolver,
	...commentResolver,
};

module.exports = rootResolver;
