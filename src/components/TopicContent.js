import React , { useState , useEffect } from 'react';
import GroupPanel from './GroupPanel';
import LinkModal from './LinkModal';
import { db , auth } from '../Firebase';

function TopicContent () {
    // to determine currently selected group
    const [currentGroup, setCurrentGroup] = useState('');

    // will store main data for selected group
    const [groupContent, setGroupContent] = useState([]);

    // to determine if modal to add link/URL is open or closed
    const [isDisplayed, setIsDisplayed] = useState(false);

    let userID;
    auth.onAuthStateChanged((user) => {
        if (user) userID = user.uid; // User is signed in.
        else return;
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.collection(userID)
                    .doc('groups')
                    .collection(currentGroup)
                    .get()
                    .then(doc => {
                        doc.forEach(link => {
                            setGroupContent(prevValue => {
                                return [
                                    ...prevValue,
                                    {
                                        'title': link.data().title,
                                        'url': link.data().url
                                    }
                                ]
                            });
                        });
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            }
            else return;
        });
    }, [currentGroup, userID]);

    const showGroupContent = (groupName) => {
        setCurrentGroup(groupName);
    }

    const showModal = () => {
        setIsDisplayed(!isDisplayed);
    }

    const addToDatabase = (linkDetails) => {
        if (userID) {
            alert('adding data..');
            db.collection(userID)
                .doc('groups')
                .collection(currentGroup)
                .add({
                    title: linkDetails.title,
                    url: linkDetails.url
                })
                .then(() => {
                    alert('data added');
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
        else {
            alert('cannot add to database');
        }
    }

    return (
        <>
            <GroupPanel selectGroup={showGroupContent} />
            { isDisplayed && <LinkModal submitData={addToDatabase} closeModal={showModal} /> }
            <div className="main-content">
                <button onClick={showModal} className="group-add-button">
                    <i className="fas fa-plus"></i>
                </button>
                {groupContent.map((link) => {
                    return (
                        <div key={groupContent.indexOf(link)} className="link-content">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default TopicContent;