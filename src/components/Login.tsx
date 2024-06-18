import { authenticate } from "../services/RequestManager";
import { useStore } from "../store";
import { fetchEnvironments } from "../services/RequestManager";
import { isTokenExpired } from "../services/TokenUtils";

const Login = () => {
  const {
    token,
    setToken,
    email,
    setEmail,
    password,
    setPassword,
    project,
    editAccount,
    setEditAccount,
  } = useStore();

  const handleLogin = async () => {
    if (email && password) {
      const token: string | null = await authenticate(email, password);
      if (token) {
        setToken(token);
        if (project) {
          fetchEnvironments(project.id);
        }
      } else {
        console.error("Failed to authenticate");
        localStorage.removeItem("token");
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  if (token && !isTokenExpired(token)) {
    return (
      <div className="w-64 flex-col bg-slate-50">
        <div
          className="m-2 flex place-content-center"
          onClick={() => {
            setEditAccount(!editAccount);
            console.log("editAccount", editAccount);
          }}
        >
          {email}
        </div>
        <div className="m-2 flex place-content-center">
          <button
            className="flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    // User is not logged in, show email and password fields
    return (
      <div className="w-64 flex-col bg-slate-50">
        <input
          className="m-2 flex place-content-center"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="m-2 flex place-content-center"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    );
  }
};

export default Login;
