import React from 'react';
import './PasswordRecovery.css';

function renderInput(type, id, text) {
    return (
    <div className='passwordRecovery'>
        <input className='passwordRecovery' type={type} id={id} placeholder={text}/>
    </div>
    );
}

function renderButton(message) {
    return (
        <div className='passwordRecovery'>
            <button className='passwordRecovery'>
                {message}
            </button>
        </div>
    );
}

function renderLink(message) {
    return (
        <p className='passwordRecovery'>
            <a className='passwordRecovery' href='#'>
                {message}
            </a>
        </p>
    )
}

function passwordRecovery() {
    return (
        <form>
            <fieldset className='passwordRecovery'>
                <h1 className='passwordRecovery'>Odzyskiwanie hasła</h1>
                {renderInput('email', 'email', 'Adres email')}
                {renderInput('password', 'password', 'Nowe hasło')}
                {renderInput('password', 'repeatedPassword', 'Powtórz hasło')}
                {renderButton('Zmień hasło')}
                {renderLink('Wróć do logowania')}
            </fieldset>
        </form>
    );
}

export default passwordRecovery;