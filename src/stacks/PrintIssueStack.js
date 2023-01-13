import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as Haptics from 'expo-haptics'

import { DISPLAY_SERIF_BLACK } from '../utils/fonts'
import {
  PrintIssueScreen,
} from '../screens'
import { DefaultStatusBar } from '../components'
const Stack = createStackNavigator()

export const PrintIssueStack = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
    return unsubscribe
  }, [navigation])
  
  return (
    <>
      <DefaultStatusBar />
      <Stack.Navigator
        initialRouteName="PrintIssue"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontFamily: DISPLAY_SERIF_BLACK, fontSize: 20 },
          headerBackTitleVisible: false,
        }}
      >

        <Stack.Screen
          name="PrintIssue"
          component={PrintIssueScreen}
          options={{title: 'Print Issue', headerShown: false,}}
        />
      </Stack.Navigator>
    </>
  )
}
