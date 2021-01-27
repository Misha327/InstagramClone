import React, { useState } from "react";
import {
	Container,
	AvatarBox,
	AvatarPic,
	TextBox,
	UserName,
	Options,
} from "./style";
import elipsis from "../../images/ellipsis.png";
import OptionsModal from "../OptionsModal/OptionsModal";
const UserSection = (props) => {
	const [inOptions, setInOptions] = useState(false);

	return (
		<>
			{props.inOptions && (
				<OptionsModal
					handleDelete={props.handleDelete}
					handleCancel={props.toggleInOptions}
				/>
			)}
			<Container>
				<AvatarBox to={"/profile/" + props.creatorUsername}>
					<AvatarPic src={props.avatar}></AvatarPic>
				</AvatarBox>
				<TextBox>
					<UserName to={"/profile/" + props.creatorUsername}>
						{props.creatorUsername}
					</UserName>
				</TextBox>

				{props.isCreator && (
					<Options src={elipsis} onClick={props.toggleInOptions}></Options>
				)}
			</Container>
		</>
	);
};

export default UserSection;
