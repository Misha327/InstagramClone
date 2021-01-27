import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";

// Make the heights responsive to the text inside
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: auto;
	border-radius: 3px;
	background: rgb(255, 255, 255);
	@media only screen and (min-width: 620px) {
		border: solid 1px rgb(219, 219, 219);

		margin-bottom: 60px;
  }
	@media only screen and (max-width: 620px) {
		border-top: solid 1px rgb(219, 219, 219);
		border-bottom: solid 1px rgb(219, 219, 219);
	}
	margin-bottom: 20px;
`;

export const UserSection = styled.div`
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

export const LocationName = styled.div`
	font-size: 13px;
	cursor: pointer;
`;

export const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 40px;
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

export const Options = styled.img`
	height: 15px;
	margin-left: auto;
	cursor: pointer;
`;

export const NextPicture = styled.img`
	position: absolute;
	height: 20px;
	width: 40px;
	right: 0;
	cursor: pointer;
`;

export const PrevPicture = styled.img`
	// display: none;
	position: absolute;
	height: 20px;
	width: 40px;
	left: 0;
	cursor: pointer;
`;

export const BottomSection = styled.div`
	display: flex;
	flex-direction: column;
	height: auto;
	line-height: 18px;
`;

export const ActionContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 16px;
`;

export const ActionButton = styled.img`
	height: 25px;
	width: 25px;
	margin-right: 10px;

`;

export const ListContainer = styled.div`
	margin-left: auto;
	margin-right: 90px;
	display: flex;
`;

export const ListIndicator = styled.div`
	height: 7px;
	width: 7px;
	border-radius: 50%;
	background: rgb(16, 123, 254);
	margin: 0 3px;
`;

export const BookmarkButton = styled.img`
	height: 25px;
	width: 25px;
	margin-left: auto;
`;

export const CommentBox = styled.div`
	height: 100%;
`;

export const Comment = styled.p`
	width: 100%;
`;

export const LikeBox = styled.div`
	width: 100%;
	font-size: 14px;
	padding: 0 16px;
	font-weight: bold;
	line-height: 18px;
	margin-bottom: 6px;
`;

export const CaptionBox = styled.div`
	display: flex;
	align-items: center;
	padding: 0 16px;
	font-size: 13px;
	line-height: 18px;
	margin-bottom: 5px;
`;

export const Caption = styled.p``;

export const TimeStampWrapper = styled.div`
	width: 100%;
	padding: 0 16px;
`;

export const TimeStamp = styled.div`
	line-height: 18px;
	letter-spacing: 0.2px;
	color: rgb(142, 142, 142);
	font-size: 10px;
	text-transform: uppercase;
	margin: 6px 0;
`;
