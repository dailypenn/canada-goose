import React, { useState, useEffect, useContext } from 'react'
import { AppState, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Switch } from 'react-native-gesture-handler'
import OneSignal from "react-native-onesignal";
import Constants from "expo-constants";
import { updateNotifPref } from '../actions'
import { EnableNotificationsView, ThemeContext } from '../components';
import * as Notifications from 'expo-notifications';
import {
  NOTIF_PREFS_KEY,
  Storage,
} from '../utils/storage'
import { GEOMETRIC_REGULAR, DISPLAY_SERIF_BLACK } from '../utils/fonts'

const NOTIFICATIONS = require('../json/notifications.json')

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.wallColor,
    flex: 1
  },
  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
    flexDirection: 'row',
    paddingVertical: 10,
    borderColor: theme.borderColor,
    borderBottomWidth: 0.8,
  },
  spacer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    paddingVertical: 7,
    maxWidth: '80%'
  },
  description: {
    fontFamily: GEOMETRIC_REGULAR,
    paddingTop: 3,
    fontSize: 12,
    color: theme.secondaryTextColor,
  },
  regText: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BLACK,
    fontSize: 16,
  },
  settingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const oneSignalTags = ["breaking", "top", "34st", "utb"]

const NotificationCell = ({ info, initialPref, notifIndex, updateHandler }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  const [isEnabled, setIsEnabled] = useState(initialPref)

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(Constants.manifest?.extra?.oneSignalAppId);

  const toggleSwitch = () => {
    updateHandler({notifIndex}, !isEnabled)
    updateHandler(notifIndex = {notifIndex}, value = !isEnabled)
    OneSignal.sendTag(oneSignalTags[notifIndex.notifIndex], (!isEnabled).toString());
    setIsEnabled(previousState => !previousState)
  }

  return (
    <View style={styles.cell}>
      <View style={styles.textContainer}>
        <Text style={styles.regText}>{info.title}</Text>
        <Text style={styles.description}>{info.description}</Text>
      </View>
      <View style={styles.spacer} />
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

async function allowsNotificationsAsync(setNotificationsEnabled) {
  const settings = await Notifications.getPermissionsAsync();

  if(settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    setNotificationsEnabled(true)
  } else {
    setNotificationsEnabled(false)
  }
}

const NotificationScreenComp = ({
  settings,
  dispatch,
}) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  const notifPreferences = settings.notifPreferences ? settings.notifPreferences : [true, true, false, false]

  const updateHandler = async ({ notifIndex }, value) => {
    const newPreferences = notifPreferences
    newPreferences[notifIndex] = value
    
    let updated_successfully = await Storage.setItem(
      NOTIF_PREFS_KEY,
      newPreferences
    )

    if (updated_successfully) dispatch(updateNotifPref(notifIndex, value))
  }

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  allowsNotificationsAsync(setNotificationsEnabled)

  useEffect(() => {
    const handleAppStateChange = (state) => {
      allowsNotificationsAsync(setNotificationsEnabled);
    };
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  if (notificationsEnabled) {
    return (
      <View style={styles.container}>
        {NOTIFICATIONS.map((l, i) => (
          <NotificationCell key={i} info={l} initialPref={notifPreferences[i]} notifIndex={i} updateHandler={updateHandler}/>
        ))}
      </View>
    )
  } else {
    return (
      <EnableNotificationsView/>
    )
  }

}

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const NotificationScreen = connect(mapStateToProps)(NotificationScreenComp)