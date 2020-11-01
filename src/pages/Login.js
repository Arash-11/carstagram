import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';

function Login() {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    });

    const {username, password} = loginDetails;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        logintoAccount();
    }

    const logintoAccount = () => {
        // a "hack" to allow user to just create an account with username but,
        // ensuring Firebase actually creates the account by turning it into an email
        const email = `${username}@organizr.com`;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Sign in successful!');
                window.location.pathname = '/';
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Incorrect password');
                }
                else alert('Something went wrong. Try again.')
            });
    }

    return (
        <form className="login-signup-form" onSubmit={handleSubmit}>
            <h1 className="login-signup-form__title">Organizr</h1>
            <label className="login-signup-form__label">Username</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className="login-signup-form__input"
                required>
            </input>
            <label className="login-signup-form__label">Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="login-signup-form__input"
                required>
            </input>
            <button type="submit" className="login-signup-form__btn">Login</button>
            <p className="login-signup-form__text">
                Don't have an account?
                <Link to="/signup" className="login-signup-form__text_link"> Sign up</Link>
            </p>
        </form>
    );
}

export default Login;