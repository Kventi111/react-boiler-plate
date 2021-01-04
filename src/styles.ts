import styled from 'styled-components';

import background from './assets/ttt.jpg';

const accentColor = '#ff5352';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: sans-serif;
`;

export const FormWrapper = styled.div`
  width: 700px;
  height: 600px;

  display: flex;
  border-radius: 8px;
  box-shadow: 6px 7px 17px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FormLeftCol = styled.div`
  width: 60%;

  display: flex;
  flex-direction: column;
  padding: 0 60px;
  justify-content: center;
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormRightCol = styled.div`
  width: 40%;
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  color: ${accentColor};
  font-size: 24px;
  font-weight: bold;
  padding: 60px 0 16px 0;
`;

export const SmallText = styled.div`
  display: flex;
  color: #888d8e;
  font-size: 14px !important;
  padding-bottom: 8px;
  text-align: left;
  margin: 0 0 34px 0;
`;

export const AccentText = styled.span`
  color: ${accentColor};
  margin: 0 4px;
  font-size: inherit;
  cursor: ${({ pseudoLink }) => (pseudoLink ? 'pointer' : 'default')};
`;

export const SocialItem = styled.div`
  width: 20px;
  height: 20px;

  border-radius: 50%;
  border: 1px solid;
  cursor: pointer;

  background-image: ${({ imgPath }) => imgPath && `url(${imgPath})`};
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 8px;
`;

export const SocialList = styled.div`
  display: flex;
  padding-bottom: 16px;
`;

export const Input = styled.input`
  background-color: #f7f8f9;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid #ebeff2;
  font-size: 14px;
  margin: ${({ marginParams }) => marginParams && marginParams};
  border: ${({ hasError }) => hasError && `1px solid red`};

  ::placeholder {
    color: #cbd4d7;
  }
`;

export const InpputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ marginParams }) => marginParams && marginParams};
`;

export const InputError = styled.div`
  font-size: 10px;
  height: 8px;
  color: #e62300;
`;

export const Button = styled.button`
  background: ${accentColor};
  border: none;
  color: #fff;
  padding: 16px 40px;
  font-weight: bold;
  margin: ${({ marginParams }) => marginParams && marginParams};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #f33c3b;
  }

  &:disabled {
    cursor: default;
    background: grey;
  }
`;

export const OutlineButton = styled(Button)`
  background: transparent;
  border: 1px solid ${accentColor};
  color: ${accentColor};
  padding: 15px 39px;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
