import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";

export const Options = styled.img`
	height: 100%;
	display: none;
  cursor: pointer;
  height: 15px;
	// margin-left: 10px;

`;

export const Container = styled.div`
	&:hover ${Options} {
		display: inline;
	}
	width: 100%;
	display: flex;
	align-items: flex-start;
	padding: 0 16px;
`;

export const Nickname = styled(RouterLink)`
	color: rgb(38, 38, 38);
	font-size: 13px;
	font-weight: bold;
	cursor: pointer;
  text-decoration: none;
  margin-right: 7px;
	&:hover {
		text-decoration: underline;
	}
`;

export const Text = styled.p`
	font-size: 12px;
	margin-right:auto;
	height: auto;
  overflow-wrap: anywhere;
  max-width: 500px;
`;

export const Wrapper = styled.div`
	height: 15px;
	margin-left: auto;
`;
