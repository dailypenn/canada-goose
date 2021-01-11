import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { PublicationEnum } from './src/utils/constants'
import { ScreenWithDefaultParams } from './src/screens'

const Tab = createBottomTabNavigator()

export class TabNavigationController extends Component {
  constructor(props) {
    super(props)
    this.switchPublication = this.switchPublication.bind(this)
    this.state = {
      currPublication: PublicationEnum.dp,
      switchPublication: this.switchPublication,
    }
  }

  // Updates state to match for new publication
  switchPublication(newPublication) {
    if (newPublication != this.state.currPublication) {
      this.setState(prevState => ({
        ...prevState.switchPublication,
        currPublication: newPublication,
      }))
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName

              if (route.name === 'HomeStack') iconName = 'ios-home'
              else if (route.name == 'DiscoveryStack') iconName = 'ios-search'
              else if (route.name === 'SettingsStack') iconName = 'ios-settings'

              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: '#A61E21',
            inactiveTintColor: 'gray',
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={ScreenWithDefaultParams(HomeStack, {
              state: this.state,
            })}
          />
          <Tab.Screen
            name="DiscoveryStack"
            component={ScreenWithDefaultParams(DiscoveryStack, {
              state: this.state,
            })}
          />
          <Tab.Screen
            name="SettingsStack"
            component={ScreenWithDefaultParams(SettingsStack, {
              state: this.state,
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
