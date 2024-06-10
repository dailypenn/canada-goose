// Navigation stack within the Discovery tab
// Includes routes to the discovery and section screens

import React, { useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DISPLAY_SERIF_BLACK } from '../utils/fonts'
import { ArticleScreen, DiscoveryScreen, SectionScreen, WebViewScreen } from '../screens'
import { DefaultStatusBar, ThemeContext } from '../components'
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
            borderBottomWidth: 1,
            borderBottomColor: theme.borderColor,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: DISPLAY_SERIF_BLACK,
            fontSize: 20,
          },
          headerTintColor: theme.primaryTextColor,
          headerBackTitleVisible: false,
          headerLeft: (props) => (
            <TouchableOpacity
              onPress={props.onPress}
              style={{ marginLeft: 8, marginTop: 5 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={32}
                color={theme.primaryTextColor}
              />
            </TouchableOpacity>
          )
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
