// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  ArticleScreen,
  DiscoveryScreen,
  ScreenWithDefaultParams,
  SectionScreen,
} from '../screens'

const Stack = createStackNavigator()

export const DiscoveryStack = ({ screenProps }) => (
  <Stack.Navigator
    initialRouteName="Discovery"
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
      headerTitleStyle: { fontWeight: 'bold' },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen
      name="Discovery"
      component={ScreenWithDefaultParams(DiscoveryScreen, screenProps)}
      options={{ title: 'Discover', headerShown: false }}
    />
    <Stack.Screen
      name="Section"
      component={ScreenWithDefaultParams(SectionScreen, screenProps)}
      options={({ route }) => ({
        title: route.params.sectionName,
        animationEnabled: true,
      })}
    />
    <Stack.Screen
      name="SectionArticle"
      component={ArticleScreen}
      options={({ route }) => ({
        title: route.params.article.headline,
        animationEnabled: true,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
)
