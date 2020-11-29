import React , { useState } from 'react';
import { auth } from '../Firebase';

function PasswordModal(props) {
    const [updatedPassword, setUpdatedPassword]  = useState({
        newPassword: '',
        confirmedNewPassword: ''
    });

    const {newPassword, confirmedNewPassword} = updatedPassword;

    const changePassword = () => {
        auth.currentUser.updatePassword(newPassword)
            .then(function() { // Update successful.
                alert("password updated successfully");
                closeModal();
            })
            .catch(function(error) { // An error happened.
                console.log(error.code, error.message);
            });
    }

    const closeModal = () => {
        props.closeModal();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') closeModal();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword === confirmedNewPassword) changePassword();
        else alert('Passwords do not match, try again.');
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUpdatedPassword(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    return (
        <div className="overlay">
            <form className="password-modal" onSubmit={handleSubmit}>
                <span className="password-modal__close-btn" onClick={closeModal} onKeyDown={handleKeyDown} tabIndex="0">
                    <i className="fas fa-times"></i>
                </span>
                <label className="password-modal__label">New password</label>
                <input 
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                    className="password-modal__input"
                    required
                />
                <label className="password-modal__label">Confirm new password</label>
                <input 
                    type="password"
                    name="confirmedNewPassword"
                    onChange={handleChange}
                    value={confirmedNewPassword}
                    className="password-modal__input"
                    required
                />
                <button type="submit" className="password-modal__submit-btn">Update</button>
            </form>
        </div>
    );
}

export default PasswordModal;