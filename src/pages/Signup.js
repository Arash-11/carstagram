import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';

function SignUp() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        confirmedPassword: ''
    });

    const {username, password, confirmedPassword} = userDetails;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === confirmedPassword) createUser();
        else alert('Passwords do not match, try again.');
    }

    const createUser = () => {
        // a "hack" to allow user to just create an account with username, but at the same time,
        // ensuring Firebase creates an account
        const email = `${username}@organizr.com`;
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => window.location.pathname = '/')
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('This username is already in use.');
                }
                else alert('An error occurred. Try again');
            });
    }

    return (
        <form className="login-signup-form" onSubmit={handleSubmit}>
            <h1 className="login-signup-form__title">Organizr</h1>
            <label className="login-signup-form__label">Create Username</label>
            <input
                type="text"
                name="username"
                onChange={handleChange}
                value={username}
                className="login-signup-form__input"
                required>
            </input>
            <label className="login-signup-form__label">Create Password (min. of 6 characters)</label>
            <input 
                type="password" 
                name="password"
                // placeholder="minimum of 6 characters"
                onChange={handleChange} 
                value={password}
                className="login-signup-form__input"
                required>
            </input>
            <label className="login-signup-form__label">Confirm Password</label>
            <input 
                type="password" 
                name="confirmedPassword"
                onChange={handleChange} 
                value={confirmedPassword}
                className="login-signup-form__input"
                required>
            </input>
            <button type="submit" className="login-signup-form__btn">Sign up</button>
            <p className="login-signup-form__text">
                Have an account?
                <Link to="/login" className="login-signup-form__text_link"> Login</Link>
            </p>
        </form>
    );
}

export default SignUp;