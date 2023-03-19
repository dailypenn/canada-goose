import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { PublicationPrimaryColor } from '../utils/branding'


export const MenuToggle = ({ publication }) => {
  return (
    <View style={styles.container}> 
      <View style={[styles.arrow, lineStyle(publication)]}></View>
    </View>
    )
}

const lineStyle = publication => {
  return {
    ...{ borderColor: PublicationPrimaryColor(publication) },
    ...styles.coloredLine,
  }
}

// export default CustomButton;

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
});
