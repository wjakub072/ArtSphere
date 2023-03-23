import React from 'react';
import './LoginForm.css';

function renderEmailInput() {
    return (
        <input className='loginForm' type='email' id='email' placeholder='Adres email'>
        </input>
    );
}

function renderPasswordInput() {
return (
    <input className='loginForm' type='password' id='password' placeholder='Hasło'>
     </input>
    );
}

function renderInput(type) {
    if (type === 'email'){
        return (
        <div className='loginForm'>
            {renderEmailInput()}
        </div>
        )
    } else if (type === 'password') {
        return (
            <div className='loginForm'>
                {renderPasswordInput()}
            </div>
        )
    }
}

function renderButton(message) {
    return (
        <div className='loginForm'>
            <button className='loginForm'>
                {message}
            </button>
        </div>
    );
}

function renderLink(message) {
    return (
        <p className='loginForm'>
            <a className='loginForm' href='#'>
                {message}
            </a>
        </p>
    )
}

function LoginForm() {
    return (
        <form>
            <fieldset className='loginForm'>
                <h1 className='loginForm'>Logowanie</h1>
                {renderInput('email')}
                {renderInput('password')}
                {renderButton('Zaloguj się')}
                {renderLink('Nie pamiętam hasła')}
            </fieldset>
        </form>
    );
}

export default LoginForm;