import React from "react";

export default React.createContext({
	token: null,
	userId: null,
	nickname: null,
	login: (token, userId, nickname) => {},
	logout: () => {},
	changeNickname: (newNickname) => {},
});
