import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';
import OptionsDropdown from './OptionsDropdown';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState();

    // state of the account options' display
    const [isDisplayed, setIsDisplayed] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) setIsLoggedIn(true); // User is signed in.
            else setIsLoggedIn(false); // User is signed out.
        });
    }, [isLoggedIn]);

    const showOptions = () => {
        setIsDisplayed(!isDisplayed);
    }

    return (
        <nav className="nav">
            <span className="nav__title">Organizr</span>
            {isLoggedIn
                ? 
                <>
                    { isDisplayed && <OptionsDropdown /> }
                    <i className="fas fa-user-circle fa-2x nav__account-icon" onClick={showOptions}></i>
                </>
                :
                <>
                    <Link to="/signup"><button className="nav__signup-btn">Sign Up</button></Link>
                    <Link to="/login"><button className="nav__login-btn">Login</button></Link>
                </>
            }
        </nav>
    );
}

export default Navbar;