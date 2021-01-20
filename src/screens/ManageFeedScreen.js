import React, { Component, useEffect, useState } from 'react'
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
import { updateHomeSections, UPDATE_HOME_SECTIONS } from '../actions'
import { GET_HOME_SECTIONS } from '../utils/helperFunctions'

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

class ManageFeedForPublication extends Component {
  constructor(props) {
    super(props)
    const {
      navigation,
      publication,
      homeSectionPreferences,
      dispatch,
    } = this.props

    this.navigation = navigation
    this.publication = publication
    this.homeSectionPreferences = homeSectionPreferences
    this.dispatch = dispatch

    // console.log('MANAGE FEED FOR PUBLICATION', publication)

    this.currData = this.homeSectionPreferences
      ? this.homeSectionPreferences[this.publication]
      : GET_HOME_SECTIONS(this.publication)

    this.newOrder = null
    this.instructions =
      'Press down and drag the sections to the order you would like to see them appear on the home page'
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._handleSave })
  }

  _handleSave = async () => {
    if (this.newOrder == null) return
    var sorted = []
    this.newOrder.forEach(i => {
      this.currData.forEach((d, j) => {
        if (i == j) {
          sorted.push(d)
        }
      })
    })
    this.newData = sorted
    if (this.newData == this.currData) return
    // console.log('saving-', this.newData)
    await Storage.setItem(
      GET_HOME_FEED_ORDER_KEY(this.props.publication),
      this.newData
    )

    this.props.dispatch(
      updateHomeSections(this.props.publication, this.newData)
    )
  }

  render() {
    return (
      <View style={styles.container} key={this.publication}>
        <View style={styles.sectionContainer}>
          <SortableList
            style={styles.list}
            data={this.currData}
            renderRow={({ data, active }) => {
              return <Row data={data} active={active} />
            }}
            onReleaseRow={(key, currentOrder) => {
              this.newOrder = currentOrder
            }}
          />
        </View>
        <Text style={styles.description}>{this.instructions}</Text>
      </View>
    )
  }
}

const ManageFeedScreenComp = ({
  navigation,
  publication,
  settings,
  dispatch,
}) => {
  // console.log('MANAGE FEED SCREEN COMP', publication)
  return (
    <ManageFeedForPublication
      key={publication}
      navigation={navigation}
      publication={publication}
      homeSectionPreferences={settings.homeSectionPreferences}
      dispatch={dispatch}
    />
  )
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

  componentDidUpdate(prevProps) {
    if (this.props.active != prevProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(this.props.active),
        useNativeDriver: true,
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

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const ManageFeedScreen = connect(mapStateToProps)(ManageFeedScreenComp)
ManageFeedScreen.navigationOptions = ({ route }) => ({
  title: 'Manage Feed',
  headerRight: () => (
    <Button title={'Save'} onPress={() => route.params.handleSave()} />
  ),
})
