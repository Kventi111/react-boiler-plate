import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import SignUp from './signUp';
import SignIn from './signIn';

export enum FormStateEnum {
  SignIN;
  SignUP;
}

function App() {  
  const [formState,setFormState] = useState<FormStateEnum>(FormStateEnum.SignIN);

  function checkoutFormState(state: FormStateEnum) {
    setFormState(state)
  }

  return formState === FormStateEnum.SignIN ? <SignIn checkoutFormState={checkoutFormState} /> : <SignUp checkoutFormState={checkoutFormState} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
