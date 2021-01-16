// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ArticleScreen, DiscoveryScreen, SectionScreen } from '../screens'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export const DiscoveryStack = () => (
  <Stack.Navigator
    initialRouteName="Discovery"
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
      headerTitleStyle: { fontWeight: 'bold' },
      headerBackTitleVisible: false
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
        animationEnabled: true
      })}
    />
    <Stack.Screen
      name="SectionArticle"
      component={ArticleScreen}
      options={ArticleScreen.navigationOptions}
    />
  </Stack.Navigator>
)
