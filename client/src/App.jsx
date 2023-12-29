import { useState, lazy, Suspense } from 'react'
// hook
import useFetch from 'src/hooks/useFetch';
// component
import Navbar from 'components/Navbar/Navbar';
import SurveyForm from 'components/SurveyForm/SurveyForm';
const SubmitAlert = lazy(() => import('components/SumbitAlert/SubmitAlert'));
const UserManagement = lazy(() => import('components/UserManagement/UserManagement'));
// css file
import 'src/App.css'

function App() {
  // fetch users from API
  const { data: users } = useFetch();

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

  // state to switch page
  const [isFormPage, setIsFormPage] = useState(true);

  // state to keep track if the form is editting
  const [isEditing, setIsEditinng] = useState(false);

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
      <Navbar 
        isFormPage={isFormPage} 
        setIsFormPage={setIsFormPage} 
        editing={setIsEditinng}
      />
      {isFormPage
        ? <>
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
              isEditing={isEditing}
            />
          </>
        : <Suspense fallback={<p>Loading...</p>}>
            <UserManagement 
              users={users.data} 
              setFormData={setFormData}
              setIsFormPage={setIsFormPage} 
              editing={setIsEditinng}
            />
          </Suspense>
      } 
    </div>
  );
}

export default App
