// Navigation stack within the Home tab
// Includes routes to the home and article screens

import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  HomeScreen,
  ArticleScreen,
  ScreenWithDefaultParams,
  WebViewScreen,
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
const Stack = createStackNavigator()

export const HomeStack = ({ screenProps, navigation }) => {
  // Register long press to change screens
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      screenProps.onHomeIconLongPress()
    })

    return unsubscribe
  }, [navigation])

  // Haptic feedback when tab bar is pressed
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })

    return unsubscribe
  }, [navigation])

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={ScreenWithDefaultParams(HomeScreen, screenProps)}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeArticle"
          component={ArticleScreen}
          options={({ route }) => ({
            title: route.params.article.headline,
            animationEnabled: true,
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="ArticleBrowser"
          component={WebViewScreen}
          options={({ route }) => ({
            link: route.params.link,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
