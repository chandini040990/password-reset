import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setMessage("Password not matching!!");
            }
            else {
                const res = await api.put('https://chand2-password-reset.netlify.app/resetpassword', { email, password, token });
                if (res.ok || res.status === 201 ) {
                    console.log("Password is reset", res.data);
                    setMessage("Password reset successful");
                    setEmail('')
                    setPassword('')
                    setToken('')
                    setConfirmPassword('')
                    navigate("/login")
                }
            }
        } catch (error) {
            console.log(error)
            setMessage("Password reset failed.Token mismatching/invalid");
        }
    }

    return (
        <div className="resetPassword">
            <img className="w-16 h-16 ml-36" src="reset.png" alt="icon" />
            <h2 className="text-center font-bold text-2xl py-2">Reset Password Form</h2>
            {message && <p className="text-red-500 py-2 font-mono">{message}</p>}

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
                    <textarea name="Token" placeholder="Enter token sent in password reset email" type="text" rows="5" cols="15" value={token} onChange={(e) => setToken(e.target.value)} required />
                </div>

                <button type="submit">Reset</button>

            </form>


        </div>
    )

}

export default ResetPassword