import React from 'react';

import {
  Wrapper,
  FormWrapper,
  FormLeftCol,
  FormRightCol,
  FormHeader,
  Title,
  SocialItem,
  SocialList,
  Input,
  SmallText,
  FormContent,
  AccentText,
  Button,
  ButtonGroup,
  OutlineButton,
} from './styles';

import facebook from './assets/facebook.png';
import google from './assets/google.png';
import vk from './assets/vk.png';
import twitter from './assets/twitter.png';

import './style.css';

export default function Auth() {
  return (
    <Wrapper>
      <FormWrapper>
        <FormLeftCol>
          <FormHeader>
            <Title> Сreate account </Title>
            <SocialList>
              <SocialItem imgPath={facebook} />
              <SocialItem imgPath={google} />
              <SocialItem imgPath={vk} />
              <SocialItem imgPath={twitter} />
            </SocialList>
            <SmallText>or use your email for regestration</SmallText>
          </FormHeader>
          <FormContent>
            <Input marginParams='0 0 16px 0' placeholder='Email' />
            <Input marginParams='0 0 16px 0' placeholder='Password' />
          </FormContent>
          <SmallText>
            <label className='checkbox'>
              <span className='checkbox__input'>
                <input type='checkbox' name='checkbox' />
                <span className='checkbox__control'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                    <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                  </svg>
                </span>
              </span>
              {/* <span class='radio__label'>Checkbox</span> */}
            </label>
            I agree to the <AccentText> Terms </AccentText> and <AccentText> Privacy Policy. </AccentText>
          </SmallText>
          <ButtonGroup>
            <Button marginParams='0 16px 0 0'> Sign Up </Button>
            <OutlineButton> Sign In </OutlineButton>
          </ButtonGroup>
        </FormLeftCol>
        <FormRightCol />
      </FormWrapper>
    </Wrapper>
  );
}
