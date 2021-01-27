import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 0 16px;
	font-size: 13px;
	line-height: 18px;
	margin-bottom: 5px;
`;

export const Caption = styled.p``;

export const UserName = styled(RouterLink)`
  color: rgb(38, 38, 38);
  margin-right: 6px;
	font-size: 14px;
	// background: blue;
	font-weight: bold;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;
