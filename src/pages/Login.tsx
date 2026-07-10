import usePageTitle from '../hooks/usePageTitle';
import AuthForm from '../components/auth/AuthForm';

function Login() {
  usePageTitle('Watchlists | Login');
  return <AuthForm mode="login" />;
}

export default Login;