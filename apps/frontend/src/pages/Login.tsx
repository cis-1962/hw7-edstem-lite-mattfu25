import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // login form event handler
  const handleLogin = async (event) => {
    event.preventDefault(); // prevent default reload

    try {
      const response = await axios.post('/api/account/login', {
        username,
        password,
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        // eslint-disable-next-line no-alert
        alert('Login failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Login failed');
    }
  };

  return (
    <div>
      <header className="p-4 text-3xl bg-purple-400">Ed Kinda</header>
      <div className="min-h-screen flex flex-col items-center p-5 bg-purple-100">
        <div>
          <h2 className="text-3xl p-5">Log In</h2>
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
        <div className="p-5">
          <p>
            Do not have an account?
            <Link to="/signup" className="text-blue-500 pl-1">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
