import React from 'react';

const Input = (props) => {
  return(
    <div className="form__group flex-1">
        <label 
            htmlFor={props.id} >{props.label}</label>
        <input 
            type={props.type || 'text'} 
            name={props.name} 
            id={props.id} 
            autoComplete={props.autoComplete || "off"}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.error ? 'error' : ''}
        />
    </div>
  );
}
export default Input;
