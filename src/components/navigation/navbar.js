import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) setIsLoggedIn(true); // User is signed in.
            else setIsLoggedIn(false); // User is signed out.
        });
    }, [isLoggedIn]);

    return (
        <nav>
            <span>Carstagram</span>
            <input type="search" placeholder="Search"></input>
            {isLoggedIn
                ? 
                <>
                    <Link to="/account"><button>Account</button></Link>
                    <button>Upload</button>
                </>
                :
                <>
                    <Link to="/join"><button>Join free</button></Link>
                    <Link to="/login"><button>Login</button></Link>
                </>
            }
        </nav>
    );
}

export default Navbar;