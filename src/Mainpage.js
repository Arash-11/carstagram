import React from 'react';
import Navbar from './components/navigation/Navbar';
import TopicPanel from './components/TopicPanel';
import TopicContent from './components/TopicContent';

function Mainpage() {

    return (
        <>
            <Navbar />
            <TopicPanel />
            <TopicContent />
        </>
    );
}

export default Mainpage;