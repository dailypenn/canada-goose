import React, {useContext} from 'react'
import { StyleSheet, View, Text, Linking, Pressable } from 'react-native'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ThemeContext } from './ThemeProvider'
import themeContext from '@react-navigation/native/src/theming/ThemeContext'
// import AndroidOpenSettings from 'react-native-android-open-settings'

const openNotificationsSettings = () => {
  // if (Platform.OS === 'ios') {
  //   Linking.openSettings()
  // } else {
  //   AndroidOpenSettings.appNotificationSettings()
  // }
  Linking.openSettings()
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    borderTopWidth: 0.6,
    borderTopColor: theme.borderColor,
    backgroundColor: theme.wallColor,
  },
  description: {
    color: theme.secondaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    textAlign: 'center',
    fontSize: 13,
  },
  turnOnButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontFamily: GEOMETRIC_BOLD,
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
})

export const EnableNotificationsView = () => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.description}>
        Push notifications must be enabled to receive alerts from The Daily Pennsylvanian
      </Text>
      <Pressable style={styles.turnOnButton} onPress={openNotificationsSettings}>
        <Text style={styles.buttonText}>
          Turn on notifications
        </Text>
      </Pressable>

    </View>
  )
}
