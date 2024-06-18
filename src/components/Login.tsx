import { authenticate } from '../services/RequestManager';
import { useStore } from '../store';
import { fetchEnvironments } from '../services/RequestManager';
import { isTokenExpired } from '../services/TokenUtils';

const Login = () => {
    const { token, setToken, email, setEmail, password, setPassword, project, editAccount, setEditAccount } = useStore();

    const handleLogin = async () => {
        if (email && password) {
            const token: string | null = await authenticate(email, password);
            if (token) {
                setToken(token);
                if (project) {
                    fetchEnvironments(project.id);
                }
            } else {
                console.error('Failed to authenticate');
                localStorage.removeItem('token');
                handleLogout();
            }
        }
    };

    const handleLogout = () => {
        setToken(null);
    };

    if (token && !isTokenExpired(token)) {
        return (
            <div className='flex-col w-64 bg-slate-50'>
                <div className='flex place-content-center m-2' onClick={() => {setEditAccount(!editAccount); console.log('editAccount', editAccount)}}>
                    {email}
                </div>
                <div className='flex place-content-center m-2'>
                    <button className="flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )
    } else {
        // User is not logged in, show email and password fields
        return (
            <div className='flex-col w-64 bg-slate-50'>
                <input
                    className='flex place-content-center m-2'
                    type="email"
                    placeholder="Email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className='flex place-content-center m-2'
                    placeholder="Password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10" onClick={handleLogin}>Login</button>
            </div>
        );
    }
};

export default Login;
