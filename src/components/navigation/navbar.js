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
        <nav>
            <span>Organizr</span>
            <input type="search" placeholder="Search"></input>
            {isLoggedIn
                ? 
                <>
                    { isDisplayed && <OptionsDropdown /> }
                    <i className="fas fa-user-circle fa-2x account_icon" onClick={showOptions}></i>
                </>
                :
                <>
                    <Link to="/signup"><button className="signup_button">Sign Up</button></Link>
                    <Link to="/login"><button className="login_button">Login</button></Link>
                </>
            }
        </nav>
    );
}

export default Navbar;