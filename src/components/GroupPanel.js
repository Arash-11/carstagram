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
                    .then(group => {
                        group.forEach(doc => {
                            setGroup(prevValue => {
                                return [
                                    ...prevValue,
                                    doc.data().groupName
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
                .then(() => {
                    console.log("Group-name document successfully written.")
                })
                .catch((error) => {
                    console.error("Error writing group-name document: ", error);
                });

            db.collection(userID)
                .doc('groups')
                .collection(inputValue.group)
                .add({})
                .then(() => {
                    console.log("Document successfully written!");
                    setGroup(prevValue => {
                        return [
                            ...prevValue,
                            inputValue.group
                        ]
                    });
                    setInputValue(() => {
                        return { 'group': '' }
                    });
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
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

    const selectGroup = (event) => {
        groupName = event.target.textContent;
        props.selectGroup(groupName);
    }

    return (
        <div className="left-panel">
            {group.map(item => {
                return (
                    <button key={group.indexOf(item)} onClick={selectGroup} 
                    className="left-panel__select-button">
                        {item}
                        <i class="fas fa-minus-circle"></i>
                    </button>
                );
            })}
            <input 
                type="text"
                name="group"
                placeholder="Create group..."
                value={inputValue.group}
                onChange={handleChange}
                className="left-panel__input"
            />
            <button onClick={addGroup} className="left-panel__add-button">
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
}

export default GroupPanel;