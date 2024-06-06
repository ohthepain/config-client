import { useState } from 'react';

import { authenticate } from '../services/RequestManager';
import { useStore } from '../store';
import '../AppMenu.css';
import { fetchEnvironments } from '../services/RequestManager';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { email, setEmail, password, setPassword, projectId } = useStore();

    const handleLogin = async () => {
        if (email && password) {
            const token: string | null = await authenticate(email, password);
            if (token) {
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                if (projectId) {
                    fetchEnvironments(projectId);
                }
            } else {
                console.error('Failed to authenticate');
                localStorage.removeItem('token');
                handleLogout();
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <>
            <div>Welcome, {email}</div>
            <button className="button" onClick={handleLogout}>Logout</button>
            </>
        )
    } else {
        // User is not logged in, show email and password fields
        return (
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
        );
    }
};

export default Login;
