import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  Notification,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const channelNotify = {
  id: 'default',
  name: 'Notification Channel',
  lights: false,
  vibration: true,
  importance: AndroidImportance.HIGH,
};

const senderId = '833947949628';

class NotificationHandler {
  // Create a channel (required for Android)
  async createChannelAndroid() {
    await notifee.createChannel(channelNotify);
  }

  async getFCMToken() {
    return await messaging().getToken({
      senderId,
    });
  }

  async deleteFCMToken() {
    return await messaging().deleteToken({
      senderId,
    });
  }

  // action when click notification
  async onOpenNotification(message: any, delay = 0) {
    setTimeout(async () => {
      console.log('[FCMService] onOpenNotification: ', message);
    }, delay);
  }

  async cancelNotification(notificationId: string) {
    await notifee.cancelNotification(notificationId);
  }

  async displayLocalNotification(
    notification: Notification,
    data?: undefined | {[key: string]: string},
  ) {
    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      android: {
        channelId: channelNotify.id,
        smallIcon: 'ic_launcher',
        lightUpScreen: true,
      },
      ios: {
        sound: 'default',
      },
      data,
    });
  }

  // request notify permission using notifee
  async requestNotifeePermission() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log!('[FCMService] Permission settings', settings);
    } else {
      console.log!('[FCMService] User declined permissions');
    }
  }

  // request notify permission using firebase
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log!('[FCMService] Authorization status:', authStatus);
    }
  }

  async checkPermission() {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        const fcmToken = await this.getFCMToken();
        console.log('[FCMService] FcmToken', fcmToken);
      } else {
        this.requestPermission();
      }
    } catch (err) {
      console.log!('[FCMService] Check Permission', err);
    }
  }
}

export const NotificationService = new NotificationHandler();
