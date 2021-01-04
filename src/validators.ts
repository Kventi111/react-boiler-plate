import { FormState as SignInFormState } from './signUp';

function checkEmptyFields(fields) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const errors = {};

  values.forEach((value, index) => {
    if (!value) {
      return (errors[keys[index]] = 'Поле не заполненно');
    }
  });

  return errors;
}

function isValidEmail(email: string): object {
  const errors = {};

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return { email: 'Не верный формат' };
  }

  return {};
}

function passwordLength(password: string) {
  if (password.length < 5) {
    return { password: 'Длина пароля должна быть больше 5 символов' };
  }

  return {};
}

interface validateFormReturnValues {
  isValid: boolean;
  errors: {
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
  };
}

export function validateForm(formState): validateFormReturnValues {
  let isValid;
  const emptyFields = checkEmptyFields(formState.fields);
  const validEmail = !emptyFields['email'] && isValidEmail(formState.fields.email);
  const passwrodLength = !emptyFields['password'] && passwordLength(formState.fields.password);

  console.log({ emptyFields });
  console.log({ validEmail });
  console.log(Object.keys(emptyFields));

  if (Object.keys(emptyFields)) {
    isValid = false;
  }

  console.log({ isValid });

  return { isValid, errors: { ...emptyFields, ...validEmail, ...passwrodLength } };
}
