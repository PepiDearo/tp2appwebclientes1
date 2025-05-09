import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { svrURL } from './constants';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const errorMessageRef = useRef(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const prefill = searchParams.get("username");
        if (prefill) {
            setUsername(prefill);
        }
    }, [searchParams]);

    useEffect(() => {
        if (errorMessages.length > 0 && errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [errorMessages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]);
        let errors = [];

        if (!username.trim()) errors.push("Le username est obligatoire.");
        if (!password.trim()) errors.push("Le mot de passe est obligatoire.");

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        try {
            const response = await fetch(svrURL+`/auth/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token);
                navigate("/");
            } else {
                setErrorMessages(["Mauvaise authentification."]);
            }
        } catch{
            setErrorMessages(["Erreur de connexion au serveur."]);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="title">Connexion</h1>

            {errorMessages.length > 0 && (
                <div
                    className="notification is-danger"
                    role="alert"
                    aria-live="assertive"
                    ref={errorMessageRef}
                >
                    {errorMessages.map((msg, i) => (
                        <p key={i}>{msg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="field">
                    <label htmlFor="username" className="label">Username</label>
                    <div className="control has-icons-left">
                        <input
                            id="username"
                            type="text"
                            className="input"
                            placeholder="e2271660"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-required="true"
                            aria-describedby="usernameError"
                        />
                        <span className="icon is-left">
                            <i className="fa fa-user"></i>
                        </span>
                    </div>
                    {errorMessages.some(msg => msg.includes("username")) && (
                        <p id="usernameError" className="help is-danger">Le username est obligatoire.</p>
                    )}
                </div>

                {/* Password */}
                <div className="field">
                    <label htmlFor="password" className="label">Mot de passe</label>
                    <div className="control has-icons-left">
                        <input
                            id="password"
                            type="password"
                            className="input"
                            placeholder="*******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-required="true"
                            aria-describedby="passwordError"
                        />
                        <span className="icon is-left">
                            <i className="fa fa-lock"></i>
                        </span>
                    </div>
                    {errorMessages.some(msg => msg.includes("mot de passe")) && (
                        <p id="passwordError" className="help is-danger">Le mot de passe est obligatoire.</p>
                    )}
                </div>

                <div className="buttons">
                    <button type="submit" className="button is-primary">Connexion</button>
                    <button type="button" onClick={handleCancel} className="button is-danger">Annuler</button>
                </div>
            </form>
        </div>
    );
}
