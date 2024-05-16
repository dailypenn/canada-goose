// Navigation stack within the settings tab
// Includes routes to the settings, about, notifications, privacy, manage feed and web view screens

import React, { useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  AboutScreen,
  ArticleScreen,
  DisplaySettingsScreen,
  ManageFeedScreen,
  NotificationScreen,
  PrivacyScreen,
  SavedArticlesScreen,
  SettingsScreen,
  WebViewScreen
} from '../screens'
import { DefaultStatusBar, ThemeContext } from '../components'

import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

const Stack = createStackNavigator()

export const SettingsStack = ({ navigation }) => {


  const theme = useContext(ThemeContext)

  useEffect(() => {
    return navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
  }, [navigation])

  return (
    <>
      <DefaultStatusBar />
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            borderBottomWidth: 0.8,
            borderBottomColor: theme.borderColor,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: DISPLAY_SERIF_BLACK,
            fontSize: 20,
          },
          headerTintColor: theme.primaryTextColor,
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
          name="DisplaySettings"
          component={DisplaySettingsScreen}
          options={{title: 'Display Settings'}}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{ title: '' }}
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
