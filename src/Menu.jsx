import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function Menu() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isAuthenticated = !!token;

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item has-text-white">
                        TP2
                    </Link>
                </div>

                <div className="navbar-end">
                    {isAuthenticated ? (
                        <>
                            <Link to="/history" className="navbar-item has-text-white">
                                History
                            </Link>
                            <Link to="/profile" className="navbar-item has-text-white">
                                Profile
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="navbar-item has-text-white"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="navbar-item has-text-white">
                                Signup
                            </Link>
                            <Link to="/login" className="navbar-item has-text-white">
                                Login
                            </Link>
                        </>
                    )}

                    <Link to="/about" className="navbar-item has-text-white">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
