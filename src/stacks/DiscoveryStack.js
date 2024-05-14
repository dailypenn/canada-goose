// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React, { useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DISPLAY_SERIF_BLACK } from '../utils/fonts'
import { ArticleScreen, DiscoveryScreen, SectionScreen, WebViewScreen } from '../screens'
import { DefaultStatusBar, ThemeContext } from '../components'

const Stack = createStackNavigator()

export const DiscoveryStack = ({ navigation }) => {
  const theme = useContext(ThemeContext)

  useEffect(() => {
    return navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
  }, [navigation])
  
  return (
    <>
      <DefaultStatusBar />
      <Stack.Navigator
        initialRouteName="Discovery"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            shadowColor: theme.borderColor,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: DISPLAY_SERIF_BLACK,
            fontSize: 20,
          },
          headerTintColor: theme.primaryTextColor,
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
