import { useState, lazy, Suspense } from 'react'
// hook
import useFetch from 'src/hooks/useFetch';
// component
import SurveyForm from 'components/SurveyForm/SurveyForm';
const SubmitAlert = lazy(() => import('components/SumbitAlert/SubmitAlert'));
// css file
import 'src/App.css'

function App() {
  const { data: users } = useFetch();
  // console.log(users.data);
  // states to keep track of each input's data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    interest: []
  });

  // state to keep track onSubmit form
  const [isSubmitted, setIsSubmitted] = useState(false);

  // update formData state
  const updateFormData = (event) => {
    const { name, value, type, checked } = event.target;
    // handle checkboxes
    if (type === 'checkbox') {
      const updatedInterest = checked
        ? [...formData.interest, value]
        : formData.interest.filter(interest => interest != value)
      
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name] : updatedInterest
        }
      })
    }
    else {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: value
        }
      });
    }
  }

  const resetInputValue = () => {
    setFormData({
      firstname: "",
      lastname: "",
      age: "",
      gender: "",
      interest: []
    });
  }

  return (
    <div className="app">
      {isSubmitted && (
        <Suspense fallback={''}>
          <SubmitAlert show={isSubmitted} setShow={setIsSubmitted} />
        </Suspense>
      )}
      <SurveyForm
        formData={formData}
        resetInputValue={resetInputValue}
        handleInput={updateFormData}
        setIsSubmitted={setIsSubmitted}
      />
    </div>
  );
}

export default App
