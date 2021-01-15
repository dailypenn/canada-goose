import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Button, Easing } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'
import Modal from 'react-native-modal'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { PublicationEnum } from './src/utils/constants'
import { ScreenWithDefaultParams } from './src/screens'
import { View } from 'react-native'

const Tab = createBottomTabNavigator()

export const TabNavigationController = ({ navigation }) => {
  const [currPublication, updateCurrPublication] = useState(PublicationEnum.dp)
  const [pubMenuVisible, updatePubMenuVisibility] = useState(false)

  const switchPublication = newPublication => {
    if (nwePublication != currPublication) {
      updateCurrPublication(currPublication)
    }
  }

  const homeIconPressed = () => {
    updatePubMenuVisibility(!pubMenuVisible)
  }

  // const bringUpActionSheet = () => {
  //   Animated.timing(bounceValue, {
  //     toValue: 1,
  //     duration: 500,
  //   }).str
  // }

  const CHILD_STATE = {
    currPublication,
    switchPublication,
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName

            if (route.name === 'HomeStack') {
              iconName = 'ios-home'
            } else if (route.name == 'DiscoveryStack') iconName = 'ios-search'
            else if (route.name === 'SettingsStack') iconName = 'ios-settings'

            return <Ionicons name={iconName} size={30} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: '#A61E21',
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
        <Tab.Screen
          name="HomeStack"
          component={ScreenWithDefaultParams(HomeStack, {
            state: CHILD_STATE,
            onHomeIconLongPress: () => homeIconPressed(),
          })}
        />
        <Tab.Screen
          name="DiscoveryStack"
          component={ScreenWithDefaultParams(DiscoveryStack, {
            state: CHILD_STATE,
          })}
        />
        <Tab.Screen
          name="SettingsStack"
          component={ScreenWithDefaultParams(SettingsStack, {
            state: CHILD_STATE,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// export class TabNavigationController extends Component {
//     super(props)
//     this.switchPublication = this.switchPublication.bind(this)
//     // this.updatePublicationMenuVisible = this.updatePublicationMenuVisible.bind(
//     //   this
//     // )

//     this.state = {
//       // TODO: Set Publication Enum to what's stored on disk
//       currPublication: PublicationEnum.dp,
//       publicationMenuVisible: false,
//       switchPublication: this.switchPublication,
//     }
//   }

//   // Updates state to match for new publication
//   switchPublication(newPublication) {
//     if (newPublication != this.state.currPublication) {
//       this.setState(prevState => ({
//         ...prevState.switchPublication,
//         currPublication: newPublication,
//       }))
//     }
//   }

//   render() {
//     return (
//       <>
//         <NavigationContainer>
//           <Tab.Navigator
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ color, size }) => {
//                 let iconName

//                 if (route.name === 'HomeStack') {
//                   iconName = 'ios-home'
//                   return <Ionicons name={iconName} size={size} color={color} />
//                 } else if (route.name == 'DiscoveryStack')
//                   iconName = 'ios-search'
//                 else if (route.name === 'SettingsStack')
//                   iconName = 'ios-settings'

//                 return <Ionicons name={iconName} size={size} color={color} />
//               },
//             })}
//             tabBarOptions={{
//               activeTintColor: '#A61E21',
//               inactiveTintColor: 'gray',
//               showLabel: false,
//             }}
//           >
//             <Tab.Screen
//               name="HomeStack"
//               component={ScreenWithDefaultParams(HomeStack, {
//                 state: this.state,
//               })}
//             />
//             <Tab.Screen
//               name="DiscoveryStack"
//               component={ScreenWithDefaultParams(DiscoveryStack, {
//                 state: this.state,
//               })}
//             />
//             <Tab.Screen
//               name="SettingsStack"
//               component={ScreenWithDefaultParams(SettingsStack, {
//                 state: this.state,
//               })}
//             />
//           </Tab.Navigator>
//         </NavigationContainer>
//       </>
//     )
//   }
// }
