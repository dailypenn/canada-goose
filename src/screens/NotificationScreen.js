import React, { useState, useEffect } from 'react'
import { AppState, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Switch } from 'react-native-gesture-handler'
import { updateNotifPref } from '../actions'
import { EnableNotificationsView } from '../components';
import * as Notifications from 'expo-notifications';

import {
  NOTIF_PREFS_KEY,
  Storage,
} from '../utils/storage'

import { GEOMETRIC_REGULAR, DISPLAY_SERIF_BLACK } from '../utils/fonts'

const NOTIFICATIONS = require('../json/notifications.json')

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },

  cellContainer: {
    paddingVertical: 0,
  },

  cell: {
    borderTopColor: '#d4d4d4',
    borderTopWidth: 0.6,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 0.6,
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
    color: '#808080',
  },

  regText: {
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

const NotificationCell = ({ info, initialPref, notifIndex, updateHandler }) => {

  const [isEnabled, setIsEnabled] = useState(initialPref)

  const toggleSwitch = () => {
    updateHandler({notifIndex}, !isEnabled)
    setIsEnabled(previousState => !previousState)
  }

  return (
    <View style={styles.cellContainer}>
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
    AppState.addEventListener('change', state =>
      allowsNotificationsAsync(setNotificationsEnabled)
    )
  })

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