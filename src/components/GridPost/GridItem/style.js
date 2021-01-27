import styled from "styled-components/macro";

export const HoverContainer = styled.button`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 0;
	background: rgba(0, 0, 0, 0.36);
	z-index: 9;
	cursor: pointer;
	display: none;
`;

export const ImageContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 100%;
	&:hover ${HoverContainer} {
		display: block;
	}
`;

export const Image = styled.img`
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 0;
`;

export const DeleteIcon = styled.img`
	height: 30px;
	width: 30px;
	position: absolute;
	top: 5%;
	right: 5%;
	border-radius: 4px;
	padding: 5px;
	&:hover {
		background: #ff2929;
	}
	z-index: 66;
`;
