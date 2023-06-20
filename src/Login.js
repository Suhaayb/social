import './App.css';
import SignIn from './components/auth/SignIn';
import AuthDetails from './components/AuthDetails';

function Login() {
  return (
    <div className='App'>
      <SignIn />
      <AuthDetails />
    </div>
  );
}

export default Login;
