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
import { connect } from 'react-redux'

import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { GEOMETRIC_REGULAR } from '../utils/fonts'
import { DP_HOME_SECTIONS_TITLE } from '../utils/constants'
import { REORDER_HOME_SECTIONS } from '../actions'
import {
  GET_HOME_SECTIONS,
  GET_HOME_SECTION_NAME,
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
  },

  sectionContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopColor: '#d4d4d4',
    borderTopWidth: 0.6,
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
    paddingHorizontal: 15,
    flex: 1,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 0.6,
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },

  description: {
    fontFamily: GEOMETRIC_REGULAR,
    paddingTop: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: '#808080',
  },
})

class ManageFeedScreenComp extends Component {
  constructor(props) {
    super(props)
    console.log(
      'manage feed screen comp',
      props.publication,
      props.reorderHomeSection
    )

    this.props = props
    this.state = {
      currData: GET_HOME_SECTIONS(props.publication),
    }
    this.newOrder = null
    this.instructions =
      'Press down and drag the sections to the order you would like to see them appear on the home page'
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
    // console.log('saving-', this.newData)
    await Storage.setItem(
      GET_HOME_FEED_ORDER_KEY(this.props.publication),
      this.newData
    )

    this.props.dispatch({
      type: REORDER_HOME_SECTIONS,
      publication: this.props.publication,
    })
  }

  orderItems = async () => {
    let storedOrder = await Storage.getItem(
      GET_HOME_FEED_ORDER_KEY(this.props.publication)
    )
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
        <View style={styles.sectionContainer}>
          <SortableList
            style={styles.list}
            data={this.state.currData}
            renderRow={this._renderRow}
            onReleaseRow={this.onReleaseRow}
          />
        </View>
        <Text style={styles.description}>{this.instructions}</Text>
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

const mapStateToProps = ({ publication, reorderHomeSection }) => ({
  publication,
  reorderHomeSection,
})

export const ManageFeedScreen = connect(mapStateToProps)(ManageFeedScreenComp)
ManageFeedScreen.navigationOptions = ({ route }) => ({
  title: 'Manage Feed',
  headerRight: () => (
    <Button title={'Save'} onPress={() => route.params.handleSave()} />
  ),
})
