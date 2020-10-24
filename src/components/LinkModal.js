import React , { useState } from 'react';

function LinkModal(props) {
    const [linkDetails, setLinkDetails] = useState({
        title: '',
        url: ''
    });

    const closeModal = () => {
        props.closeModal();
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
        alert('submitted!');
        closeModal();
    }

    return(
        <form className="link-modal" onSubmit={handleSubmit}>
            <span onClick={closeModal}>X</span>
            <label>Title</label>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                value={linkDetails.title}
                required
            />
            <label>URL</label>
            <input 
                type="url"
                name="url"
                onChange={handleChange}
                value={linkDetails.url}
                required
            />
            <button type="submit">Enter</button>
        </form>
    );
}

export default LinkModal;


// this modal should ask for three things: title, link/url, and one tag
// user should be able to select tags: article, video, or (personal) notes
// should also be able to filter content that shows on the page by selecting a tag