
const Input = (props) => {
    const {value, handleInput, label, ...otherProps } = props;
  return (
    <div className="input-form">
          <label htmlFor={otherProps.id}>{label}</label>
          <input
              {...otherProps}
              value={value}
              onChange={(event) => handleInput(event)}
          />
    </div>
  )
}

export default Input