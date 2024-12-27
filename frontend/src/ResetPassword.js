import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState("");
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            if (password !== confirmPassword) {
                setMessage("Password not matching!!");
            }
            else {
                const res = await api.post('/resetpassword', { email, password, token });
                if (res.ok || res.status === 201) {
                    const data = await res.json();
                    console.log("Password is reset", data);
                    setMessage("Password reset successful");
                    setEmail('')
                    setPassword('')
                    setToken('')
                    setConfirmPassword('')
                    navigate("/login")
                } else {
                    const errordata = await res.json();
                    console.log("Password reset failed.Token mismatching/invalid");
                    setError(errordata.message || "Password reset failed.Token mismatching/invalid");
                }
            }
        } catch (error) {
            console.log(error)
            setError("Password reset failed");
        }
    }

    return (
        <div className="resetPassword">
            <img className="w-16 h-16 ml-36" src="reset.png" alt="icon" />
            <h2 className="text-center font-bold text-2xl py-2">Reset Password Form</h2>
            {message && <p className="text-green-600 py-2 font-mono">{message}</p>}
            {error && <p className="text-red-600 py-2 font-mono">{error}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>New Password:</label>
                    <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <div>
                    <label>Token:</label>
                    <textarea name="Token" placeholder="Enter token sent in password reset email" type="password" rows="5" cols="15" value={token} onChange={(e) => setToken(e.target.value)} required />
                </div>

                <button type="submit">Reset</button>

            </form>


        </div>
    )

}

export default ResetPassword