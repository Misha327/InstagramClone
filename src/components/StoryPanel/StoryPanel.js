import React from "react";
import {
  Container,
  ContainerWrapper,
  Inner as ListWrapper,
  NextButton,
  PrevButton,
  StoryItem,
  StoryList,
} from "./styles/style";

import rightChevron from "../../images/chevron-right-solid.svg"
import leftChevron from "../../images/chevron-left-solid.svg"

export default function StoryPanel() {
  return (
    <>
      <Container>
        <ContainerWrapper>
        <PrevButton src={leftChevron}></PrevButton>

          <ListWrapper>
            <StoryList>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
              <StoryItem></StoryItem>
            </StoryList>
          </ListWrapper>
          <NextButton src={rightChevron}></NextButton>

        </ContainerWrapper>
      </Container>
    </>
  );
}
