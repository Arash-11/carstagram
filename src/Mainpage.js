import React from 'react';
import Navbar from './components/navigation/Navbar';
import GroupPanel from './components/GroupPanel';
import TopicContent from './components/TopicContent';

function Mainpage() {
    return (
        <>
            <Navbar />
            <GroupPanel />
            <TopicContent />
        </>
    );
}

export default Mainpage;