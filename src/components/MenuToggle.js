import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export const MenuToggle = () => {
  return (
    <View style={styles.container}> 
      <Text>  v </Text>        
    </View>
    )
}

// export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    width: 25,
    position: "absolute",
    height: 20,
    margin: 10,
  },
});
