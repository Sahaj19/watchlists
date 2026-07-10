import { notification } from 'antd';
import { NOTIFICATION_DURATION } from '../utils/constants';

const DURATION = NOTIFICATION_DURATION;

export const notificationService = {
  success(title: string, description?: string) {
    notification.success({
      message: title,
      description,
      placement: 'topRight',
      duration: DURATION,
    });
  },

  error(title: string, description?: string) {
    notification.error({
      message: title,
      description,
      placement: 'topRight',
      duration: DURATION,
    });
  },

  warning(title: string, description?: string) {
    notification.warning({
      message: title,
      description,
      placement: 'topRight',
      duration: DURATION,
    });
  },

  info(title: string, description?: string) {
    notification.info({
      message: title,
      description,
      placement: 'topRight',
      duration: DURATION,
    });
  },
};