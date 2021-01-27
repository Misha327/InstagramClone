import React from "react";
import { Container, UserName, Caption } from "./style";

const CaptionBox = (props) => {
	return (
		<Container>
			<UserName to={"/profile/" + props.creator.nickname}>
				{props.creator.nickname}
			</UserName>
			<Caption>{props.caption}</Caption>
		</Container>
	);
};

export default CaptionBox;
