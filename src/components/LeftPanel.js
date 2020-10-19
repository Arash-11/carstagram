import React , { useState } from 'react';

function LeftPanel () {
    // for values that are being typed into "input"
    const [inputValue, setInputValue] = useState({
        topic: ''
    });

    // all added topics that show on left panel will be added to the 'topic' array
    const [topic, setTopic] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValue(prevValue => {
            return { [name]: value }
        });
    }

    const addTopic = () => {
        setTopic(prevValue => {
            return [
                ...prevValue,
                inputValue.topic
            ]
        });
        setInputValue(() => {
            return { 'topic': '' }
        });
    }

    return (
        <div className="left-panel">
            <input 
                type="text"
                name="topic"
                placeholder="Add topic.."
                value={inputValue.topic}
                onChange={handleChange}
            />
            <button onClick={addTopic}><i className="fas fa-plus"></i></button>
            {topic.map(item => {
                return (
                    <React.Fragment key={topic.indexOf(item)}>
                        <p>{item}</p>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default LeftPanel;