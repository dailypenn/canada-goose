// Navigation stack within the Home tab
// Includes routes to the home and article screens

import React from 'react'

import { ArticleScreen } from '../screens'

import {
  BODY_SERIF,
} from '../utils/fonts'

export const ArticleStack = () => (
  <Stack.Navigator
    initialRouteName="Article"
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
      headerTitleStyle: { fontFamily: BODY_SERIF, fontSize: 20, },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen
      name="Article"
      component={ArticleScreen}
      options={{ title: '', headerShown: false }}
    />
  </Stack.Navigator>
)
