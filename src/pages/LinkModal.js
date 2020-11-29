import React , { useState } from 'react';

function LinkModal(props) {
    const [linkDetails, setLinkDetails] = useState({
        title: '',
        url: ''
    });

    const closeModal = () => {
        props.closeModal();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') closeModal();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLinkDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitData(linkDetails);
        closeModal();
    }

    return (
        <div className="overlay">
            <form className="link-modal" onSubmit={handleSubmit}>
                <span className="link-modal__close-btn" onClick={closeModal} onKeyDown={handleKeyDown} tabIndex="0">
                    <i className="fas fa-times"></i>
                </span>
                <label className="link-modal__label">Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={linkDetails.title}
                    className="link-modal__input"
                    required
                />
                <label className="link-modal__label">URL</label>
                <input
                    type="url"
                    name="url"
                    onChange={handleChange}
                    value={linkDetails.url}
                    className="link-modal__input"
                    required
                />
                <button type="submit" className="link-modal__submit-btn">Enter</button>
            </form>
        </div>
    );
}

export default LinkModal;