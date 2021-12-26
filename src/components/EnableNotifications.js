import React from 'react'
import { View, Text, Linking, Pressable } from 'react-native'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
// import AndroidOpenSettings from 'react-native-android-open-settings'

const openNotificationsSettings = () => {
  // if (Platform.OS === 'ios') {
  //   Linking.openSettings()
  // } else {
  //   AndroidOpenSettings.appNotificationSettings()
  // }
  Linking.openSettings()
}

export const EnableNotificationsView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 35,
    }}
  >
    <Text style={{ fontFamily: GEOMETRIC_REGULAR, textAlign: 'center', fontSize: 13, color: '#777'}}>
      Push notifications must be enabled to receive alerts from The Daily Pennsylvanian
    </Text>
    <Pressable style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, elevation: 3, backgroundColor: '#222'}} onPress={openNotificationsSettings}>
      <Text style={{fontFamily: GEOMETRIC_BOLD, textAlign: 'center', fontSize: 18, color: '#fff'}}>
        Turn on notifications
      </Text>
    </Pressable>

  </View>
)
