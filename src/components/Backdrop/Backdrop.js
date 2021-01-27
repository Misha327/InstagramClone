import React from "react";
import styled from "styled-components";



export default function Backdrop(props) {
	return <Backdrops onClick={props.handleExit}></Backdrops>;
}

const Backdrops = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	background: rgba(0, 0, 0, 0.6);
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 999;
`

// // The Button from the last section without the interpolations
// const Button = styled.button`
//   color: palevioletred;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

// // A new component based on Button, but with some override styles
// const TomatoButton = styled(Button)`
//   color: tomato;
//   border-color: tomato;
// `;
