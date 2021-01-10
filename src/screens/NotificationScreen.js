import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

import { GEOMETRIC_REGULAR } from '../utils/fonts'

const NOTIFICATIONS = require('../json/notifications.json')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  cellContainer: {
    paddingVertical: 15,
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

  description: {
    fontFamily: GEOMETRIC_REGULAR,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 12,
    color: '#808080',
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const NotificationCell = ({ info }) => {
  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View style={styles.cellContainer}>
      <View style={styles.cell}>
        <Text style={styles.regText}>{info.title}</Text>
        <View style={styles.spacer} />
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.toggle}
        />
      </View>
      <Text style={styles.description}>{info.description}</Text>
    </View>
  )
}

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {NOTIFICATIONS.map((l, i) => (
        <NotificationCell key={i} info={l} />
      ))}
    </View>
  )
}
