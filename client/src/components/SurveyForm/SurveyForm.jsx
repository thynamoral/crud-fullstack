import axios from 'axios';
// input's attributes
import { inputs, genders, interests } from 'src/utility/inputsAttribute';
// components
import Input from 'components/Input/Input';
import InputGender from 'components/InputGender/InputGender';
import InputInterest from 'components/InputInterest/InputInterest';

const BASE_URL = `http://localhost:8000`;

const SurveyForm = (props) => {
  const { formData, resetInputValue, handleInput, setIsSubmitted } = props;
  // handle form submit
  const handleSumbit = async (event) => {
    event.preventDefault();
    const interestLength = formData.interest.length;
    const newFormData = { ...formData };

    // handle formData.interest array
    if (interestLength === 0) {
      newFormData.interest = "";
    }
    else {
      newFormData.interest = "";
      formData.interest.forEach(value => {
        newFormData.interest += `${value}, `;
      })
    }

    try {
      const response = await axios.post(`${BASE_URL}/users`, newFormData);
      console.log(await response.data);
      resetInputValue();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  
  return (
  <form onSubmit={handleSumbit}>
    {/* inputs := firstname, lastname, age */}
    {inputs .map((inputForm,index) => (
      <Input 
        key={index} 
        {...inputForm}
        value={formData[inputForm.name]}
        handleInput={handleInput}
      />
    ))}

    {/* inputs := gender */}
    <div className="input-form">
      <label>Gender</label>
      <div className="input-form-gender" id='gender'>
        {genders.map((gender, index) => (
          <InputGender
            key={index}
            inputGender={gender}
            handleInput={handleInput}
          />
        ))}
      </div>
    </div>
    
    {/* inputs := interest */}
      <div className="input-form" id='interest'>
        <label>Interests</label>
        <div className="input-form-interest">
          {interests.map((interest, index) => (
          <InputInterest 
            key={index} 
            {...interest} 
            handleInput={handleInput}
          />
          ))}
        </div>
    </div>
    <button type='submit'>Submit</button>
  </form>
  )
}

export default SurveyForm