import { useState } from 'react';
import './MyStuff.css';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Call the auth method here to authenticate the user and get the JWT
        // Save the JWT in state or local storage

        // For demonstration purposes, let's assume the authentication is successful
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        return <div>Welcome, {email}</div>;
    } else {
        // User is not logged in, show email and password fields
        return (
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="menu-button" onClick={handleLogin}>Login</button>
            </div>
        );
    }
};

export default Login;
