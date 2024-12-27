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
        <Route path="https://chand-password-reset.netlify.app/" element = {<Register />} />
        <Route path="https://chand-password-reset.netlify.app/login" element = {<Login />} />
        <Route path="https://chand-password-reset.netlify.app/resetpassword" element = {<ResetPassword />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;