import notifee, {EventType, Notification} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {NotificationService} from './NotificationService';

export const useNotificationBoot = () => {
  useEffect(() => {
    notifee
      .setBadgeCount(0)
      .then(() => console.log!('[FCMService] Badge count set'));
    NotificationService.requestNotifeePermission();
    NotificationService.createChannelAndroid();
    NotificationService.checkPermission();
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log!(
          '[FCMService] When the application is opened from a quit state.',
          remoteMessage,
        );
        if (remoteMessage) {
          NotificationService.onOpenNotification(remoteMessage);
        }
      });

    notifee.onBackgroundEvent(async ({detail}) => {
      const {notification} = detail;
      if (notification?.id) {
        NotificationService.cancelNotification(notification.id);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        '[FCMService] Handles FCM messages when the app is in a killed state.',
        remoteMessage,
      );
    });

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log!(
            '[FCMService] When the user presses a notification displayed via FCM, the application is running, but in the background',
            remoteMessage,
          );
          if (remoteMessage) {
            NotificationService.onOpenNotification(remoteMessage);
          }
        },
      );

    const unsubscribeOnForegroundMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log!('[FCMService] Foreground state messages', remoteMessage);
        if (remoteMessage) {
          const {notification, data} = remoteMessage;
          await NotificationService.displayLocalNotification(
            notification as Notification,
            data,
          );
        }
      },
    );

    const unsubscribeOnForegroundEvent = notifee.onForegroundEvent(
      ({type, detail}) => {
        const {notification} = detail;
        switch (type) {
          case EventType.DISMISSED:
            console.log!(
              '[FCMService] User dismissed notification',
              notification,
            );
            break;
          case EventType.PRESS:
            console.log!(
              '[FCMService] User pressed notification',
              notification,
            );
            NotificationService.onOpenNotification(notification);
            break;
          default:
            console.log!('[FCMService] User no action');
        }
      },
    );
    return () => {
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnForegroundMessage();
      unsubscribeOnForegroundEvent();
    };
  }, []);
};
