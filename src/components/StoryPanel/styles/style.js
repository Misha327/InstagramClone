import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 15px 0;
  height: auto;
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid #e3e3e3;
  background-color: white;

  @media only screen and (max-width: 640px) {
    margin: 0;
  }
`;

export const ContainerWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Inner = styled.div`
  overflow-y: hidden;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const NextButton = styled.img`
  position: absolute;
  right: 0px;
  height: 30px;
  width: 40px;
`;

export const PrevButton = styled.img`
  position: absolute;
  left: 0;
  height: 30px;
  width: 40px;
`;

export const StoryList = styled.div`
  display: flex;
  // justify-content:spaced-evenly;
`;

export const StoryItem = styled.div`
  min-height: 70px;
  min-width: 70px;

  border-radius: 50%;
  border: solid red;
  margin-right: 15px;
  &:first-child {
    margin-left: 15px;
  }

`;
