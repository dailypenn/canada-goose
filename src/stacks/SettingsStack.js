// Navigation stack within the settings tab
// Includes routes to the settings, about, notifications, privacy, manage feed and web view screens

import React from 'react'

import {
  SettingsScreen,
  AboutScreen,
  NotificationScreen,
  PrivacyScreen,
  ManageFeedScreen,
  WebViewScreen,
} from '../screens'
import { ScreenWithDefaultParams, Stack } from '../../NavigationController'

export const SettingsStack = ({ screenProps }) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={ScreenWithDefaultParams(SettingsScreen, screenProps)}
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: 'Notification' }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: 'Privacy' }}
      />
      <Stack.Screen
        name="ManageFeedScreen"
        component={ManageFeedScreen}
        options={ManageFeedScreen.navigationOptions}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  )
}
