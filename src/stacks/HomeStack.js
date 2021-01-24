// Navigation stack within the Home tab
// Includes routes to the home and article screens
import React, { useEffect, useState, forwardRef, createRef } from 'react'
import * as Haptics from 'expo-haptics'
import { createStackNavigator } from '@react-navigation/stack'
import { IS_ONBOARDED_KEY, Storage } from '../utils/storage'

import {
  HomeScreen,
  ArticleScreen,
  WebViewScreen,
  OnboardingModal,
} from '../screens'

import { DefaultStatusBar, PublicationModal } from '../components'

import { BODY_SERIF } from '../utils/fonts'

const Stack = createStackNavigator()

export const HomeStack = ({ navigation }) => {
  const [isOnboarded, hasCompletedOnboarding] = useState(true)

  // Haptic feedback when tab bar is pressed
  useEffect(() => {
    // Haptic feedback on tab presses

    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
    return unsubscribe
  }, [navigation, hasCompletedOnboarding])
  return (
    <>
      <DefaultStatusBar />
      <PublicationModal navigation={navigation} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontFamily: BODY_SERIF, fontSize: 20 },
          headerBackTitleVisible: false,
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
            title: '',
          })}
        />
      </Stack.Navigator>
    </>
  )
}
