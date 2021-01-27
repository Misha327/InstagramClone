import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

import { bounceIn } from "react-animations";

const bounceAnimation = keyframes`${bounceIn}`;

export const Animation = styled.div`

`;

export const Container = styled(motion.div)`
	@keyframes scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}


	animation: scale-up-center 0.3s backwards;
  position: relative;
	width: 250px;
	z-index: 99999;
	background-color: white;
	border-radius: 9px;
  overflow: hidden;
  display: block;

`;

const Button = styled.button`
  
	padding: 15px 0;
	width: 100%;
	border: none;
	font-weight: bold;
	outline: none;
	&:hover {
		background: #00000021;
	}
`;

export const DeleteButton = styled(Button)`
	color: red;
`;

export const CancelButton = styled(Button)`
	border-top: solid 1px grey;
`;
