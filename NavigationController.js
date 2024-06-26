import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { CrosswordsScreen } from './src/screens'
import { PublicationPrimaryColor } from './src/utils/branding'
import { PublicationEnum } from './src/utils/constants'

import { navigationRef, ThemeContext } from './src/components'

const DP_LOGO_RED = require('./src/static/logos/dp-logo-small-red.png')
const DP_LOGO_GREY = require('./src/static/logos/dp-logo-small-grey.png')
const STREET_LOGO_TEAL = require('./src/static/logos/street-logo-small-teal.png')
const STREET_LOGO_GREY = require('./src/static/logos/street-logo-small-grey.png')
const UTB_LOGO_BLUE = require('./src/static/logos/utb-logo-small-blue.png')
const UTB_LOGO_GREY = require('./src/static/logos/utb-logo-small-grey.png')

const Tab = createBottomTabNavigator()

const TabNavigationController = ({ currPublication }) => {
  const theme = useContext(ThemeContext)
  const routeNameRef = React.useRef()
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
      // linking={linking}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name
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
            } else if (route.name === 'DiscoveryStack') iconName = 'search'
            else if (route.name === 'SettingsStack') iconName = 'person-outline'
            else if (route.name === 'CrosswordsScreen') iconName = 'grid-outline'

            return <Ionicons name={iconName} size={26} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: PublicationPrimaryColor(currPublication),
          inactiveTintColor: 'gray',
          showLabel: false,
          style: {
            backgroundColor: theme.backgroundColor,
            shadowColor: theme.primaryTextColor,
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          onPress: () => {
            // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          },
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="DiscoveryStack" component={DiscoveryStack} />
        <Tab.Screen name="CrosswordsScreen" component={CrosswordsScreen} />
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
