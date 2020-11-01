import React , { useState } from 'react';
import { auth } from '../Firebase';
import PasswordModal from './PasswordModal';

function OptionsDropdown() {
    // state of the "change password" modal's display - to check if it's open or closed
    const [isOpen, setIsOpen] = useState(false);

    const logOut = () => {
        auth.signOut()
            .then(function() {
                console.log('Sign-out successful.');
                window.location.pathname = '/login';
            })
            .catch(function(error) {
                console.log(error.code, error.message);
            });
    }

    const controlModalDisplay = () => {
        setIsOpen(!isOpen);
    }

    const deleteAccount = () => {
        const shouldDelete = prompt('Type in "delete" to erase your account', '');
        if (shouldDelete === 'delete') {
            auth.currentUser.delete()
                .then(function() {
                    window.location.pathname = '/signup';
                }).catch(function(error) {
                    alert('Your account could not be deleted, please try again.');
                });
        } else return;
    }

    return (
        <>
            { isOpen && <PasswordModal closeModal={controlModalDisplay} /> }
            <div className="options-modal">
                <button onClick={logOut} className="options-modal__btn">Log out</button>
                <button onClick={controlModalDisplay} className="options-modal__btn">Change password</button>
                <button onClick={deleteAccount} className="options-modal__btn">Delete account</button>
            </div>
        </>
    );
}

export default OptionsDropdown;