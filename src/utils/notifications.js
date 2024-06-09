import Constants from "expo-constants";
import { OneSignal, LogLevel } from 'react-native-onesignal'

import * as RootNavigation from '../components'

import { getArticlePubSlug } from "./helperFunctions";
import { deepLinkingAnalytics } from "./analytics";

export function initOneSignalClient() {

  OneSignal.Debug.setLogLevel(LogLevel.Debug)
  OneSignal.initialize(Constants.manifest?.extra?.oneSignalAppId)

  // Prompt for push on iOS
  OneSignal.Notifications.requestPermission(true).then(response => {
    console.log("Request notifications response: ", response);
  });

  // Method for handling notifications received while app in foreground
  OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      console.log("Received notification: ", event.getNotification());
    }
  );

  //Method for handling opened notifications
  OneSignal.Notifications.addEventListener("click", (event) => {
    const articleLink = event.notification.additionalData["article"]
    let navigate = url => {
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
