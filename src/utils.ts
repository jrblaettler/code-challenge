export const checkPasswordCracked = async (password: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/password_exposed`, {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    });
    const resBody = await response.json();
    return resBody.result;
  } catch (err) {
    console.log(err);
  }
};
