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
  SmallText,
  FormContent,
  AccentText,
  Button,
  ButtonGroup,
  OutlineButton,
  InpputWrapper,
  InputError,
} from './styles';

import './style.css';

export interface FormState {
  fields: {
    email: string;
    password: string;
    name: string;
    privatePolicy: boolean;
  };
  errors: {
    email?: string | undefined;
    password?: string | undefined;
    name?: string | undefined;
  };
}

interface SignUpProps {
  checkoutFormState: (state: FormStateEnum) => void;
}

export default function SignUp({ checkoutFormState }: SignUpProps) {
  const [formState, setFormState] = useState<FormState>({
    fields: { email: '', password: '', name: '', privatePolicy: false },
    errors: { email: '', password: '', name: '' },
  });

  function onFieldsChangeHandler({ target }) {
    const { value, name } = target;

    console.log({ value, name });

    setFormState(() => ({
      ...formState,
      fields: {
        ...formState.fields,
        [name]: value,
      },
    }));
  }

  function onSignUp() {
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
            <Title> Регистрация </Title>
            <SocialList>
              <SocialItem imgPath={facebook} />
              <SocialItem imgPath={google} />
              <SocialItem imgPath={vk} />
              <SocialItem imgPath={twitter} />
            </SocialList>
            <SmallText>или используйте почту для регистрации</SmallText>
          </FormHeader>
          <FormContent>
            <InpputWrapper marginParams='0 0 16px 0'>
              <Input hasError={formState.errors['name']} name='name' placeholder='Имя' onChange={onFieldsChangeHandler} />
              <InputError> {formState.errors['name']} </InputError>
            </InpputWrapper>
            <InpputWrapper marginParams='0 0 16px 0'>
              <Input hasError={formState.errors['email']} name='email' placeholder='Email' onChange={onFieldsChangeHandler} />
              <InputError> {formState.errors['email']} </InputError>
            </InpputWrapper>
            <InpputWrapper marginParams='0 0 16px 0'>
              <Input hasError={formState.errors['password']} name='password' placeholder='Пароль' onChange={onFieldsChangeHandler} />
              <InputError> {formState.errors['password']} </InputError>
            </InpputWrapper>
          </FormContent>
          <SmallText>
            <label className='checkbox'>
              <span className='checkbox__input'>
                <input
                  type='checkbox'
                  name='privatePolicy'
                  onChange={() =>
                    setFormState(() => ({
                      ...formState,
                      fields: {
                        ...formState.fields,
                        privatePolicy: !formState.fields.privatePolicy,
                      },
                    }))
                  }
                  checked={formState.fields.privatePolicy}
                />
                <span className='checkbox__control'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                    <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                  </svg>
                </span>
              </span>
              <span className='radio__label'>
                Я согласен с <AccentText> Условиями </AccentText> и <AccentText> Политикой конфиденциальности. </AccentText>
              </span>
            </label>
          </SmallText>
          <Button marginParams='0 0 16px 0' onClick={onSignUp}>
            Регистрация
          </Button>

          <SmallText>
            У вас есть аккаунт ?
            <AccentText pseudoLink onClick={() => checkoutFormState(FormStateEnum.SignIN)}>
              Войти
            </AccentText>
          </SmallText>
        </FormLeftCol>
        <FormRightCol />
      </FormWrapper>
    </Wrapper>
  );
}
