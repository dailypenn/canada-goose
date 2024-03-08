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
  WebViewScreen,
  SavedArticlesScreen,
  ArticleScreen,
  ManageFeedScreen,
} from '../screens'
import { DefaultStatusBar } from '../components'

import { BODY_SERIF, DISPLAY_SERIF_BLACK, GEOMETRIC_BOLD } from '../utils/fonts'

const Stack = createStackNavigator()

export const SettingsStack = ({ navigation }) => {
  console.log(navigation.isFocused())
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
        initialRouteName="Settings"
        screenOptions={{
          headerTitleStyle: {
            fontFamily: DISPLAY_SERIF_BLACK,
            fontSize: 20,
          },
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Account',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Operation Canada Goose' }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{ title: 'Notifications' }}
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
          options={{ title: 'DP Developers' }}
        />

        <Stack.Screen
          name="SavedArticles"
          component={SavedArticlesScreen}
          options={{ title: 'Bookmarked Articles' }}
        />

        <Stack.Screen
          name="SettingsArticle"
          component={ArticleScreen}
          options={ArticleScreen.navigationOptions}
        />
      </Stack.Navigator>
    </>
  )
}
