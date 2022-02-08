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
  checkUsernameValid,
  checkPasswordValid,
} from 'src/utils';

export default function CreateAccount() {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isPasswordCharValid, setIsPasswordCharValid] = useState(true);
  const [isPasswordNumValid, setIsPasswordNumValid] = useState(true);
  const [isPasswordSymbolValid, setIsPasswordSymbolValid] = useState(true);
  const [isPasswordCracked, setIsPasswordCracked] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [renderFieldsWarning, setRenderFieldsWarning] = useState(false);

  async function handleSubmit(formValues: CreateNewAccountParameters) {
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });
      const resBody: BooleanResult = await response.json();
      if (resBody.result) {
        console.log('Account Created Successfully');
        setRenderFieldsWarning(false);
      } else {
        console.log(
          'Account creation was unsuccessful, please check all required fields'
        );
        setRenderFieldsWarning(true);
      }
    } catch (err) {
      console.log(
        'An unknown error has occured while trying to create the account'
      );
    }
  }

  const handleUsernameValidation = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUsernameValid(checkUsernameValid(e.target.value));
  };

  const handlePasswordValidation = async (e: ChangeEvent<HTMLInputElement>) => {
    (await checkPasswordCracked(e.target.value))
      ? setIsPasswordCracked(true)
      : setIsPasswordCracked(false);

    const isValid = checkPasswordValid(e.target.value);
    setIsPasswordValid(isValid.password);
    setIsPasswordLengthValid(isValid.length);
    setIsPasswordCharValid(isValid.character);
    setIsPasswordNumValid(isValid.number);
    setIsPasswordSymbolValid(isValid.symbol);
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
          {renderFieldsWarning ? (
            <p className={styles.error}>Please fill out all fields.</p>
          ) : null}
          <FormInput
            label='Username'
            name='username'
            id='username'
            onChange={handleUsernameValidation}
          />
          {isUsernameValid ? null : (
            <p className={styles.error}>
              Username must be between 10 and 50 characters
            </p>
          )}
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
          {isPasswordValid ? null : (
            <div>
              <p className={styles.error}>Password must:</p>
              <ul className={styles.error}>
                {isPasswordLengthValid ? null : (
                  <li>be between 20 and 50 characters</li>
                )}
                {isPasswordCharValid ? null : (
                  <li>contain at least one uppercase or lowercase letter</li>
                )}
                {isPasswordNumValid ? null : (
                  <li>contain at least one number(0-9)</li>
                )}
                {isPasswordSymbolValid ? null : (
                  <li>contain at least one symbol (!,@,#,$,%)</li>
                )}
              </ul>
            </div>
          )}
        </Form>
      </article>
    </>
  );
}
