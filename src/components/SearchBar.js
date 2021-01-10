import React from 'react'
import { View,  TextInput, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    borderRadius: 13,
    flexDirection: 'row',
    //paddingBottom: 10,
    marginHorizontal: 20,
    marginTop: 10
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 10
    //backgroundColor: '#f8f4f4',
  },
  textInput: {
    fontSize: 18,
    //backgroundColor: '#f8f4f4',
    //borderRadius: 13,
    //flexDirection: 'row',
    flex: 1
  },
  button: {
    paddingHorizontal: 10,
    margin: 10
    //backgroundColor: 'white',
    //marginLeft: 'auto'
  }
})


// logic: the x icon should clear the text
// the clear button should clear the text & dismiss the keyboard
// when input is empty, we should still show the keyboard but render the
// top sections instead
// refer to the App Store app search bar for details
export const SearchBar = ({ setFilter }) => (
  <View style={SearchBarStyles.container}>
    <Ionicons
      name="search"
      size={20}
      style={SearchBarStyles.icon}
      color="#AAA"
    />
    <TextInput
      onChangeText={text => {
        setFilter(text)
      }}
      placeholder="Search"
      autoCorrect={false}
      autoCapitalize="none"
      style={SearchBarStyles.textInput}
      clearButtonMode="always"
      returnKeyType="search"
    />
  </View>
)