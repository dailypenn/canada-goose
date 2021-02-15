import React from 'react'
import * as Analytics from 'expo-firebase-analytics'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { PublicationPrimaryColor } from './src/utils/branding'
import { PublicationEnum } from './src/utils/constants'

const DP_LOGO_RED = require('./src/static/logos/dp-logo-small-red.png')
const DP_LOGO_GREY = require('./src/static/logos/dp-logo-small-grey.png')
const STREET_LOGO_TEAL = require('./src/static/logos/street-logo-small-teal.png')
const STREET_LOGO_GREY = require('./src/static/logos/street-logo-small-grey.png')
const UTB_LOGO_BLUE = require('./src/static/logos/utb-logo-small-blue.png')
const UTB_LOGO_GREY = require('./src/static/logos/utb-logo-small-grey.png')

const Tab = createBottomTabNavigator()

const TabNavigationController = ({ currPublication }) => {
  const routeNameRef = React.useRef()
  const navigationRef = React.useRef()

  const GET_PUB_LOGO = focused => {
    switch (currPublication) {
      case PublicationEnum.dp:
        return focused ? DP_LOGO_RED : DP_LOGO_GREY
      case PublicationEnum.street:
        return focused ? STREET_LOGO_TEAL : STREET_LOGO_GREY
      default:
        return focused ? UTB_LOGO_BLUE : UTB_LOGO_GREY
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        console.log('on state change')
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current.getCurrentRoute().name
        
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName)
        }

        routeNameRef.current = currentRouteName
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let iconName

            if (route.name === 'HomeStack') {
              return (
                <Image
                  source={GET_PUB_LOGO(focused)}
                  style={{
                    height: 26,
                    width: 45,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              )
            } else if (route.name == 'DiscoveryStack') iconName = 'search'
            else if (route.name === 'SettingsStack') iconName = 'cog'

            return <Ionicons name={iconName} size={26} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: PublicationPrimaryColor(currPublication),
          inactiveTintColor: 'gray',
          showLabel: false,
          style: {
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          },
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="DiscoveryStack" component={DiscoveryStack} />
        <Tab.Screen name="SettingsStack" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = ({ publication }) => {
  const { currPublication } = publication

  return { currPublication }
}

export default connect(mapStateToProps)(TabNavigationController)
