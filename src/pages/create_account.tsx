import Head from 'next/head';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import Form, { FormValues } from 'src/components/Form';
import FormInput from 'src/components/FormInput';
import logo from '../assets/logo.png';
import { BooleanResult } from './api/create_new_account';
import { checkUsernameValid, checkPasswordValid } from 'src/utils';

export default function CreateAccount() {
  async function handleSubmit(formValues: FormValues) {
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });
      const resBody: BooleanResult = await response.json();
      console.log(resBody);
      if (resBody.result) {
        console.log('Account Created Successfully');
      } else {
        console.log(
          'Account creation was unsuccessful, please check all required fields'
        );
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
        ></link>
      </Head>
      <article className={styles.article}>
        <div className={styles.form_container}>
          <div className={styles.image_wrapper}>
            <Image src={logo} width={75} height={65} />
          </div>
          <h1 className={styles.title}>Create New Account</h1>
          <Form
            buttonText='Create Account'
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
          </Form>
        </div>
      </article>
    </>
  );
}
