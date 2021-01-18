import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'

import { HomeStack, DiscoveryStack, SettingsStack } from './src/stacks'
import { DP_RED_RGBA, PublicationPrimaryColor } from './src/utils/branding'
import { PublicationEnum } from './src/utils/constants'

const Tab = createBottomTabNavigator()

const TabNavigationController = ({ publication }) => {
  console.log(`navigation controller ${publication}`)
  // const bringUpActionSheet = () => {
  //   Animated.timing(bounceValue, {
  //     toValue: 1,
  //     duration: 500,
  //   }).str
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName

            if (route.name === 'HomeStack') {
              return (
                <Image
                  source={
                    color == PublicationPrimaryColor(PublicationEnum.dp)
                      ? require('./src/static/logos/dp-logo-small-red.png')
                      : require('./src/static/logos/dp-logo-small-grey.png')
                  }
                  style={{
                    width: 32,
                    resizeMode: 'contain',
                    alignSelf: 'center'
                  }}
                />
              )
            } else if (route.name == 'DiscoveryStack') iconName = 'search'
            else if (route.name === 'SettingsStack') iconName = 'cog'

            return <Ionicons name={iconName} size={30} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: PublicationPrimaryColor(PublicationEnum.dp),
          inactiveTintColor: 'gray',
          showLabel: false,
          style: {
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 3
          },
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="DiscoveryStack" component={DiscoveryStack} />
        <Tab.Screen name="SettingsStack" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = ({ publication }) => ({ publication })

export default connect(mapStateToProps)(TabNavigationController)

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
