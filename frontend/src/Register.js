import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/register', { email, password });
            console.log(res.data.message)
            if (res.ok || res.status === 201) {
                console.log("user is registered", res.data);
                setMessage("Registration is successful");
                setEmail('')
                setPassword('')
                navigate("/login")
            } else {
                console.log("User registration failed/User already exists");
                setMessage("User registration failed/User already exists");
            }

        } catch (error) {
            console.log(error)
            // setMessage("User registration failed/User already exists");
        }
    }

    return (
        <div className="register">
            <img className="w-16 h-16 ml-36" src="icon.png" alt="icon" />
            <h2 className="text-center font-bold text-2xl py-2">Registration Form</h2>
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

                <button type="submit">Register</button>

            </form>


        </div>
    )

}

export default Register