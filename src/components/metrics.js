import React from 'react';
import { Dropdown } from 'semantic-ui-react'


const SelectMetric = ({toggle, onSelect}) => {
    const options = toggle.map((val, i) => ({
        key:i,
        text:val,
        value: i
    }));
    return (
        <Dropdown clearable options={options} selection onChange={onSelect} placeholder='Search by...'/>
    )
}

export default SelectMetric