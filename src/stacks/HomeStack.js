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
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export const HomeStack = ({ screenProps }) => (
  // <NavigationContainer independent={true}>
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
        // component={ScreenWithDefaultParams(HomeScreen, screenProps)}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeArticle"
        component={ArticleScreen}
        options={({ route }) => ({
          title: route.params.article.headline,
          animationEnabled: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="ArticleBrowser"
        component={WebViewScreen}
        options={({ route }) => ({
          link: route.params.link,
        })}
      />
    </Stack.Navigator>
  // </NavigationContainer>
)
