import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';

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
                alert('Sign in successful!');
                window.location.pathname = '/';
            })
            .catch(error => {
                console.log(error.code, error.message);
                alert('something went wrong');
            });
    }

    return (
        <form className="login-join-form" onSubmit={handleSubmit}>
            <h1>Organizr</h1>
            <label>Username</label>
            <input 
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required>
            </input>
            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required>
            </input>
            <button type="submit">Login</button>
            <p>
                Don't have an account?
                <Link to="/signup" className="navlink">Sign up</Link>
            </p>
        </form>
    );
}

export default Login;