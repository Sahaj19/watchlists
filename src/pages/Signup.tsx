import usePageTitle from '../hooks/usePageTitle';
import AuthForm from '../components/auth/AuthForm';

function Signup() {
  usePageTitle('Watchlists | Signup');
  return <AuthForm mode="signup" />;
}

export default Signup;