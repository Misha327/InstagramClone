const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const path = require("path");
require("dotenv").config();

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);

	res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(isAuth);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true,
	})
);

app.use(express.static(path.join(__dirname, "build")));

// Express serve up index.html file if it doesn't recognize route
app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

mongoose
	.connect(
		`mongodb+srv://${process.env.REACT_APP_MONGO_USER}:${process.env.REACT_APP_MONGO_PASS}@instaclonecluster.s0d9r.mongodb.net/INSTACLONE?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(process.env.PORT || 4000);
		console.log("Server started");
	})
	.catch((err) => {
		console.log(err);
	});
