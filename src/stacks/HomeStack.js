// Navigation stack within the Home tab
// Includes routes to the home and article screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  HomeScreen,
  ArticleScreen,
  ScreenWithDefaultParams,
  WebViewScreen,
} from '../screens'

const Stack = createStackNavigator()

export const HomeStack = ({ screenProps }) => (
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
)
