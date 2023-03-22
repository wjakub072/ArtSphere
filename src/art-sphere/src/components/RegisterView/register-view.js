import React, { useState } from "react";
import './register-view.css';

const RegisterView = () => {
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [role, setRole] = useState('');

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Rejestracja</h2>
            <form className="register-form" onSubmit={handleSumbit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@gmail.com" id="email" name="email" />
                <label htmlFor="password">Hasło</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label htmlFor="password2">Powtórz hasło</label>
                <input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password2" placeholder="********" id="password2" name="password2" />
                <label htmlFor="artist">Artysta</label>
                <input className="rolebox" value={role} onChange={(e) => setRole(e.target.value)} type="checkbox" id="artist" name="artist" />
                <br/>
                <button type="submit">Rejestruj</button>
            </form>
            <button className="link-btn">Masz już konto? Zaloguj się!</button>
        </div>
    )
}

export default RegisterView;