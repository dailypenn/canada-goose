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
import SortableList from 'react-native-sortable-list'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { SettingsSectionHeader } from './SettingsScreen'
import { HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { GEOMETRIC_REGULAR } from '../utils/fonts'
import { HOME_SECTIONS } from '../utils/constants'

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

export class ManageFeedScreen extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      currData: Object.keys(HOME_SECTIONS),
    }
    this.newOrder = null
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
    this.orderItems()
    this.props.navigation.setParams({ handleSave: this._handleSave.bind(this) })
  }

  _handleSave = async () => {
    if (this.newOrder == null) return
    var sorted = []
    this.newOrder.forEach(i => {
      this.state.currData.forEach((d, j) => {
        if (i == j) {
          sorted.push(d)
        }
      })
    })
    this.newData = sorted
    if (this.newData == this.state.currData) return

    await Storage.setItem(HOME_FEED_ORDER_KEY, this.newData)
  }

  orderItems = async () => {
    let storedOrder = await Storage.getItem(HOME_FEED_ORDER_KEY)
    if (storedOrder != null) {
      this.setState({ currData: storedOrder })
    }
  }

  onReleaseRow = (key, currentOrder) => {
    this.newOrder = currentOrder
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsSectionHeader title="Home Section Ordering" />
        <View style={styles.sectionContainer}>
          <SortableList
            style={styles.list}
            data={this.state.currData}
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