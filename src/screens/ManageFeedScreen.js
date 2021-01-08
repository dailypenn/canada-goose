import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  Easing,
  StyleSheet,
  Platform
} from 'react-native'
import SortableList from 'react-native-sortable-list'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { SettingsSectionHeader } from './SettingsScreen'
import { GEOMETRIC_REGULAR } from '../utils/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee'
  },

  sectionContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  icon: {
    paddingEnd: 10
  },

  list: {
    flex: 1
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    padding: 15,
    flex: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR
  }
})

const data = {
  0: { text: 'News' },
  1: { text: 'Opinion' },
  2: { text: 'Sports' },
  3: { text: 'Multimedia' }
}

export default class ManageFeedScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SettingsSectionHeader title="Home Section Ordering" />
        <View style={styles.sectionContainer}>
          <SortableList
            style={styles.list}
            data={data}
            renderRow={this._renderRow}
          />
        </View>
      </View>
    )
  }

  _renderRow = ({ data, active }) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {
  constructor(props) {
    super(props)

    this._active = new Animated.Value(0)

    this._style = {
      useNativeDriver: false,
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
        useNativeDriver: false
      }).start()
    }
  }

  render() {
    const { data, active } = this.props

    return (
      <Animated.View style={[styles.row, this._style]}>
        <MaterialCommunityIcons
          name="drag"
          size={24}
          color="#b1b1b1"
          style={styles.icon}
        />
        <Text style={styles.regText}>{data.text}</Text>
      </Animated.View>
    )
  }
}
