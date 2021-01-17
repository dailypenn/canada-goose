// Navigation stack within the Home tab
// Includes routes to the home and article screens
import React, { useEffect, useState, forwardRef, createRef } from 'react'
import * as Haptics from 'expo-haptics'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, ArticleScreen, WebViewScreen } from '../screens'
import { PublicationModal } from '../components'

const Stack = createStackNavigator()

export const HomeStack = ({ navigation }) => {
  // Register long press to change screens

  // Haptic feedback when tab bar is pressed
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused())
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })

    return unsubscribe
  }, [navigation])

  return (
    <>
      <PublicationModal navigation={navigation} />
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
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeArticle"
          component={ArticleScreen}
          options={ArticleScreen.navigationOptions}
        />
        <Stack.Screen
          name="ArticleBrowser"
          component={WebViewScreen}
          options={({ route }) => ({
            link: route.params.link,
          })}
        />
      </Stack.Navigator>
    </>
  )
}
