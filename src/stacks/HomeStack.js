// Navigation stack within the Home tab
// Includes routes to the home and article screens
import React, { useEffect } from 'react'
import * as Haptics from 'expo-haptics'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, ArticleScreen, WebViewScreen } from '../screens'
import { DefaultStatusBar, PublicationModal } from '../components'
import { BODY_SERIF } from '../utils/fonts'
import { useScrollToTop } from '@react-navigation/native'

const Stack = createStackNavigator()

export const HomeStack = ({ navigation }) => {
  // Haptic feedback when tab bar is pressed
  useEffect(() => {
    // Haptic feedback on tab presses

    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
    return unsubscribe
  }, [navigation])

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
          name="HomeBrowser"
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
