// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as Haptics from 'expo-haptics'

import { DISPLAY_SERIF_BLACK } from '../utils/fonts'
import {
  ArticleScreen,
  DiscoveryScreen,
  SectionScreen,
  WebViewScreen,
} from '../screens'
import { DefaultStatusBar } from '../components'

const Stack = createStackNavigator()

export const DiscoveryStack = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (!navigation.isFocused())
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })
  })
  return (
    <>
      <DefaultStatusBar />
      <Stack.Navigator
        initialRouteName="Discovery"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontFamily: DISPLAY_SERIF_BLACK, fontSize: 20 },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Discovery"
          component={DiscoveryScreen}
          options={{ title: 'Discover', headerShown: false }}
        />
        <Stack.Screen
          name="Section"
          component={SectionScreen}
          options={({ route }) => ({
            title: route.params.sectionName,
            animationEnabled: true,
          })}
        />
        <Stack.Screen
          name="SectionArticle"
          component={ArticleScreen}
          options={ArticleScreen.navigationOptions}
        />
        <Stack.Screen
          name="SectionBrowser"
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
