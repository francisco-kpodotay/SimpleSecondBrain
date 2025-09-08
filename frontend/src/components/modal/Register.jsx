import { useState } from 'react';

export function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Register')

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      userName,
      password
    };

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        console.error('Registration failed');
        setTitle('Registration failed. Try again!')
        return;
      }

      const newUser = await response.json();
      localStorage.setItem("publicId", JSON.stringify(newUser.publicId))
      setTitle('Registered successfully')
      console.log('Registered successfully:', newUser);

    } catch (error) {
      console.error('Error registering:', error);
      setTitle('Error registering')
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
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
