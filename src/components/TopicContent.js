import React , { useState } from 'react';
import TopicPanel from './TopicPanel';

function TopicContent () {
    // for group
    const [groupValue, setGroupValue] = useState({
        group: ''
    });

    // for URLs
    const [urlValue, setUrlValue] = useState({
        url: ''
    });

    const [group, setGroup] = useState([]);

    const [URL, setURL] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'group') {
            setGroupValue(() => {
                return { [name]: value }
            });
        } else {
            setUrlValue(() => {
                return { [name]: value }
            });
        }
    }

    const createGroup = () => {
        setGroup(prevValue => {
            return [
                ...prevValue,
                groupValue.group
            ];
        });
        setGroupValue(() => {
            return { group: '' }
        });   
    }

    const addURL = () => {
        setURL(prevValue => {
            return [
                ...prevValue,
                urlValue.url
            ];
        });
        setUrlValue(() => {
            return { url: '' }
        }); 
    }

    function decider(contentName) {
        if (contentName === 'javascript') {
            let heading1 = 'This will be Javascript content';
        } else {
            let heading1 = 'This will be something else';
        }
    }


    return (
        <>
            <TopicPanel changeContent={decider} />
            <div className="main-content">
                <input 
                    type="text"
                    name="group"
                    placeholder="Create group.."
                    value={groupValue.group}
                    onChange={handleChange}
                />
                <button onClick={createGroup} className="group-add-button">
                    <i className="fas fa-plus"></i>
                </button>
                <br />

                {group.map(title => {
                    return (
                        <details className="group-details">
                            <summary>{title}</summary>
                            <input 
                                type="text"
                                name="url"
                                placeholder="Add website.."
                                value={urlValue.url}
                                onChange={handleChange}
                            />
                            <button onClick={addURL} className="add-button">
                                <i className="fas fa-plus"></i>
                            </button>
                            {URL.map(link => {
                                return (
                                    <h3>{link}</h3>
                                );
                            })}
                        </details>
                    );
                })}

            </div>
        </>
    );
}

export default TopicContent;