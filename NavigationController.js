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
  const DP_LOGO_RED = require('./src/static/logos/dp-logo-small-red.png')
  const DP_LOGO_GREY = require('./src/static/logos/dp-logo-small-grey.png')

  const STREET_LOGO_TEAL = require('./src/static/logos/street-logo-small-teal.png')
  const STREET_LOGO_GREY = require('./src/static/logos/street-logo-small-grey.png')

  const UTB_LOGO_BLUE = require('./src/static/logos/utb-logo-small-blue.png')
  const UTB_LOGO_GREY = require('./src/static/logos/utb-logo-small-grey.png')

  const GET_PUB_LOGO = focused => {
    switch (publication) {
      case PublicationEnum.dp:
        return focused ? DP_LOGO_RED : DP_LOGO_GREY
      case PublicationEnum.street:
        return focused ? STREET_LOGO_TEAL : STREET_LOGO_GREY
      default:
        return focused ? UTB_LOGO_BLUE : UTB_LOGO_GREY
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let iconName

            if (route.name === 'HomeStack') {
              return (
                <Image
                  source={GET_PUB_LOGO(focused)}
                  style={{
                    height: 28,
                    width: 45,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              )
            } else if (route.name == 'DiscoveryStack') iconName = 'search'
            else if (route.name === 'SettingsStack') iconName = 'cog'

            return <Ionicons name={iconName} size={30} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: PublicationPrimaryColor(publication),
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
