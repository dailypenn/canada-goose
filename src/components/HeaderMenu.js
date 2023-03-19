import React from 'react'
import { useState } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Platform,
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

// const [scrollY, setScrollY] = useState(new Animated.Value(0))
// const minScroll = 10
// const AnimatedHeaderHeight = getStatusBarHeight(true) + 50
// const negativeHeaderHeight =
//   Platform.OS === 'android'
//     ? -AnimatedHeaderHeight
//     : -(AnimatedHeaderHeight - getStatusBarHeight(true))
// const clampedScrollY = scrollY.interpolate({
//   inputRange: [minScroll, minScroll + 1],
//   outputRange: [0, 1],
//   extrapolateLeft: 'clamp',
// })
// const minusScrollY = Animated.multiply(clampedScrollY, -1)
// const translateY = Animated.diffClamp(minusScrollY, negativeHeaderHeight, 0)
// const opacity = translateY.interpolate({
//   inputRange: [negativeHeaderHeight, 0],
//   outputRange: [0, 1],
//   extrapolate: 'clamp',
// })

// const GET_HEADER_LOGO = () => {
//   switch (publication) {
//     case PublicationEnum.dp:
//       return DP_HEADER_LOGO
//     case PublicationEnum.street:
//       return ST_HEADER_LOGO
//     default:
//       return UTB_HEADER_LOGO
//   }
// }

// const [showMenu, setShowMenu] = useState(false);

// function switch_menu() {
//   setShowMenu(!showMenu);
// }

function HeaderMenu () {
  const GET_HEADER_LOGO = () => {
    switch (publication) {
      case PublicationEnum.dp:
        return DP_HEADER_LOGO
      case PublicationEnum.street:
        return ST_HEADER_LOGO
      default:
        return UTB_HEADER_LOGO
    }
  }
  
  const [showMenu, setShowMenu] = useState(false);
  
  const switch_menu = () => {
    console.log("switch menu");
    setShowMenu(!showMenu);
  }

  return (
    <View>
      {/* <Animated.View //heading publication animation
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            backgroundColor: '#fff',
            borderBottomColor: '#DDD',
            borderBottomWidth: 1,
          },
          { transform: [{ translateY: translateY }] },
        ]}
      ></Animated.View> */}
      <Animated.View //heading animation
        styles={[styles.animatedView, 
        {transform: [{ translateY: translateY }]}
        ]} 
      >
        {/* toggle menu publication buttons */}
        {/* <View style={{ height: 48, borderTopColor: '#DDD', 
          borderBottomColor: '#fff', alignItems: 'center', 
          borderWidth: 1}}>
          <Image
            source={GET_HEADER_TOP_LOGO()}
            style={{ flex: 1, resizeMode: 'contain', marginVertical: 10}}
          />
        </View>
        <View style={{ 
          height: 48, 
          borderTopColor: '#DDD', 
          borderBottomColor: '#fff',
          borderWidth: 1}}>
          <Image
            source={GET_HEADER_MID_LOGO()}
            style={{ flex: 1, resizeMode: 'contain', marginVertical: 10 }}
          />
        </View> */}
      <View style={styles.headers}>
        <Image
          source={GET_HEADER_LOGO()}
          style={{ flex: 1, resizeMode: 'contain', marginVertical: 10 }}
        />
      </View>
      <TouchableOpacity style={{ //toggle menu button
        position: 'absolute',
        // top: AnimatedHeaderHeight,
        alignSelf: 'center',
        zIndex: 999,
        }}
        onPress={switch_menu}
        >
        <MenuToggle publication={publication}/>
      </TouchableOpacity>
    </Animated.View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    // borderWidth: 1,
    width: 25,
    height: 25,
    margin: 10,
    borderRadius: 12,
    // borderColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    width: 0,
     height: 0,
     opacity: 0.7,
     backgroundColor: 'transparent',
     borderTopWidth: 10,
     borderRightWidth: 7,
     borderLeftWidth: 7,
     borderRightColor: 'transparent',
     borderLeftColor: 'transparent',
     justifyContent: 'center',
    alignItems: 'center'
  },
  animatedView: {
    // height: AnimatedHeaderHeight,
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 4,
    // opacity: opacity.interpolate({
    //   inputRange: [0, 0.5, 0.8, 1],
    //   outputRange: [0, 0, 1, 1],
    // }),
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight(true),
      },
      android: {
        paddingTop: getStatusBarHeight(true),
      },
    }),
  },
  headers: {
      height: 48, 
      borderTopColor: '#DDD', 
      borderBottomColor: '#fff',
      borderWidth: 1
  }
});

export default HeaderMenu;