const InputGender = (props) => {
    const { inputGender, handleInput, formData } = props;
  return (
    <div>
      <input 
          {...inputGender}
          onChange={(event) => handleInput(event)} 
          checked={formData.gender == inputGender.value ? true : false}
      />
        <label htmlFor={inputGender.id}>{inputGender.value}</label>
    </div>
  )
}

export default InputGender