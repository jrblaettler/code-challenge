import Head from 'next/head';
import { FormEvent, ChangeEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log(await response.json());
  }

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
            name='username'
            type='text'
            placeholder='username'
            onChange={e => handleUserChange(e)}
            value={username}
          />
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='password'
            onChange={e => handlePasswordChange(e)}
            value={password}
          />
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
