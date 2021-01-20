// Navigation stack within the settings tab
// Includes routes to the settings, about, notifications, privacy, manage feed and web view screens

import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as Haptics from 'expo-haptics'

import {
  SettingsScreen,
  AboutScreen,
  NotificationScreen,
  PrivacyScreen,
  ManageFeedScreen,
  WebViewScreen,
  SavedArticlesScreen,
  ArticleScreen,
} from '../screens'

const Stack = createStackNavigator()

export const SettingsStack = ({ navigation }) => {
  console.log(navigation.isFocused())
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused())
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })

    return unsubscribe
  }, [navigation])

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
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

      <Stack.Screen
        name="SavedArticles"
        component={SavedArticlesScreen}
        options={{ title: 'Saved Articles' }}
      />

      <Stack.Screen
        name="SettingsArticle"
        component={ArticleScreen}
        options={ArticleScreen.navigationOptions}
      />
    </Stack.Navigator>
  )
}
