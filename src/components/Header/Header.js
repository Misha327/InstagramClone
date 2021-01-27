import React, { Component } from "react";
import {
	Container,
	Inner,
	Logo,
	SearchBar,
	IconList,
	Icon,
	LogoContainer,
	Link,
} from "./styles/style";
import LogoImage from "../../images/logo.png";
import homeIcon from "../../images/navbar/house.svg";
import filledHomeIcon from "../../images/navbar/house-fill.svg";
import profileCircle from "../../images/navbar/user-circle.svg";
import filledProfileIcon from "../../images/navbar/user-circle-fill.svg";
import AuthContext from "../../context/auth-context";
import UploadIcon from "../../images/navbar/upload-simple.svg";
import LogoutIcon from "../../images/navbar/sign-out.svg";
import AddPictureModal from "../AddPictureModal/AddPictureModal";
import authContext from "../../context/auth-context";

export class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inHome: false,
			inUpload: false,
			inProfile: false,
			openModal: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount() {
		if (this.props.inHome == true) {
			this.setState({
				inHome: true,
			});
		} else if (this.props.inProfile == true) {
			this.setState({
				inProfile: true,
			});
		}
	}

	componentWillUnmount() {
		this.setState({
			inHome: false,
			inProfile: false,
		});
	}

	toggleModal() {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
		}));
	}

	static contextType = authContext;

	render() {
		return (
			<>
				{this.state.openModal && (
					<AddPictureModal
						refreshPosts={this.props.refreshPosts}
						handleExit={this.toggleModal}
					></AddPictureModal>
				)}
				<Container>
					<Inner>
						<Logo src={LogoImage}>Instaclone</Logo>
						<SearchBar placeholder="Search"></SearchBar>
						<IconList>
							<Link to="/">
								<Icon
									src={this.state.inHome ? filledHomeIcon : homeIcon}
								></Icon>
							</Link>
							<Icon src={UploadIcon} onClick={this.toggleModal}></Icon>

							<Link to={"/profile/" + this.context.nickname}>
								<Icon
									src={this.state.inProfile ? filledProfileIcon : profileCircle}
								></Icon>
							</Link>

							<Icon src={LogoutIcon} onClick={this.context.logout}></Icon>
						</IconList>
					</Inner>
				</Container>
			</>
		);
	}
}

export default Header;
