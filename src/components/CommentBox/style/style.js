import styled from "styled-components";

export const CommentBox = styled.div`

`;




export const AddCommentContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  padding: 0 16px;
  max-height: 80px;
  border-top: solid 1px rgb(219, 219, 219);

`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  
`;

export const TextArea = styled.textarea`
  height: 18px;
  font-size: 14px;
  resize: none;
  overflow: auto;
  outline: none;
  max-height: 56px;
  width: 100%;
  display: flex;
  border: none;
  white-space: pre-line;
  ::-webkit-input-placeholder {
  }
`;

export const SubmitButton = styled.button`
  font-weight: 600;
  color: #149ff0;
  font-size: 14px;
  background: transparent;
  border: none;
  
`;
