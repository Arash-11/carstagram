import React from 'react';
import Navbar from '../navigation/navbar';
import { auth } from '../../Firebase';

function Account() {
    let displayName;

    function logOut() {
        auth.signOut().then(function() {
          // Sign-out successful.
          console.log('Sign-out successful.');
          window.location.pathname = '/';
        }).catch(function(error) {
          // An error happened.
          console.log(error.code, error.message);
        });
    }

    if (auth.currentUser !== null) {
        displayName = auth.currentUser.displayName;
    }

    function changePassword() {

    }

    function deleteAccount() {
        
    }

    return (
        <>
            <Navbar />
            <div className="edit-profile">
                <div className="profile-info">
                    <i className="fas fa-user-circle"></i>
                    <span>{displayName}</span>
                </div>
                <div className="account-options">
                    <button onClick={logOut}>Log out</button>
                    <button onClick={changePassword}>Change password</button>
                    <button onClick={deleteAccount}>Delete account</button>
                </div>
            </div>
        </>
    );
}

export default Account;