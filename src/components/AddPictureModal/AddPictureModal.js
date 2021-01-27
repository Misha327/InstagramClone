import React, { Component } from "react";
import authContext from "../../context/auth-context";
import Backdrop from "../Backdrop/Backdrop";
import {
	Container,
	Form,
	UploadImage,
	PreviewImage,
	SubmitButton,
	Caption,
	AnimationContainer,
	InputWrapper,
} from "./style/ModalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import fatArrow from "../../images/arrow-fat-up.svg";
const { cloudinary } = require("../../utils/cloudinary.js");

export class AddPictureModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: "",
			previewFile: "",
			caption: "",
			picture: "",
		};

		this._isMounted = false;

		this.captionRef = React.createRef();
		this.pictureUrlRef = React.createRef();
	}

	static contextType = authContext;

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateAvatar = async (base64EncodedImage) => {
		try {
			if (this.props.avatarPublicId != null) {
				this.deleteFromCloud(this.props.avatarPublicId);
			}
			const uploadRespone = await cloudinary.uploader.upload(
				base64EncodedImage,
				{
					upload_preset: "insta_clone",
				}
			);
			const pictureUrl = uploadRespone.secure_url;
			const public_id = uploadRespone.public_id;

			const requestBody = {
				query: `
      mutation {
        updateAvatar(picture: "${pictureUrl}", public_id: "${public_id}") {
          public_id
        }
      }
        
      `,
			};

			const token = this.context.token;
			if (this._isMounted) {
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
						this.props.refreshPosts();
						// this.props.refresh();
						this.props.handleExit();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		} catch (err) {
			throw err;
		}
	};

	handleFileInputChange = (e) => {
		const file = e.target.files[0];
		this.previewFile(file);
	};

	previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.setState({
				previewFile: reader.result,
			});
		};
	};

	handleSubmitFile = (e) => {
		e.preventDefault();
		if (!this.state.previewFile) return;
		this.uploadImage(this.state.previewFile);
	};

	handleSubmitAvatar = (e) => {
		e.preventDefault();
		if (!this.state.previewFile) return;
		this.updateAvatar(this.state.previewFile);
	};

	uploadImage = async (base64EncodedImage) => {
		try {
			const uploadRespone = await cloudinary.uploader.upload(
				base64EncodedImage,
				{
					upload_preset: "insta_clone",
				}
			);
			// console.log(uploadRespone);
			const pictureUrl = uploadRespone.secure_url;
			const public_id = uploadRespone.public_id;
			let caption = this.captionRef.current.value;
			caption = caption.trim();

			const requestBody = {
				query: `
            mutation {createPost(postInput: {picture: "${pictureUrl}", public_id: "${public_id}", 
          caption:"${caption}"}) {
            _id
            picture
            caption
            public_id
            creator {
              _id
              avatar {
                picture
              }
              nickname
            }
          }
        }
        
      `,
			};

			const token = this.context.token;

			let key = process.env.REACT_APP_URI;
			if (process.env.REACT_APP_URI === undefined) {
				key = "http://localhost:4000/graphql";
			}
			fetch(key, {
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
					console.log(resData);
					let avatar = "";
					if (this._isMounted) {
						if (this.props.refreshPosts != null) {
							if (resData.data.createPost.creator.avatar == null) {
								this.props.refreshPosts({
									_id: resData.data.createPost._id,
									picture: resData.data.createPost.picture,
									caption: resData.data.createPost.caption,
									public_id: resData.data.createPost.public_id,
									likes: [],
									comments: [],
									creator: {
										_id: this.context.userId,
										avatar: {
											picture: avatar,
										},
										nickname: resData.data.createPost.creator.nickname,
									},
								});
							} else {
								this.props.refreshPosts({
									_id: resData.data.createPost._id,
									picture: resData.data.createPost.picture,
									caption: resData.data.createPost.caption,
									public_id: resData.data.createPost.public_id,
									likes: [],
									comments: [],
									creator: {
										_id: this.context.userId,
										avatar: {
											picture: resData.data.createPost.creator.avatar.picture,
										},
										nickname: resData.data.createPost.creator.nickname,
									},
								});
							}
						}
					}

					this.props.handleExit();
				})
				.catch((error) => {
					console.log(error);
				});
			// Clear the fields
			this.setState({
				file: "",
				filePreview: "",
			});
		} catch (error) {
			throw error;
		}
	};

	deleteFromCloud = async (picturePublicId) => {
		try {
			const uploadRespone = await cloudinary.uploader.destroy(picturePublicId);
			console.log(uploadRespone);
		} catch (error) {
			throw error;
		}
	};

	render() {
		return (
			<>
				<Backdrop handleExit={this.props.handleExit}></Backdrop>
				<div
					style={{
						position: "fixed",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: "999",
					}}
				>
					<Container>
						<h2>
							{this.props.changingAvatar
								? "Update Profile Pic"
								: "Post a Picture"}
						</h2>
						<Form
							onSubmit={
								!this.props.changingAvatar
									? this.handleSubmitFile
									: this.handleSubmitAvatar
							}
						>
							{this.state.previewFile && (
								<PreviewImage src={this.state.previewFile} />
							)}
							<UploadImage>
								<input
									type="file"
									onChange={this.handleFileInputChange}
									value={this.state.file}
								/>
								<FontAwesomeIcon
									icon={faArrowUp}
									style={{ width: "30px", height: "30px" }}
								/>
							</UploadImage>

							{!this.props.changingAvatar && (
								<>
									<Caption
										placeholder="Caption"
										type="text"
										ref={this.captionRef}
									/>
									<SubmitButton
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.8 }}
										type="submit"
									>
										Post
									</SubmitButton>
								</>
							)}
							{this.props.changingAvatar && (
								<SubmitButton
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.8 }}
									type="submit"
								>
									Update
								</SubmitButton>
							)}
						</Form>
					</Container>
				</div>
			</>
		);
	}
}

export default AddPictureModal;
