import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/Login';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
