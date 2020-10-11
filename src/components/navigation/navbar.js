import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <span>Carstagram</span>
            <input type="search" placeholder="Search"></input>
            <Link to="/join"><button>Join free</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </nav>
    );
}

export default Navbar;