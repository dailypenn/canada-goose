// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React from 'react'

import { DiscoveryScreen, SectionScreen } from '../screens'
import { ScreenWithDefaultParams, Stack } from '../../NavigationController'

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
  </Stack.Navigator>
)
