import React , { useState } from 'react';
import { db , auth } from '../Firebase';

function LinkModal(props) {
    // to determine current group
    // const [currentGroupName, setCurrentGroupName] = useState('');

    // let userID;
    // auth.onAuthStateChanged((user) => {
    //     if (user) userID = user.uid; // User is signed in.
    //     else return;
    // });

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
        props.submitData(linkDetails);
        closeModal();
    }

    // const addToDatabase = () => {
    //     if (currentGroupName) {
    //         alert('adding data..');
    //         db.collection(userID)
    //             .doc('groups')
    //             .collection(currentGroupName)
    //             .add({
    //                 title: linkDetails.title,
    //                 url: linkDetails.url
    //             })
    //             .then(() => {
    //                 alert('data added');
    //             })
    //             .catch((error) => {
    //                 console.error("Error writing document: ", error);
    //             });
    //     }
    //     else {
    //         alert('cannot add to database');
    //     }
    // }

    return (
        <>
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
        </>
    );
}

export default LinkModal;


// this modal should ask for three things: title, link/url, and one tag
// user should be able to select tags: article, video, or (personal) notes
// should also be able to filter content that shows on the page by selecting a tag