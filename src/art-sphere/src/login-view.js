import React from 'react';
import ReactDOM from 'react-dom/client';
import './login-view.css';

class LoginForm extends React.Component {
    renderEmailInput() {
        return (
            <input className='loginForm' type='email' id='email' placeholder='Adres email'>
            </input>
        );
    }

    renderPasswordInput() {
        return (
            <input className='loginForm' type='password' id='password' placeholder='Hasło'>
            </input>
        );
    }

    renderInput(type) {
        if (type === 'email'){
            return (
            <div className='loginForm'>
                {this.renderEmailInput()}
            </div>
            )
         } else if (type === 'password') {
            return (
                <div className='loginForm'>
                    {this.renderPasswordInput()}
                </div>
            )
         }
    }

    renderButton(message) {
        return (
            <div className='loginForm'>
                <button className='loginForm'>
                    {message}
                </button>
            </div>
        );
    }

    renderLink(message) {
        return (
            <p className='loginForm'>
                <a className='loginForm' href='#'>
                    {message}
                </a>
            </p>
        )
    }

    render() {
        return (
            <form>
                <fieldset className='loginForm'>
                    <h1 className='loginForm'>Logowanie</h1>
                    {this.renderInput('email')}
                    {this.renderInput('password')}
                    {this.renderButton('Zaloguj się')}
                    {this.renderLink('Nie pamiętam hasła')}
                </fieldset>
            </form>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LoginForm />);