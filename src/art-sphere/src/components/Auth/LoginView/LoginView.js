import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import AuthContext from '../../../context/AuthContext';
import './LoginView.css';

function renderEmailInput(onChange) {
    return (
        <input onChange={e => onChange(e.target.value)} className='form-control loginForm' type='email' id='email' placeholder='Adres email'>
        </input>
    );
}

function renderPasswordInput(onChange) {
    return (
        <input onChange={e => onChange(e.target.value)} className='loginForm form-control' type='password' id='password' placeholder='Hasło'>
        </input>
    );
}

function renderInput(type, onChange) {
    if (type === 'email'){
        return (
        <div className='loginForm'>
            {renderEmailInput(onChange)}
        </div>
        )
    } else if (type === 'password') {
        return (
            <div className='loginForm'>
                {renderPasswordInput(onChange)}
            </div>
        )
    }
}

function renderButton(message) {
    return (
        <div className='loginForm'>
            <button className='m-3 btn btn-primary'>
                {message}
            </button>
        </div>
    );
}

function renderLink(message) {
    return (
        <p className='loginForm'>
            <a className='btn nav-link text-primary text-decoration-underline' href='#0'>
                {message}
            </a>
        </p>
    )
}


function LoginView() {
    useWebsiteTitle('Logowanie');
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        await login(data);
    }

    return (
        <div className="login-form-container mt-5">
            <form onSubmit={e => submitHandler(e)} className='bg-dark-subtle rounded-3 p-3'>
                <h2 className='loginForm text-primary'>Logowanie</h2>
                {renderInput('email', setEmail)}
                {renderInput('password', setPassword)}
                {renderButton('Zaloguj się')}
                {renderLink('Nie pamiętam hasła')}
                <NavLink to={'/rejestracja'} className="btn nav-link text-primary text-decoration-underline m-2">Nie masz konta? Zatejestruj się!</NavLink>
            </form>
        </div>
    );
}

export default LoginView;