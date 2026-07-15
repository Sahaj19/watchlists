import { Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface AuthenticationRequiredModalProps {
  open: boolean;
  onCancel: () => void;
}

function AuthenticationRequiredModal({ open, onCancel }: AuthenticationRequiredModalProps) {
  const navigate = useNavigate();

  function handleLogin() {
    onCancel();
    navigate('/login');
  }

  return (
    <Modal
      open={open}
      title="Login Required"
      onCancel={onCancel}
      onOk={handleLogin}
      okText="Login"
      cancelText="Go Back"
      centered
    >
      <Text>You need to login to create, view and manage your personal watchlist.</Text>
    </Modal>
  );
}

export default AuthenticationRequiredModal;