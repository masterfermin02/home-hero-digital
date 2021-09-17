const Checkbox = (props) => {
    return(
      <div className="form__group form__group--checkbox">
        <label htmlFor={props.id}>
          <input 
            type="checkbox"
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e, props.relatedFieldName)}
            checked={props.checked}
            className="css-checkbox"
          />
          <span>{props.label}</span>
        </label>
        {props.error && <div className="form__error">{props.error}</div>}
      </div>
    );
  }
  export default Checkbox;
