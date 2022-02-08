import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import Form from 'src/components/Form';
import FormInput from 'src/components/FormInput';
import logo from '../assets/logo.png';
import {
  CreateNewAccountParameters,
  BooleanResult,
} from './api/create_new_account';
import {
  checkPasswordCracked,
  isUsernameValid,
  isPasswordValid,
} from 'src/utils';

export default function CreateAccount() {
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isPasswordCharValid, setIsPasswordCharValid] = useState(true);
  const [isPasswordNumValid, setIsPasswordNumValid] = useState(true);
  const [isPasswordSymbolValid, setIsPasswordSymbolValid] = useState(true);
  const [isPasswordCracked, setIsPasswordCracked] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);

  async function handleSubmit(formValues: CreateNewAccountParameters) {
    try {
      if (!(await checkPasswordCracked(formValues.password))) {
        setIsPasswordCracked(false);
        const response = await fetch('/api/create_new_account', {
          method: 'POST',
          body: JSON.stringify(formValues),
        });
        const resBody: BooleanResult = await response.json();
        if (resBody.errors?.username === 'fail') {
          setIsUsernameError(true);
        } else {
          setIsUsernameError(false);
        }
        if (resBody.errors?.password === 'fail') {
          setIsPasswordError(true);
        } else {
          setIsPasswordError(false);
        }
        if (resBody.result === true) {
          console.log('Account Created');
          setIsPasswordError(false);
          setIsUsernameError(false);
          setIsPasswordCracked(false);
        }
      } else {
        setIsPasswordCracked(true);
        setIsUsernameError(false);
        setIsPasswordError(false);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }

  const handleUsernameValidation = (e: ChangeEvent<HTMLInputElement>) => {
    isUsernameValid(e.target.value)
      ? setIsUsernameError(false)
      : setIsUsernameError(true);
  };

  const handlePasswordValidation = async (e: ChangeEvent<HTMLInputElement>) => {
    (await checkPasswordCracked(e.target.value))
      ? setIsPasswordCracked(true)
      : setIsPasswordCracked(false);

    const isValid = isPasswordValid(e.target.value);
    setIsPasswordLengthValid(isValid.length);
    setIsPasswordCharValid(isValid.character);
    setIsPasswordNumValid(isValid.number);
    setIsPasswordSymbolValid(isValid.symbol);
    console.log(isValid);
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <article className={styles.article}>
        <Form
          buttonText='Create Account'
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          <Image src={logo} width={75} height={65} />
          <h1 className={styles.title}>Create New Account</h1>
          <FormInput
            label='Username'
            name='username'
            id='username'
            onChange={handleUsernameValidation}
          />
          {isUsernameError ? (
            <p className={styles.error}>
              Username must be between 10 and 50 characters
            </p>
          ) : null}
          <FormInput
            type='password'
            name='password'
            id='password'
            label='Password'
            onChange={handlePasswordValidation}
          />
          {isPasswordCracked ? (
            <p className={styles.error}>
              This password has been hacked elsewhere, choose a different one
            </p>
          ) : null}
          {isPasswordError ? (
            <div>
              <p className={styles.error}>Password must:</p>
              <ul className={styles.error}>
                <li>be between 20 and 50 characters</li>
                <li>contain at least one symbol (!,@,#,$,%)</li>
                <li>contain at least one uppercase or lowercase letter</li>
                <li>contain at least one number(0-9)</li>
              </ul>
            </div>
          ) : null}
        </Form>
      </article>
    </>
  );
}
