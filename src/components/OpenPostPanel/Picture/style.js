import styled from "styled-components/macro";

export const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

export const PictureList = styled.div`
	width: 100%;
	height: auto;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
  display: flex;
  flex-direction: column;

	::-webkit-scrollbar {
		display: none;
	}
`;

export const AnimationContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	user-select: none;
`;

export const HeartIcon = styled.img`
	transform: scale(0);
	outline-style: none;
	@keyframes bounce-in-fwd {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		18% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		25% {
			-webkit-transform: scale(0.35);
			transform: scale(0.35);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		42% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		51% {
			-webkit-transform: scale(0.45);
			transform: scale(0.45);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		59% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		65% {
			-webkit-transform: scale(0.47);
			transform: scale(0.47);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		70%,
		100% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}

	@keyframes heartPopIn {
		100% {
			transform: scale(0.5);
		}
	}
	${(props) =>
		props.likeAnimation &&
		`
  animation: bounce-in-fwd 1.3s 1;

  `}
`;

export const Picture = styled.img`
	align-items: flex-start;

	width: 100%;
	scroll-snap-align: start;
	display: block;
`;
