import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Button, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { PublicationEnum } from './src/utils/constants'
import { ScreenWithDefaultParams } from './src/screens'
import { Easing } from 'react-native'

const Tab = createBottomTabNavigator()

export const TabNavigationController = ({ navigation }) => {
  const [currPublication, updateCurrPublication] = useState(PublicationEnum.dp)
  const [pubMenuVisible, updatePubMenuVisibility] = useState(false)
  const [bounceValue] = useState(new Animated.Value(0))
  const [sheetParentOpacity] = useState(new Animated.Value(0))
  const [sheetParentTop] = useState(
    new Animated.Value(Dimensions.get('screen').height)
  )

  const switchPublication = newPublication => {
    if (nwePublication != currPublication) {
      updateCurrPublication(currPublication)
    }
  }

  const homeIconPressed = () => {
    console.log('registered long press!')

    var sheetToValue = pubMenuVisible ? 0 : -300
    var parentViewToValue = pubMenuVisible ? 0 : 0.9
    var parentViewTopToValue = pubMenuVisible
      ? Dimensions.get('screen').height
      : 0

    const parallelAnims = Animated.parallel([
      Animated.timing(sheetParentTop, {
        toValue: parentViewTopToValue,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: sheetToValue,
        duration: 300,
        easing: pubMenuVisible ? Easing.in(Easing.exp) : Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ])

    var sequence = [
      Animated.timing(sheetParentOpacity, {
        toValue: parentViewToValue,
        duration: 300,
        useNativeDriver: true,
      }),
      parallelAnims,
    ]

    if (pubMenuVisible) {
      sequence.reverse()
    }

    Animated.sequence(sequence).start()
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
    <>
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
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            opacity: 1,
            transform: [{ translateY: sheetParentTop }],
          }}
        >
          <Animated.View
            style={{
              height: 350,
              width: '100%',
              backgroundColor: 'white',
              position: 'absolute',
              top: Dimensions.get('screen').height,
              transform: [{ translateY: bounceValue }],
              borderRadius: 20,
              shadowRadius: 5,
              shadowColor: 'black',
              shadowOpacity: 0.3,
              shadowOffset: { y: -20 },
            }}
            onPress={() => {
              homeIconPressed()
            }}
          >
            <Button onPress={() => homeIconPressed()} title="Send down" />
          </Animated.View>
        </Animated.View>
      </NavigationContainer>
    </>
  )
}

// export class TabNavigationController extends Component {
//   constructor(props) {
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
