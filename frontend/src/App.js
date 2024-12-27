import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/resetpassword" element = {<ResetPassword />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;