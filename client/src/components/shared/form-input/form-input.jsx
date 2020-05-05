import React from 'react';

// Styles
import './form-input.styles.scss';

const FormInput = ({ label, handleChange, ...otherProps }) => (
    <div className='input-group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
        <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
    </div>
);

export default FormInput;
