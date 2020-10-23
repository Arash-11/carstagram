import React , { useState } from 'react';

function AddLinkModal() {
    // state of the "add link" modal's display - to check if it's open or closed
    const [isOpen, setIsOpen] = useState(false);

    return(
        <h1>This is the add link modal</h1>
    );
}

export default AddLinkModal;


// this modal should ask for three things: title, link/url, and one tag
// title length should be no longer than 50 words, etc. - there should be a limit
// user should be able to select tags: article, video, or (personal) notes
// should also be able to filter content that shows on the page by selecting a tag