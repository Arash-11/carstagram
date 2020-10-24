import React , { useState } from 'react';
import GroupPanel from './GroupPanel';
import LinkModal from './LinkModal';

function TopicContent () {
    // to determine if modal to add content/link/URL is open or closed
    const [isDisplayed, setIsDisplayed] = useState(false);

    const showModal = () => {
        setIsDisplayed(!isDisplayed);
    }

    function decider(contentName) {
        if (contentName === 'javascript') {
            let heading1 = 'This will be Javascript content';
        } else {
            let heading1 = 'This will be something else';
        }
    }


    return (
        <>
            <GroupPanel changeContent={decider} />
            <div className="main-content">
                <button onClick={showModal} className="group-add-button">
                    <i className="fas fa-plus"></i>
                </button>
                { isDisplayed && <LinkModal closeModal={showModal} /> }
            </div>
        </>
    );
}

export default TopicContent;


// consider using useEffect to sync data between leftpanel and main content on the right