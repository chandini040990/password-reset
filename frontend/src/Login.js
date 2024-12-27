import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "./api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    // const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            if (res.ok || res.status === 201) {
                console.log("user is logged in", res.data);
                setMessage("Login successful");
                // navigate("/login")
            } else {
                console.log("Login Failed. Invalid email/password");
                setMessage("Login Failed. Invalid email/password");
            }

        } catch (error) {
            console.log(error)
            // setMessage("Login Failed. Invalid email/password");
            // navigate("/resetpassword")
        }
    }

    // handle form submit
    const handleEmail = async (e) => {
        e.preventDefault();
        try {
            const resp = await api.post('/forgotpassword', { email });
            if (resp.ok || resp.status === 201) {
                console.log("Link to reset password has been sent to your email", resp.data);
                setMessage("Link to reset password has been sent to your email");
                // navigate("/resetpassword")
            } else {
                console.log("Error sending password reset mail");
                setMessage("Error sending password reset mail");
            }
        } catch (error) {
            console.log(error)
            // setMessage("Error sending password reset mail");
        }
    }


    return (
        <div className="login">
            <img className="w-16 h-16 ml-36" src="icon.png" alt="icon" />
            <h2 className="text-center font-bold text-2xl py-2">Login Form</h2>
            {message && <p className="text-red-500 py-2 font-mono">{message}</p>}
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>


                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Login</button>

                <a className="text-center text-blue-600 underline pt-2" href="ResetPassword" onClick={handleEmail} target="_blank">Forgot your password?</a>

            </form>

        </div>
    )

}

export default Login