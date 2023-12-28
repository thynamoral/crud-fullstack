const InputGender = (props) => {
    const { inputGender, handleInput } = props;
  return (
    <div>
      <input 
          {...inputGender}
          onChange={(event) => handleInput(event)} 
      />
        <label htmlFor={inputGender.id}>{inputGender.value}</label>
    </div>
  )
}

export default InputGender