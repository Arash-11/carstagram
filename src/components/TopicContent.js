import React , { useState , useEffect } from 'react';
import Navbar from './Navbar';
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
                                        'url': link.data().url,
                                        'id': link.id
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

        // cleanup function
        const removePreviousContent = () => {
            setGroupContent([]);
        }
        return removePreviousContent();

    }, [userID, currentGroup]);


    const showGroupContent = (groupName) => {
        setCurrentGroup(groupName);
    }

    const toggleModalDisplay = () => {
        setIsDisplayed(!isDisplayed);
    }

    const submitLinkDetails = (linkDetails) => {
        if (userID) {
            db.collection(userID)
                .doc('groups')
                .collection(currentGroup)
                .add({
                    title: linkDetails.title,
                    url: linkDetails.url
                })
                .then((doc) => {
                    console.log('Data has been successfully added to database!');
                    setGroupContent((prevValue) => {
                        return [
                            ...prevValue,
                            {
                                'title': linkDetails.title,
                                'url': linkDetails.url,
                                'id': doc.id
                            }
                        ]
                    });
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }

    const deleteLink = (e) => {
        const answer = window.confirm('Are you sure you want to delete this?');
        if (answer) {
            const linkID = e.currentTarget.id;
            db.collection(userID)
                .doc('groups')
                .collection(currentGroup)
                .doc(linkID)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    setTimeout(() => {
                        setGroupContent(links => {
                            return links.filter(item => {
                                return item.id !== linkID;
                            });
                        });
                    }, 500);
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
        else return;
    }


    return (
        <>
            <Navbar showGroupContent={showGroupContent} />
            { isDisplayed && <LinkModal submitData={submitLinkDetails} closeModal={toggleModalDisplay} /> }
            <div className="topic-content">

                {groupContent.map((link) => {
                        return (
                        <div key={link.id} className="topic-content__link">
                            <span onClick={deleteLink} id={link.id} className="topic-content__link__close-btn">
                                <i className="fas fa-times topic-content__link__close-btn__icon"></i>
                            </span>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                        </div>
                        );
                    })}

                <button onClick={toggleModalDisplay} className="topic-content__add-button">
                    <i className="fas fa-plus topic-content__add-button__icon"></i>
                </button>
            </div>
        </>
    );
}

export default TopicContent;