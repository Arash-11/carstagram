import React , { useState } from 'react';
import TopicPanel from './TopicPanel';

function TopicContent () {

    // const [heading, setHeading] = useState('');

    let heading;

    function decider() {
        if (heading) {
            // setHeading('This will be Javascript content');
            heading = 'This will be Javascript content';
        } else {
            // setHeading('This will be something else');
            heading = 'This will be something else';
        }
    }

    return (
        <>
            <TopicPanel contentName={heading} />
            <div className="main-content">
                <h1>{heading}</h1>
            </div>
        </>
    );
}

export default TopicContent;