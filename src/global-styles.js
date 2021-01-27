import { createGlobalStyle } from "styled-components";
import courgette from "./fonts/Courgette-Regular.ttf";
import Montserrat from "./fonts/Montserrat-Medium.ttf";
import Noto from "./fonts/NotoSansJP-Medium.otf";
export const GlobalStyles = createGlobalStyle` 

// @font-face {
//   font-family: 'Montserrat';
//   src: url(${Montserrat}) format('truetype');
//   font-weight: 400;
//   font-style: normal;
//   font-display: auto;
// }

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box !important;
  font-family: 'sans-serif', sans-serif;
  color: rgb(38, 38, 38);

}
html { overflow-y: scroll; }
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	background-color: #f7f7f7;

}
`;
