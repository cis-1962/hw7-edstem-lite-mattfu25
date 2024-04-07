import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // singup form event handler
  const handleSignUp = async (event) => {
    event.preventDefault(); // prevent default reload

    try {
      const response = await axios.post('/api/account/signup', {
        username,
        password,
      });
      if (response.status === 201) {
        navigate('/');
      } else {
        // eslint-disable-next-line no-alert
        alert('Signup failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Signup failed');
    }
  };

  return (
    <div>
      <header className="p-4 text-3xl bg-purple-400">Ed Kinda</header>
      <div className="min-h-screen flex flex-col items-center p-5 bg-purple-100">
        <div>
          <h2 className="text-3xl p-5">Sign Up</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSignUp}>
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
            Sign Up
          </button>
        </form>
        <div className="p-5">
          <p>
            Already have an account?
            <Link to="/login" className="text-blue-500 pl-1">
              Log in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
