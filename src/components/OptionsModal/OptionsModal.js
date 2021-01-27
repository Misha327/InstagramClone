import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { Container, DeleteButton, CancelButton, Animation } from "./style";

const OptionsModal = (props) => {


	return (
		<>
			<Backdrop handleExit={props.handleCancel}></Backdrop>
			<div
				style={{
					position: "fixed",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: "9999",
				}}
			>
				<Container>
					<Animation>
						<DeleteButton onClick={props.handleDelete}>Delete</DeleteButton>
						<CancelButton onClick={props.handleCancel}>Cancel</CancelButton>
					</Animation>
				</Container>
			</div>
		</>
	);
};

export default OptionsModal;
