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
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        TP2
                    </Link>
                </div>

                <div className="navbar-end">
                    {isAuthenticated ? (
                        <>
                            <Link to="/history" className="navbar-item">
                            History
                            </Link>
                            <Link to="/profile" className="navbar-item">
                                Profile
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="navbar-item"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="navbar-item">
                                Signup
                            </Link>
                            <Link to="/login" className="navbar-item">
                                Login
                            </Link>
                        </>
                    )}

                    <Link to="/about" className="navbar-item">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
