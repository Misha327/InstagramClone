import styled from "styled-components/macro";

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	max-width: 935px;
	width: 100%;
	margin: 90px auto 100px;
	@media screen and (max-width: 700px) {
		margin: 70px auto 100px;
	}
`;

export const ProfileContainer = styled.div`
	display: flex;
	@media screen and (max-width: 700px) {
		flex-direction: column;
		margin: 0 20px;
	}
`;

export const ProfileWrapper = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 30px;

	@media screen and (max-width: 700px) {
		align-items: center;
	}
`;

export const ProfileTextContainer = styled.div`
	display: flex;
	font-size: 13px;
	flex-direction: column;
  flex-grow: 3;
  
`;

export const FlexContainer = styled.div`
	@media screen and (min-width: 700px) {
		flex-grow: 1;
	}

	margin-right: 25px;
`;

export const AvatarContainer = styled.div`
	// display: flex;
	// justify-content: center;
	// flex-grow: 1;
	margin: 0 auto;
	width: 150px;
	height: 150px;
	@media screen and (max-width: 700px) {
		width: 80px;
		height: 80px;
  }

`;

export const ChangeAvatarButton = styled.button`
	height: inherit;
	width: inherit;
	border-radius: 50%;
	border: none;
	cursor: pointer;
  outline: none;
	&:hover ${AvatarContainer} {
  }
  


`;

export const Avatar = styled.img`
	height: inherit;
	width: inherit;
	border-radius: inherit;
  object-fit: cover;

  
`;

export const TopContainer = styled.div`
	display: flex;

	margin-bottom: 25px;

	@media screen and (max-width: 700px) {
		flex-direction: column;
		display: flex;
		margin: 0;
	}
`;

const Button = styled.button`
	outline: none;
	cursor: pointer;
	border: 1px solid #0000004f;
	border-radius: 3px;
	font-weight: bold;
	font-size: 13px;
	border-color: #c9c9c9;
	background: none;
`;

export const ChangeDetailsButton = styled(Button)`
	@media screen and (max-width: 700px) {
		padding: 6px 0;
  }
  padding: 0 10px;
`;

export const Username = styled.div`
	font-size: 26px;
	@media screen and (max-width: 700px) {
		margin-bottom: 15px;
	}
	margin-right: 20px;
`;

export const Bio = styled.div`
	padding-bottom: 20px;
	font-size: 13px;
	font-weight: bold;
`;

export const NicknameInput = styled.input`
	margin-bottom: auto;
`;

export const BioInput = styled.textarea``;

export const BioForm = styled.form`
	display: flex;
	flex-direction: column;
  justify-content: center;
  padding-right: 20px;
`;

export const SubmitChangesButton = styled(Button)`
	@media only screen and (min-width: 700px) {
		padding: 15px 0;
	}
	padding: 10px 0;

`;

export const FollowersList = styled.div`
	margin-bottom: 15px;
`;

export const GridContainer = styled.div`
	width: 100%;
	display: grid;
	@media only screen and (min-width: 720px) {
    grid-gap: 21px 25px;
    
	}
	grid-gap: 0 5px;
	grid-template-columns: 1fr 1fr 1fr;
`;

export const ItemWrapper = styled.div``;
