import React , { useState } from 'react';
import GroupPanel from './GroupPanel';
import AddLinkModal from './AddLinkModal';

function TopicContent () {
    // state of the account options' display
    const [isDisplayed, setIsDisplayed] = useState(false);

    const showModal = () => {
        setIsDisplayed(true);
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
                { isDisplayed && <AddLinkModal /> }
            </div>
        </>
    );
}

export default TopicContent;