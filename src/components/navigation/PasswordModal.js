import React , { useState } from 'react';
import { auth } from '../../Firebase';

function PasswordModal(props) {
    const [updatedPassword, setUpdatedPassword]  = useState({
        newPassword: '',
        confirmedNewPassword: ''
    });

    const {newPassword, confirmedNewPassword} = updatedPassword;

    const changePassword = () => {
        auth.currentUser.updatePassword(newPassword)
            .then(function() {
                // Update successful.
                alert("password updated successfully");
                closeModal();
            })
            .catch(function(error) {
                // An error happened.
                console.log(error.code, error.message);
            });
    }

    const closeModal = () => {
        props.closeModal();
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
        <form className="password-modal" onSubmit={handleSubmit}>
            <span onClick={closeModal}>X</span>
            <label>New password</label>
            <input 
                type="password"
                name="newPassword"
                onChange={handleChange}
                value={newPassword}
                required
            />
            <label>Confirm new password</label>
            <input 
                type="password"
                name="confirmedNewPassword"
                onChange={handleChange}
                value={confirmedNewPassword}
                required
            />
            <button type="submit">Update</button>
        </form>
    );
}

export default PasswordModal;