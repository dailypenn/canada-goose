import React from 'react'
import { View, Text } from 'react-native'
import { GEOMETRIC_REGULAR } from '../utils/fonts'

export const ComingSoonView = ({ blurb }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    }}
  >
    <Text style={{ fontFamily: GEOMETRIC_REGULAR, textAlign: 'center' }}>
      {blurb}
    </Text>
  </View>
)
