import Constants from "expo-constants";
import OneSignal from "react-native-onesignal";

import * as RootNavigation from '../components'

import { getArticlePubSlug } from "./helperFunctions";
import { deepLinkingAnalytics } from "./analytics";

export function initOneSignalClient() {

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(Constants.manifest?.extra?.oneSignalAppId);

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log("Prompt response:", response);
  });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      let notification = notificationReceivedEvent.getNotification();
      // console.log("notification: ", notification);
      const data = notification.additionalData;
      // console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    }
  );

  //Method for handling opened notifications
  OneSignal.setNotificationOpenedHandler((notification) => {
    const articleLink = notification.notification.additionalData["article"]
    navigate = url => {
      if (url && url.includes('article')) {
        deepLinkingAnalytics()
        const { publication, slug } = getArticlePubSlug(url)
        RootNavigation.navigate('HomeStack')
        RootNavigation.push('HomeArticle', {
          articleSlug: slug,
          articlePublication: publication,
        })
      }
    }
    navigate(articleLink)
  });
}