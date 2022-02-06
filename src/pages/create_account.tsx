import Head from 'next/head';
import { FormEvent, ChangeEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordCracked, setIsPasswordCracked] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    try {
      const passwordCracked = await checkPasswordCracked(password);
      setIsPasswordCracked(passwordCracked);
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const resBody = await response.json();
      if (resBody.errors.username === 'fail') {
        setIsUsernameError(true);
      }
      if (resBody.errors.password === 'fail') {
        setIsPasswordError(true);
      }
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  const checkPasswordCracked = async (password: string) => {
    const response = await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    });
    const resBody = await response.json();
    return resBody.result;
  };

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Create New Account</h1>
          <label htmlFor='username'>Username</label>
          <input
            className={styles.input}
            name='username'
            type='text'
            placeholder='username'
            onChange={e => handleUserChange(e)}
            value={username}
          />
          {isUsernameError ? (
            <p>Username must be between 10 and 50 characters</p>
          ) : null}
          <label htmlFor='password'>Password</label>
          <input
            className={styles.input}
            name='password'
            type='password'
            placeholder='password'
            onChange={e => handlePasswordChange(e)}
            value={password}
          />
          {isPasswordCracked ? (
            <p>
              This password has been hacked elsewhere, choose a different one
            </p>
          ) : null}
          {isPasswordError ? (
            <ul>
              Password must:
              <li>be between 20 and 50 characters</li>
              <li>contain at least one symbol (!,@,#,$,%)</li>
              <li>contain at least one uppercase or lowercase letter</li>
              <li>contain at least one number(0-9)</li>
            </ul>
          ) : null}
          <button className={styles.button} type='submit'>
            Create Account
          </button>
        </form>
      </article>
    </>
  );
}
