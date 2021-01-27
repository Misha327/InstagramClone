import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Container = styled.div`
	height: 60px;
	display: flex;
	padding: 15px;
	align-items: center;
`;

export const AvatarBox = styled(RouterLink)`
	height: 34px;
	width: 34px;
	margin-right: 12px;
	cursor: pointer;
`;
export const AvatarPic = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border-style: none;
	object-fit: cover;
`;


export const UserName = styled(RouterLink)`
	color: rgb(38, 38, 38);
	font-size: 14px;
	// background: blue;
	font-weight: bold;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;


export const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 40px;
`;

export const Options = styled.img`
	height: 15px;
	margin-left: auto;
	cursor: pointer;
`;