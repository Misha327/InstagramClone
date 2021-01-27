import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";
import courgette from "../../../fonts/Courgette-Regular.ttf";

export const Container = styled.div`
	background-color: white;
	height: 55px;
	width: 100%;
	border-bottom: solid 1px #e3e3e3;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	position: fixed;
	padding: 0 20px;
	z-index: 99;
`;

// Flex grow the search bar
export const Inner = styled.div`
	@media only screen and (min-width: 620px) {
		width: 935px;
	}
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const Logo = styled.h2`
@font-face {
  font-family: "Courgette";
  src: url(${courgette}) format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}
font-family: 
	background: transparent;
	height: 28px;
	transform: translateY(5%);
  // margin: 4px 5px 0px;
  	font-family: "Courgette", cursive;

`;

export const LogoContainer = styled.div`
	background: transparent;

	// margin: 4px 5px 0px;
`;

export const SearchBar = styled.input`
	border-radius: 2px;
	border: solid 1px #e3e3e3;
	padding: 5px;
	outline: none;
	width: 200px;
	margin-left: auto;
	@media only screen and (max-width: 640px) {
		display: none;
	}
	::-webkit-input-placeholder {
		text-align: center;
	}
`;

export const IconList = styled.div`
	height: auto;
	width: auto;
	display: flex;
	border: solid 1px #e3e3e3;
	border: none;
	margin-left: auto;
`;

export const Icon = styled.img`
	height: 28px;
	width: 28px;
	margin-right: 22px;
	&:last-child {
		margin-right: 0;
	}
	cursor: pointer;
`;

export const Link = styled(RouterLink)`
	height: 28px;
	width: 28px;
	margin-right: 22px;
`;
