import React , { useState , useEffect , useRef } from 'react';
import { db , auth } from '../Firebase';

function GroupPanel (props) {
    // for values that are being typed into "input"
    const [inputValue, setInputValue] = useState({
        group: ''
    });

    // all added groups that show on left panel will be added to the 'group' array
    const [group, setGroup] = useState([]);

    // this will store the id of the clicked Group name - will be used to change background color
    const [toHighlightID, setToHighlightID] = useState();
    
    let groupName; // clicked group name

    // Will be used when deleting a group that contains links.
    // This array will contain each link in that group.
    let linksToDelete = [];

    const userIDref = useRef();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) { // User is signed in.
                userIDref.current = user.uid;
                db.collection(userIDref.current)
                    .doc('created groups')
                    .collection('group names')
                    .get()
                    .then(doc => {
                        doc.forEach(group => {
                            setGroup(prevValue => {
                                return [
                                    ...prevValue,
                                    {
                                        'groupTitle': group.data().groupName,
                                        'id': group.id
                                    }
                                ]
                            });
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } else return;
        })
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValue(() => {
            return { [name]: value }
        });
    }

    const addGroup = () => {
        if (inputValue.group && userIDref.current) {
            db.collection(userIDref.current)
                .doc('created groups')
                .collection('group names')
                .add({
                    groupName: inputValue.group
                })
                .then((doc) => {
                    console.log("Group-name document successfully written.");
                    setGroup(prevValue => {
                        return [
                            ...prevValue,
                            {
                                'groupTitle': inputValue.group,
                                'id': doc.id
                            }
                        ]
                    });
                    setInputValue(() => {
                        return { 'group': '' }
                    });
                })
                .catch((error) => {
                    console.error("Error writing group-name document: ", error);
                });
        }
        // when user is not signed in - this will allow user to test the website without creating an account
        else if (inputValue.group && !userIDref.current) {
            setGroup(prevValue => {
                return [
                    ...prevValue,
                    inputValue.group
                ]
            });
            setInputValue(() => {
                return { 'group': '' }
            });
        }
        else return;
    }

    const handleClick = (event) => {
        groupName = event.target.textContent;
        props.showCorrectGroup(groupName);
        setToHighlightID(event.target.id);
        // only on smaller screens, close the left GroupPanel after a group name has been clicked
        if (window.innerWidth < 1150) {
            setTimeout(props.closePanel, 300);
        }
    }

    const deleteGroup = (event) => {
        const groupTitle = event.target.parentElement.textContent;
        const answer = window.confirm('Are you sure you want to delete this group?');
        if (answer) {
            const groupID = event.target.parentElement.id;
            if (userIDref.current && groupID) {
                db.collection(userIDref.current)
                    .doc('created groups')
                    .collection('group names')
                    .doc(groupID)
                    .delete()
                    .then(() => {
                        deleteGroupTitle(groupTitle, groupID);
                    })
                    .catch((error) => {
                        console.error("Error removing group: ", error);
                    });
            }
        } else return;
    }

    const deleteGroupTitle = (groupTitle, groupID) => {
        if (userIDref.current && groupTitle) {
            // collect all documents (links) from Firestore first
            db.collection(userIDref.current)
                .doc('groups')
                .collection(groupTitle)
                .get()
                .then((doc) => {
                    doc.forEach((link) => {
                        linksToDelete.push(link.id);
                    });
                    if (linksToDelete.length > 0) {
                        deleteGroupContent(groupTitle, groupID);
                    } 
                    else {
                        console.log("Document successfully deleted!");
                        setTimeout(() => {
                            setGroup(links => {
                                return links.filter(item => {
                                    return item.id !== groupID;
                                });
                            });
                        }, 500);
                    }
                })
                .catch((error) => {
                    console.error("Error removing group: ", error);
                });
        } else return;
    }

    const deleteGroupContent = (groupTitle, groupID) => {
        // loop through each document and delete it
        linksToDelete.map((link) => {
            return (
                db.collection(userIDref.current)
                .doc('groups')
                .collection(groupTitle)
                .doc(link)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted");
                })
                .catch((error) => {
                    console.error("Error removing group: ", error);
                    return;
                })
            )
        });
        setTimeout(() => {
            setGroup(links => {
                return links.filter(item => {
                    return item.id !== groupID;
                });
            });
        }, 500);
    }


    return (
        <div className="left-panel">
            <div className="group-section">
                {group.map(item => {
                    return (
                        <button key={item.id} id={item.id} onClick={handleClick}
                        className={`group-section__select-button ${toHighlightID === item.id && ' highlight'}`}>
                            {item.groupTitle}
                            <i onClick={deleteGroup} className="fas fa-minus-circle group-section__select-button__icon"></i>
                        </button>
                    );
                })}
            </div>
            <input 
                type="text"
                name="group"
                placeholder="Create group..."
                value={inputValue.group}
                onChange={handleChange}
                className="input-field__input"
            />
            <button onClick={addGroup} className="input-field__add-button">
                <i className="fas fa-plus input-field__add-button__icon"></i>
            </button>
        </div>
    );
}

export default GroupPanel;