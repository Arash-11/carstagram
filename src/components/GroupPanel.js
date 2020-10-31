import React , { useState , useEffect } from 'react';
import { db , auth } from '../Firebase';

function GroupPanel (props) {
    // for values that are being typed into "input"
    const [inputValue, setInputValue] = useState({
        group: ''
    });

    // all added groups that show on left panel will be added to the 'group' array
    const [group, setGroup] = useState([]);

    let groupName; // clicked group name

    let userID;
    auth.onAuthStateChanged((user) => {
        if (user) userID = user.uid; // User is signed in.
        else return;
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) { // User is signed in.
                db.collection(userID)
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
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } 
            else return;
        })
    }, [userID]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValue(prevValue => {
            return { [name]: value }
        });
    }

    const addGroup = () => {
        if (inputValue.group && userID) {
            db.collection(userID)
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
        else if (inputValue.group && !userID) {
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

    const showCorrectGroup = (event) => {
        groupName = event.target.textContent;
        props.showCorrectGroup(groupName);
        // only on smaller screens, close the left GroupPanel after a group has been selected
        if (window.innerWidth < 800) {
            setTimeout(props.closePanel, 300);
        }
    }

    const deleteGroup = () => {
        alert(`${groupName} deleted`);
    }

    return (
        <div className="left-panel">
            <div className="group-section">
                {group.map(item => {
                    return (
                        <button key={item.id} onClick={showCorrectGroup} 
                        className="group-section__select-button">
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