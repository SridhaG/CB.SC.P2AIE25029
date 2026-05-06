import { Log } from 'logging_middleware';

const API_URL = 'http://20.207.122.201/evaluation-service/notifications';

export const fetchNotifications = async (limit, page, notification_type) => {
  try {
    const url = new URL(API_URL);
    if (limit) url.searchParams.append('limit', limit);
    if (page) url.searchParams.append('page', page);
    if (notification_type) url.searchParams.append('notification_type', notification_type);

    Log(new Error().stack, 'INFO', 'notification_app_fe', `Fetching notifications from ${url.toString()}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    Log(new Error().stack, 'INFO', 'notification_app_fe', `Successfully fetched ${data.notifications?.length || 0} notifications`);
    return data.notifications || [];
  } catch (error) {
    Log(new Error().stack, 'ERROR', 'notification_app_fe', `Failed to fetch notifications: ${error.message}`);
    return [];
  }
};
