import React, { Component } from "react";
import { ImageContainer, Image, HoverContainer, DeleteIcon } from "./style";
import trashIcon from "../../../images/GridPicture/trash.svg";
import OptionsModal from "../../OptionsModal/OptionsModal";
import authContext from "../../../context/auth-context";
import PostPanel from "../../PostPanel/PostPanel";
import Backdrop from "../../Backdrop/Backdrop";
import OpenPostPanel from "../../OpenPostPanel/OpenPostPanel";

export default class GridItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inOptions: false,
			isOpen: false,
		};
		this.toggleInOptions = this.toggleInOptions.bind(this);
		this.toggleIsOpen = this.toggleIsOpen.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	static contextType = authContext;

	toggleInOptions() {
		this.setState((state) => ({ inOptions: !state.inOptions }));
	}

	toggleIsOpen() {
		this.setState((state) => ({ isOpen: !state.isOpen }));
	}

	deleteItem() {
		const id = this.props.id;
		const requestBody = {
			query: `
        mutation {
          deletePost(postId: "${this.props.id}") {
            _id
          }
        }
      `,
		};

		const token = this.context.token;

		fetch(process.env.REACT_APP_URI || "http://localhost:4000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed!");
				}
				return res.json();
			})
			.then((resData) => {
				this.toggleInOptions();
				console.log(resData);
				this.props.refreshDelete(resData.data.deletePost_id);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const picture = this.props.picture;
		return (
			<>
				{this.state.isOpen && (
					<OpenPostPanel
						key={this.props.id}
						id={this.props.id}
						picture={picture}
						avatar={this.props.avatar}
						handleExit={this.toggleIsOpen}
						creator={this.props.creator}
						isCreator={this.props.isCreator}
						comments={this.props.comments}
						handleDelete={this.deleteItem}
						creatorUsername={this.props.nickname}
						toggleInOptions={this.toggleInOptions}
						likes={this.props.likes}
						inOptions={this.state.inOptions}
						caption={this.props.caption}
					></OpenPostPanel>
				)}
				{this.state.inOptions && (
					<OptionsModal
						handleDelete={this.deleteItem}
						handleCancel={this.toggleInOptions}
					/>
				)}
				<ImageContainer>
					{this.props.isCreator && (
						<DeleteIcon onClick={this.toggleInOptions} src={trashIcon} />
					)}
					<HoverContainer
						onClick={() => {
							this.setState({ isOpen: true });
						}}
					></HoverContainer>

					<Image src={picture}></Image>
				</ImageContainer>
			</>
		);
	}
}
