import Head from 'next/head';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import Form, { FormValues } from 'src/components/Form';
import FormInput from 'src/components/FormInput';
import logo from '../assets/logo.png';
import { BooleanResult } from './api/create_new_account';
import { checkUsernameValid, checkPasswordValid } from 'src/utils';
import { useState } from 'react';

export default function CreateAccount() {
  const [renderSuccessMessage, setRenderSuccessMessage] = useState(false);
  const [renderErrorMessage, setRenderErrorMessage] = useState(false);
  async function handleSubmit(formValues: FormValues) {
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });
      const resBody: BooleanResult = await response.json();
      if (resBody.result) {
        console.log('Account Created Successfully');
        setRenderSuccessMessage(true);
      } else {
        console.log(
          'Account creation was unsuccessful, please check all required fields'
        );
        setRenderErrorMessage(true);
      }
    } catch (err) {
      console.log(
        'An unknown error has occured while trying to create the account'
      );
    }
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <article className={styles.article}>
        <div className={styles.form_container}>
          <div className={styles.image_wrapper}>
            <Image src={logo} width={75} height={65} />
          </div>
          <h1 className={styles.title}>Create New Account</h1>
          <Form
            buttonText={
              renderSuccessMessage ? 'Account Created!' : 'Create Account'
            }
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={handleSubmit}
          >
            <FormInput
              label='Username'
              name='username'
              id='username'
              validate={checkUsernameValid}
            />
            <FormInput
              type='password'
              name='password'
              id='password'
              label='Password'
              validate={checkPasswordValid}
            />
            {renderErrorMessage ? (
              <p className={styles.error}>
                Invalid username and/or password. Please try again.
              </p>
            ) : null}
          </Form>
        </div>
      </article>
    </>
  );
}
