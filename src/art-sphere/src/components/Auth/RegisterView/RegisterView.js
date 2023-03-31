import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import './RegisterView.css';

const RegisterView = () => {
    useWebsiteTitle('Rejestracja');
    const { register, responseError, setResponseError } = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        return () => setResponseError('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const role = () => check ? "artysta" : "klient"
        const data = {
            email: email,
            password: pass,
            Role: role(),
        };
        const loginData = {
            email: email,
            password: pass,
        }
        await register(data, loginData);
    }

    return (
        <div className="auth-form-container bg-dark-subtle rounded-3 mt-5 p-3">
            <h2 className=" text-primary">Rejestracja</h2>
            <form className="register-form text-primary" onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                <input 
                    className="form-control" 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="email@gmail.com" 
                    id="email" 
                    name="email" 
                />
                <label htmlFor="password">Hasło</label>
                <input className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label htmlFor="password2">Powtórz hasło</label>
                <input className="form-control" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********" id="password2" name="password2" />
                <div className="check-div">
                    <input className="form-check-input m-2" value={check} onChange={(e) => setCheck(e.target.checked)} type="checkbox" id="artist" name="artist" />
                    <label className="form-check-label" htmlFor="artist">Czy jesteś artystą?</label>
                </div>
                {console.log(responseError)}
                {responseError && <p className='text-danger text-center mt-3 mb-0'>{responseError}</p>}
                <button className="btn btn-primary mt-3" type="submit">Rejestruj</button>
            </form>
            <NavLink to={'/logowanie'} className="btn nav-link text-primary text-decoration-underline m-2">Masz już konto? Zaloguj się!</NavLink>
        </div>
    )
}

export default RegisterView;