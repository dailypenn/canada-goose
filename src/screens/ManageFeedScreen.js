import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { DISPLAY_SERIF_BLACK, GEOMETRIC_REGULAR } from '../utils/fonts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { updateHomeSections } from '../actions'
import { GET_HOME_SECTIONS } from '../utils/helperFunctions'
import { PublicationPrimaryColor } from '../utils/branding'
import { Animated } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  icon: {
    paddingEnd: 16,
  },

  regText: {
    textTransform: 'capitalize',
    fontSize: 24,
    fontFamily: DISPLAY_SERIF_BLACK,
  },

  description: {
    fontFamily: GEOMETRIC_REGULAR,
    paddingTop: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: '#808080',
  },
})

const ManageFeedScreenComp = ({
  navigation,
  route,
  publication,
  settings,
  dispatch,
}) => {
  const instructions =
    'Press down and drag the sections to the order you would like to see them appear on the home page'
  const itemHeight = 80

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: GET_HOME_SECTIONS(publication).length * itemHeight,
        }}
      >
        <HomeSectionsView
          key={publication}
          navigation={navigation}
          route={route}
          publication={publication}
          settings={settings}
          dispatch={dispatch}
          itemHeight={itemHeight}
        />
      </View>

      <Text style={styles.description}>{instructions}</Text>
    </View>
  )
}

const HomeSectionsView = ({
  navigation,
  publication,
  settings,
  dispatch,
  itemHeight,
}) => {
  const homeSectionPreference = settings.homeSectionPreferences
    ? settings.homeSectionPreferences[publication]
    : null

  const ogData = homeSectionPreference
    ? homeSectionPreference
    : GET_HOME_SECTIONS(publication)

  const [sections, setSections] = useState(ogData)

  const updateItem = ({ data }) => {
    setSections(data)
    navigation.setParams({ sections: data })
  }

  useEffect(() => {
    navigation.setParams({ handleSave: handleSave })
  }, [])

  const handleSave = async newSections => {
    if (newSections == ogData) return
    console.log('saving-', newSections)
    let savedSuccessfully = await Storage.setItem(
      GET_HOME_FEED_ORDER_KEY(publication),
      newSections
    )

    if (savedSuccessfully)
      dispatch(updateHomeSections(publication, newSections))
  }

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          paddingHorizontal: 20,
          height: itemHeight,
          flexDirection: 'row',
          backgroundColor: isActive
            ? PublicationPrimaryColor(publication)
            : 'white',
          alignItems: 'center',
          borderBottomWidth: 0.6,
          borderBottomColor: '#d4d4d4',
        }}
        onLongPress={drag}
      >
        <MaterialCommunityIcons
          name="drag"
          size={24}
          color={isActive ? 'white' : '#b1b1b1'}
          style={styles.icon}
        />
        <Text
          style={{
            ...styles.regText,
            color: isActive ? 'white' : 'black',
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <DraggableFlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(_, index) => `draggable-item-${index}`}
      onDragEnd={updateItem}
    />
  )
}

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const ManageFeedScreen = connect(mapStateToProps)(ManageFeedScreenComp)

ManageFeedScreen.navigationOptions = ({ route }) => ({
  title: 'Manage Feed',
  headerRight: () => (
    <Button
      title={'Save'}
      onPress={() => {
        route.params.handleSave(route.params.sections)
      }}
    />
  ),
})
