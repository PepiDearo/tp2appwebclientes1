import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sha1 } from "./sha1";  
import { svrURL } from './constants';

export function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        if (errorMessageRef.current && errorMessages.length > 0) {
            errorMessageRef.current.focus();
        }
    }, [errorMessages]);

    const isPasswordCompromised = async (password) => {
        const hashedPassword = await sha1(password); 
        const firstFiveChars = hashedPassword.slice(0, 5); 
        const restOfHash = hashedPassword.slice(5).toUpperCase(); 

        const response = await fetch(`https://api.pwnedpasswords.com/range/${firstFiveChars}`);
        const data = await response.text();

        const isCompromised = data.includes(restOfHash);
        return isCompromised;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]); 

        let isValid = true;
        let errors = [];

        const rEmailSymbole = /@/;
        if (!rEmailSymbole.test(email)) {
            errors.push("Le courriel doit contenir le symbole @.");
            isValid = false;
        }
        const rEmailLongueur = /^.{5,50}$/;
        if (!rEmailLongueur.test(email)) {
            errors.push("Le courriel doit contenir entre 5 et 50 caractères.");
            isValid = false;
        }

        if (!username.trim()) {
            errors.push("Le username est obligatoire.");
            isValid = false;
        }

        const usernameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;
        if (!usernameRegex.test(username)) {
            errors.push("Le username doit commencer par une lettre et peut seulement être composé de lettres, de chiffres et du caractère souligné.");
            isValid = false;
        }

        const usernameLongueur = /^.{5,30}$/;
        if (!usernameLongueur.test(username)) {
            errors.push("Le username doit contenir entre 5 et 30 caractères.");
            isValid = false;
        }

        const passwordRegex = /[!@#$%&*]/;
        if (!passwordRegex.test(password)) {
            errors.push("Le mot de passe doit inclure l'un des caractères suivants: !@#$%&*.");
            isValid = false;
        }

        const passwordLongueur = /^.{8,30}$/;
        if (!passwordLongueur.test(password)) {
            errors.push("Le mot de passe doit contenir entre 8 et 30 caractères.");
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.push("Les mots de passe ne correspondent pas.");
            isValid = false;
        }

        if (await isPasswordCompromised(password)) {
            errors.push("Le mot de passe est compromis. Veuillez en choisir un autre.");
            isValid = false;
        }

        if (!isValid) {
            setErrorMessages(errors);
            return;
        }

        try {
            const response = await fetch(`${svrURL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.status === 201) {
                navigate(`/login?username=${username}`);
            } else {
                const data = await response.json();
                setErrorMessages([data.message || "Erreur lors de l'inscription."]);
            }
        } catch (err) {
            setErrorMessages([err.message || "Erreur lors de l'inscription."]);
        }
    };

    const handleCancel = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessages([]);
    };

    return (
        <div className="container">
            <h1 className="title" role="heading" aria-level="1">Inscription</h1>

            {errorMessages.length > 0 && (
                <div className="notification is-danger" role="alert" aria-live="assertive" ref={errorMessageRef}>
                    {errorMessages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email" className="label">Email</label>
                    <div className="control has-icons-left">
                        <input
                            id="email"
                            type="email"
                            className="input"
                            placeholder="e1234567@site.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-required="true"
                            aria-describedby="emailHelp"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="username" className="label">Username</label>
                    <div className="control has-icons-left">
                        <input
                            id="username"
                            type="text"
                            className="input"
                            placeholder="e1234567"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-required="true"
                            aria-describedby="usernameHelp"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
                        </span>
                    </div>
                </div>

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
                            aria-describedby="passwordHelp"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-lock"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="confirmPassword" className="label">Confirmer le mot de passe</label>
                    <div className="control has-icons-left">
                        <input
                            id="confirmPassword"
                            type="password"
                            className="input"
                            placeholder="*******"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            aria-required="true"
                            aria-describedby="confirmPasswordHelp"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-lock"></i>
                        </span>
                    </div>
                </div>

                <div className="buttons">
                    <button type="submit" className="button is-primary">S'inscrire</button>
                    <button type="button" onClick={handleCancel} className="button is-light">Annuler</button>
                </div>
            </form>
        </div>
    );
}
