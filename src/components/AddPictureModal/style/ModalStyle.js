import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
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
	width: 400px;
	margin: 0 auto;
	@media only screen and (max-width: 400px) {
		width: 100%;
	}
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	background: white;
	padding: 20px;
`;

export const AnimationContainer = styled.div``;

export const PreviewImage = styled.img`
	width: 100%;

	@media only screen and (max-width: 400px) {
    width: 100%;
	}

	margin-top: 5px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const InputWrapper = styled.div`
	height: 200px;
	width: 200px;
`;

export const UploadImage = styled.div`
	margin: 10px 0;
	outline: none;

	height: 70px;
	width: 100%;
	border-radius: 10px;
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	border: 4px solid black;
	overflow: hidden;
	background-image: linear-gradient(to top, white 50%, black 50%);
	background-size: 100% 200%;
	transition: all 1s;
	color: white;
	font-size: 100px;

	input[type="file"] {
		height: 200px;
		width: 200px;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		cursor: pointer;
	}

	&:hover {
		background-position: 0 -100%;
		color: #2590eb;
	}
`;

export const Caption = styled.textarea`
	width: 100%;

	border-radius: 2px;
	outline: none;
	padding: 5px;
	margin-bottom: 15px;
`;

export const SubmitButton = styled(motion.button)`
	padding: 10px 50px;
	border: none;
	border-radius: 50px;
	background: #000000;
	font-weight: bold;
	color: white;
	outline: none;
`;

export const Wrapper = styled.div``;
