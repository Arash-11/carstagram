import React , { useState } from 'react';
import Navbar from '../navigation/navbar';
import PasswordModal from './PasswordModal';
import { auth } from '../../Firebase';

function Account() {
    // state of the "change password" modal's display - to check if it's open or closed
    const [isOpen, setIsOpen] = useState(false);

    function logOut() {
        auth.signOut()
            .then(function() {
                // Sign-out successful.
                console.log('Sign-out successful.');
                window.location.pathname = '/';
            })
            .catch(function(error) {
                // An error happened.
                console.log(error.code, error.message);
            });
    }

    function controlModalDisplay() {
        setIsOpen(!isOpen);
    }

    function deleteAccount() {
        const shouldDelete = prompt('Type in "delete" to erase your account', '');
        if (shouldDelete === 'delete') {
            auth.currentUser.delete()
                .then(function() {
                    // User deleted.
                    window.location.pathname = '/signup';
                }).catch(function(error) {
                    // An error happened.
                    alert('Your account could not be deleted, please try again.');
                });
        }
        else return;
    }

    return (
        <>
            <Navbar />
            { isOpen && <PasswordModal closeModal={controlModalDisplay} /> }
            <div className="edit-profile">
                <div className="profile-info">
                    <i className="fas fa-user-circle"></i>
                    <span>Naruto</span>
                </div>
                <div className="account-options">
                    <button onClick={logOut}>Log out</button>
                    <button onClick={controlModalDisplay}>Change password</button>
                    <button onClick={deleteAccount}>Delete account</button>
                </div>
            </div>
        </>
    );
}

export default Account;