import React, { useState, useEffect } from 'react';
import { validateForm } from './validators';
import { FormStateEnum } from './index';

import facebook from './assets/facebook.png';
import google from './assets/google.png';
import vk from './assets/vk.png';
import twitter from './assets/twitter.png';

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
  InpputWrapper,
  InputError,
  SmallText,
  FormContent,
  AccentText,
  Button,
  ButtonGroup,
  OutlineButton,
} from './styles';

import './style.css';

export interface FormState {
  fields: {
    email: string;
    password: string;
  };
  errors: {
    email?: string | undefined;
    password?: string | undefined;
  };
}

interface SignInProps {
  checkoutFormState: (state: FormStateEnum) => void;
}

export default function SignIn({ checkoutFormState }: SignInProps) {
  const [formState, setFormState] = useState<FormState>({
    fields: { email: '', password: '' },
    errors: { email: '', password: '' },
  });

  function onFieldsChangeHandler({ target }) {
    const { value, name } = target;

    setFormState(() => ({
      ...formState,
      fields: {
        ...formState.fields,
        [name]: value,
      },
    }));
  }

  function onSignIn() {
    const { isValid = {}, errors: fieldErrors = {} } = validateForm(formState);

    if (!isValid) {
      setFormState(() => ({
        ...formState,
        errors: { ...fieldErrors },
      }));
    }
  }

  return (
    <Wrapper>
      <FormWrapper>
        <FormLeftCol>
          <FormHeader>
            <Title> Вход в аккаунт </Title>
          </FormHeader>
          <FormContent>
            <InpputWrapper marginParams='0 0 16px 0'>
              <Input hasError={formState.errors['email']} name='email' placeholder='Email' onChange={onFieldsChangeHandler} />
              <InputError> {formState.errors['email']} </InputError>
            </InpputWrapper>
            <InpputWrapper marginParams='0 0 16px 0'>
              <Input hasError={formState.errors['password']} name='password' placeholder='Пароль' onChange={onFieldsChangeHandler} />
              <InputError> {formState.errors['password']} </InputError>
            </InpputWrapper>
          </FormContent>
          <Button marginParams='0 0 16px 0' onClick={onSignIn}>
            Вход
          </Button>

          <SmallText>
            У вас нет аккунта ?
            <AccentText pseudoLink onClick={() => checkoutFormState(FormStateEnum.SignUP)}>
              Регистрация
            </AccentText>
          </SmallText>
        </FormLeftCol>
        <FormRightCol />
      </FormWrapper>
    </Wrapper>
  );
}
