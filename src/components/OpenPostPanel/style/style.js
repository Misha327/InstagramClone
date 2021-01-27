import styled from "styled-components";

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	@media only screen and (max-width: 500px) {
		width: 100%;
	}
	width: auto;
	z-index: 999;
	display: flex;
	@media only screen and (max-width: 720px) {
		flex-direction: column;
	}
	margin: 0 auto;
`;

export const PictureSection = styled.div`
	width: 400px;
	@media only screen and (max-width: 500px) {
		width: 100%;
	}
	@media only screen and (min-width: 920px) {
		width: 550px;
	}
	height: auto;
	overflow: hidden;
`;

export const Picture = styled.img`
	width: 100%;
	object-fit: cover;
	display: block;
`;

export const TextSection = styled.div`
	width: 200px;
	@media only screen and (max-width: 720px) {
		width: 100%;
	}
	@media only screen and (min-width: 920px) {
		width: 330px;
	}
	background: white;
	height: auto;
	padding-bottom: 20px;
`;
