import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';

function SignUp() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        confirmedPassword: ''
    });

    const {username, password, confirmedPassword} = userDetails;

    function handleChange(event) {
        const {name, value} = event.target;
        setUserDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (password === confirmedPassword) createUser();
        else alert('Passwords do not match, try again.');
    }

    function createUser() {
        // a "hack" to allow user to just create an account with username, but at the same time,
        // ensuring Firebase creates an account
        const email = `${username}@organizr.com`;
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => window.location.pathname = '/')
            .catch(error => {
                console.log(error.code, error.message);
                alert('something went wrong');
            });
    }

    return (
        <form className="login-join-form" onSubmit={handleSubmit}>
            <h1>Organizr</h1>
            <label>Create Username</label>
            <input
                type="text"
                name="username"
                onChange={handleChange}
                value={username}
                placeholder=""
                required>
            </input>
            <label>Create Password</label>
            <input 
                type="password" 
                name="password"
                onChange={handleChange} 
                value={password}
                required>
            </input>
            <label>Confirm Password</label>
            <input 
                type="password" 
                name="confirmedPassword"
                onChange={handleChange} 
                value={confirmedPassword}
                required>
            </input>
            <button type="submit">Sign up</button>
            <p>
                Have an account?
                <Link to="/login" className="navlink">Login</Link>
            </p>
        </form>
    );
}

export default SignUp;