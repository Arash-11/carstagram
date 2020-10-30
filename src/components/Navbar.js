import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import GroupPanel from './GroupPanel';
import OptionsDropdown from './OptionsDropdown';

function Navbar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState();

    // state of the account options' display
    const [isDisplayed, setIsDisplayed] = useState(false);

    // should show GroupPanel or not
    const [panelDisplay, setPanelDisplay] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) setIsLoggedIn(true); // User is signed in.
            else setIsLoggedIn(false); // User is signed out.
        });
    }, [isLoggedIn]);

    const togglePanelDisplay = () => {
        setPanelDisplay(!panelDisplay);
    }

    const showOptions = () => {
        setIsDisplayed(!isDisplayed);
    }

    const selectGroup = (groupName) => {
        props.showGroupContent(groupName);
    }

    return (
        <>
            <nav className="nav">
                <i onClick={togglePanelDisplay} className="fas fa-bars nav__menu-icon"></i>
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
            {panelDisplay && <GroupPanel identifyGroup={selectGroup} />}
        </>
    );
}

export default Navbar;