import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Enum for the 3 publications included in this app
const PublicationEnum = Object.freeze({
  dp: 'The Daily Pennsylvanian',
  street: '34th Street',
  utb: 'Under the Button',
})

const ScreenWithDefaultParams = (Comp, defaultParams) => {
  return class extends Component {
    render() {
      return <Comp {...this.props} screenProps={defaultParams} />
    }
  }
}

// Navigation controller for all tabs
class TabNavigationController extends Component {
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

export {
  Stack,
  PublicationEnum,
  TabNavigationController,
  ScreenWithDefaultParams,
}
