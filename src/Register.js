import './App.css';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';

function Register() {
  return (
    <div className='App'>
      <SignUp />
      <AuthDetails />
    </div>
  );
}

export default Register;
