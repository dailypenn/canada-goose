import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  Easing,
  StyleSheet,
  Platform,
  Button,
} from 'react-native'
import { HOME_FEED_ORDER_KEY } from '../utils/storageKeys'
import AsyncStorage from '@react-native-community/async-storage'
import SortableList from 'react-native-sortable-list'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SettingsSectionHeader } from './SettingsScreen'
import { GEOMETRIC_REGULAR } from '../utils/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
  },

  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  icon: {
    paddingEnd: 10,
  },

  list: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    padding: 15,
    flex: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const data = ['News', 'Opinion', 'Sports', 'Multimedia']

const defaultOrder = [0, 1, 2, 3]

export default class ManageFeedScreen extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      currData: data,
    }
  }

  static navigationOptions = ({ route }) => {
    return {
      title: 'Manage Feed',
      headerRight: () => (
        <Button title={'Save'} onPress={() => route.params.handleSave()} />
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._handleSave.bind(this) })
  }

  _handleSave = async () => {
    console.log('SAVE')
    console.log(HOME_FEED_ORDER_KEY)
    console.log('current order - ', this.state.currData)

    try {
      await AsyncStorage.setItem(
        HOME_FEED_ORDER_KEY,
        JSON.stringify(this.state.currData)
      )
    } catch (err) {
      console.log(err)
    }
  }

  getDataForOrder = order => {
    const sorted = []
    order.forEach(i => {
      data.forEach((d, j) => {
        if (i == j) {
          sorted.push(d)
        }
      })
    })
    console.log(sorted)
    return sorted
  }

  onReleaseRow = (key, currentOrder) => {
    // console.log('current order - ', currentOrder)
    this.setState({ currData: this.getDataForOrder(currentOrder) })
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsSectionHeader title="Home Section Ordering" />
        <View style={styles.sectionContainer}>
          <SortableList
            style={styles.list}
            data={data}
            renderRow={this._renderRow}
            onReleaseRow={this.onReleaseRow}
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
                outputRange: [1, 1.1],
              }),
            },
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
        useNativeDriver: false,
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
        <Text style={styles.regText}>{data}</Text>
      </Animated.View>
    )
  }
}
