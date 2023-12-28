import React from 'react'

const InputInterest = (props) => {
    const { label, handleInput, ...otherProps } = props;
  return (
    <div className='input-form-interest'>
        <input 
            {...otherProps} 
            onClick={(event) => handleInput(event)}
          />
        <label htmlFor={otherProps.id}>{label}</label>
    </div>
  )
}

export default InputInterest