import { useState } from 'react';

export function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Login')

  async function handleSubmit(e) {
    e.preventDefault();

    const loginData = {
      userName,
      password
    };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        console.error('Login failed');
        setTitle('Login failed. Try again!')
        return;
      }

      const userData = await response.json();
      localStorage.setItem("publicId", JSON.stringify(userData.publicId))
      setTitle('Logged in successfully')
      console.log('Logged in successfully:', userData);

    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

