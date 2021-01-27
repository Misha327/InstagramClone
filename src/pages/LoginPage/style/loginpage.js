import styled from "styled-components/macro";
import courgette from "../../../fonts/Courgette-Regular.ttf";
import { motion } from "framer-motion";

export const PageContainer = styled.div`
	height: 100vh;
`;
export const FeatureContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 10px;
`;

export const MessageContainer = styled.div`
	background: #3bb635;
	border-radius: 5px;
	border: none;
	padding: 10px 20px 10px;
	margin: 10px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
  align-items: center;
  font-size: 14px;

  @media only screen and (min-width: 700px) {

  font-size: 18px;
  }
	box-shadow: 0px 0px 5px #d6d6d6;

`;

export const Message = styled.p`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  margin: 10px;
  color:#ffffff;
`;

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const LoginContainer = styled.div`
	@media only screen and (min-height: 800px) {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 20;
`;

export const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: auto;
	border: 1px solid #cfcfcf;
	border-radius: 10px;
	box-shadow: 0px 0px 4px #d6d6d6;
	background: white;
`;

export const Title = styled.h1`
	@font-face {
		font-family: "Courgette";
		src: url(${courgette}) format("truetype");
		font-weight: 400;
		font-style: normal;
		font-display: auto;
	}
	padding: 10px 0;
	font-family: "Courgette", cursive;
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px 30px 30px;
	border-top: 1px solid #e3e3e3;
`;

export const LoginField = styled.input`
	margin-bottom: 20px;
	outline: none;
	border-radius: 4px;
	border: 1px solid grey;
  padding: 5px 5px;
  width: 170px;
`;

export const Button = styled(motion.button)`
	height: 50px;
	width: 100%;
	border: none;
	cursor: pointer;
	border-radius: 40px;
	font-weight: bold;
	background: lightgrey;
	outline: none;
	&:hover {
		background: #b0b0b0;
	}
`;

export const LoginButton = styled(Button)`
	background: black;
	color: white;
	&:hover {
		background: #242424;
	}
	margin-bottom: 8px;
`;
