import React , { useState , useEffect } from 'react';
import { db , auth } from '../Firebase';

function GroupPanel (props) {
    // for values that are being typed into "input"
    const [inputValue, setInputValue] = useState({
        group: ''
    });

    // all added groups that show on left panel will be added to the 'group' array
    const [group, setGroup] = useState([]);

    let contentName;

    let userID;
    auth.onAuthStateChanged((user) => {
        if (user) userID = user.uid; // User is signed in.
        else return;
    });

    useEffect(() => {
            if (userID) { // User is signed in.
                db.collection('users')
                    .doc(userID)
                    .collection('groups')
                    .get()
                    .then(group => {
                        group.forEach(doc => {
                            setGroup(prevValue => {
                                return [
                                    ...prevValue, 
                                    {'id': doc.id, ...doc.data()}
                                ]
                            });
                        });
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } 
            else return;
    }, [userID]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValue(prevValue => {
            return { [name]: value }
        });
    }

    const addGroup = () => {
        if (inputValue.group === '') return;
        else {
            db.collection('users')
                .doc(userID)
                .collection(inputValue.group)
                .add({
                    something: ''
                })
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
    }

    const changeContent = (event) => {
        contentName = event.target.textContent;
        props.changeContent(contentName);
    }

    return (
        <div className="left-panel">
            <input 
                type="text"
                name="group"
                placeholder="Create group.."
                value={inputValue.group}
                onChange={handleChange}
            />
            <button onClick={addGroup} className="left-panel-add-button"><i className="fas fa-plus"></i></button>
            {group.map(item => {
                return (
                    <button key={group.indexOf(item)} onClick={changeContent} className="group-button">
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export default GroupPanel;