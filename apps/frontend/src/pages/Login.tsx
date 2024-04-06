import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/account/login', {
        username,
        password,
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>
        <h2 className="text-3xl font-bold">Log In</h2>
      </div>
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border"
            required
          />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
            type="text" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border"
            required
          />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500"
        >
          Log In
        </button>
      </form>
      <div>
        <p>
          Don't have an account?
          <Link to="/signup" className="text-blue-500 pl-1">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
