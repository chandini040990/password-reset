import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import './App.css';
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="https://chand2-password-reset.netlify.app/register" element = {<Register />} />
        <Route path="https://chand2-password-reset.netlify.app/login" element = {<Login />} />
        <Route path="ResetPassword" element = {<ResetPassword />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;