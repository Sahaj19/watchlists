import { Modal } from 'antd';

interface ConfirmationDialogProps {
  title: string;
  content: string;
  open: boolean;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationDialog({
  title,
  content,
  open,
  loading = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      confirmLoading={loading}
      okButtonProps={{
        danger,
      }}
      destroyOnHidden
    >
      {content}
    </Modal>
  );
}

export default ConfirmationDialog;