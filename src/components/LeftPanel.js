import React , { useState } from 'react';

function LeftPanel () {
    const [fieldType, setFieldType] = useState();

    const addField = () => {
        setFieldType(() => {
            return (
                <input type="text" />
            );
        });
        changeFieldType();
    }

    const changeFieldType = () => {

    }
    
    return (
        <div className="left-panel">
            <button onClick={addField}>Add</button>
            <button>Edit</button>
        </div>
    );
}

export default LeftPanel;