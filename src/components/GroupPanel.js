import React , { useState } from 'react';

function GroupPanel (props) {
    // for values that are being typed into "input"
    const [inputValue, setInputValue] = useState({
        group: ''
    });

    // all added groups that show on left panel will be added to the 'group' array
    const [group, setGroup] = useState([]);

    let contentName;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValue(prevValue => {
            return { [name]: value }
        });
    }

    const addGroup = () => {
        if (inputValue.group === '') return;
        else {
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