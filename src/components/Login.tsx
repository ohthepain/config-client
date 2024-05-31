import { useState } from 'react';

import { authenticate } from '../services/RequestManager';

import '../MyStuff.css';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const token: string | null = await authenticate(email, password);
        if (token) {
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        } else {
            console.error('Failed to authenticate');
            localStorage.removeItem('token');
            handleLogout();
        }
        // For demonstration purposes, let's assume the authentication is successful
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <>
            <div>Welcome, {email}</div>
            <button className="menu-button" onClick={handleLogout}>Logout</button>
            </>
        )
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
