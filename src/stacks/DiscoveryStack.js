// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'

import {
  BODY_SERIF,
} from '../utils/fonts'

import { ArticleScreen, DiscoveryScreen, SectionScreen } from '../screens'
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
          //headerTitleStyle: { fontWeight: 'bold' },
          headerTitleStyle: { fontFamily: BODY_SERIF, fontSize: 20, },
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
      </Stack.Navigator>
    </>
  )
}
