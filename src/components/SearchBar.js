import React, { useRef } from 'react'
import { View,  TextInput, StyleSheet, Dimensions, Animated, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  textInput: {
    fontSize: 18,
    color: '#000',
    flex: 1
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: 80
  }
})


// logic: the x icon should clear the text
// the clear button should clear the text & dismiss the keyboard
// when input is cleared, we should still show the keyboard but render the
// top sections instead
// refer to the App Store app search bar for details
const { width } = Dimensions.get('window')

// helpful: https://github.com/facebook/react-native/issues/25069

export const SearchBar = ({ setFilter }) => {
  const textInput = useRef()
  const searchWidth = new Animated.Value(width - 28)
  const cancelOpacity = new Animated.Value(0)
  const cancelOpacityRef = useRef(cancelOpacity)

  const startAnimation = () => {
    Animated.timing(searchWidth, {
      toValue: width - 28 - 80,
      duration: 300,
      useNativeDriver: false
    }).start()
    Animated.timing(cancelOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start()
  }

  const endAnimation = setFilter => {
    Animated.timing(cancelOpacityRef.current, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true
    }).start(() => {
      setFilter('')
    })
    Animated.timing(searchWidth, {
      toValue: width - 28,
      duration: 200,
      useNativeDriver: false
    }).start()
  }

  const inputAnimatedStyle = {
    width: searchWidth
  }

  const cancelAnimatedStyle = {
    opacity: cancelOpacity
  }

  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
      <Animated.View style={[SearchBarStyles.container, inputAnimatedStyle]}>
        <Ionicons
          name="search"
          size={20}
          style={SearchBarStyles.icon}
          color="#666"
        />
        <TextInput
          onChangeText={text => {
            setFilter(text)
            //setCurrSearchText(text)
          }}
          ref={textInput}
          placeholder="Search"
          autoCorrect={false}
          autoCapitalize="none"
          style={SearchBarStyles.textInput}
          clearButtonMode="always"
          returnKeyType="search"
          onFocus={startAnimation}
          //onEndEditing={endAnimation}
          placeholderTextColor="#666"
        />
      </Animated.View>
      <Animated.View style={[SearchBarStyles.button, cancelAnimatedStyle]}>
        <Button
          title="Cancel"
          onPress={() => {
            endAnimation(setFilter)
            textInput.current.clear()
            textInput.current.blur()
          }}
          color="#000"
        />
      </Animated.View>
    </View>
  )
}