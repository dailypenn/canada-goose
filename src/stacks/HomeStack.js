// Navigation stack within the Home tab
// Includes routes to the home and article screens
import React, { useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ArticleScreen, HomeScreen, WebViewScreen } from '../screens'
import { DefaultStatusBar, PublicationModal, ThemeContext } from '../components'
import {BODY_SERIF, DISPLAY_SERIF_BLACK} from '../utils/fonts'

const Stack = createStackNavigator()

export const HomeStack = ({ navigation }) => {
  const theme = useContext(ThemeContext)

  // Haptic feedback when tab bar is pressed
  useEffect(() => {
    // Haptic feedback on tab presses
    return navigation.addListener('tabPress', e => {
      if (!navigation.isFocused()) {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    })
  }, [navigation])

  return (
    <>
      <DefaultStatusBar />
      <PublicationModal navigation={navigation} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            shadowColor: theme.borderColor,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: BODY_SERIF,
            fontSize: 20,
          },
          headerTintColor: theme.primaryTextColor,
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
