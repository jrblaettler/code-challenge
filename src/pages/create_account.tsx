import Head from 'next/head';
import { FormEvent, ChangeEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
// import logo from '../assets/logo.png';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordCracked, setIsPasswordCracked] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const resBody = await response.json();
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
      if (resBody.errors?.password === 'cracked') {
        setIsPasswordCracked(true);
        setIsUsernameError(false);
        setIsPasswordError(false);
      }
      if (resBody.result === true) {
        console.log('Account Created');
        setIsPasswordError(false);
        setIsUsernameError(false);
        setIsPasswordCracked(false);
      }
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'username') {
      setUsername(e.currentTarget.value);
    }
    if (e.currentTarget.name === 'password') {
      setPassword(e.currentTarget.value);
    }
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
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <Image src={logo} width={75} height={65} /> */}
          <h1 className={styles.title}>Create New Account</h1>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor='username'>
              Username
            </label>
            <input
              className={styles.input}
              name='username'
              type='text'
              onChange={e => handleTextChange(e)}
              value={username}
            />
            {isUsernameError ? (
              <p className={styles.error}>
                Username must be between 10 and 50 characters
              </p>
            ) : null}
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor='password'>
              Password
            </label>
            <input
              className={styles.input}
              name='password'
              type='password'
              onChange={e => handleTextChange(e)}
              value={password}
            />
            {isPasswordCracked ? (
              <p className={styles.error}>
                This password has been hacked elsewhere, choose a different one
              </p>
            ) : null}
            {isPasswordError ? (
              <>
                <p className={styles.error}>Password must:</p>
                <ul className={styles.error}>
                  <li>be between 20 and 50 characters</li>
                  <li>contain at least one symbol (!,@,#,$,%)</li>
                  <li>contain at least one uppercase or lowercase letter</li>
                  <li>contain at least one number(0-9)</li>
                </ul>
              </>
            ) : null}
          </div>
          <button className={styles.button} type='submit'>
            Create Account
          </button>
        </form>
      </article>
    </>
  );
}
