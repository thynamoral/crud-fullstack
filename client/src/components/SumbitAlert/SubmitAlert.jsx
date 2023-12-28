import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function SubmitAlert(props) {
  const { show, setShow } = props;
  const styles = {
    maxWidth: '340px',
    width: '100%',
    zIndex: '1',
    position: 'absolute',
    top: '1rem'
  }
  return (
    <>
      <Alert show={show} variant="success" style={styles}>
        <Alert.Heading>Survey Form</Alert.Heading>
        <p>
          Your response has been recorded!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default SubmitAlert;