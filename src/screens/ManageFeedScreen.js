import React, { useEffect, useState, useContext } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { DISPLAY_SERIF_BLACK, GEOMETRIC_REGULAR } from '../utils/fonts'
import { updateHomeSections } from '../actions'
import { GET_HOME_SECTIONS } from '../utils/helperFunctions'
import { PublicationPrimaryColor } from '../utils/branding'
import { ThemeContext } from '../components'

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.wallColor,
    borderTopWidth: 0.8,
    borderTopColor: theme.borderColor,
    flex: 1,
  },
  icon: {
    paddingEnd: 16,
  },
  regText: {
    color: theme.primaryTextColor,
    textTransform: 'capitalize',
    fontSize: 24,
    fontFamily: DISPLAY_SERIF_BLACK,
  },
  description: {
    fontFamily: GEOMETRIC_REGULAR,
    paddingTop: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: theme.secondaryTextColor,
  },
})

const HomeSectionsView = ({
  navigation,
  currPublication,
  settings,
  dispatch,
  itemHeight,
}) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  const homeSectionPreference = settings.homeSectionPreferences
    ? settings.homeSectionPreferences[currPublication]
    : null

  const ogData = homeSectionPreference
    ? homeSectionPreference
    : GET_HOME_SECTIONS(currPublication)

  const [sections, setSections] = useState(ogData)

  const updateItem = ({ data }) => {
    setSections(data)
    navigation.setParams({ sections: data })
  }

  useEffect(() => {
    navigation.setParams({ handleSave })
  }, [])

  const handleSave = async newSections => {
    if (newSections == ogData) return
    console.log('saving-', newSections)
    let savedSuccessfully = await Storage.setItem(
      GET_HOME_FEED_ORDER_KEY(currPublication),
      newSections
    )

    if (savedSuccessfully)
      dispatch(updateHomeSections(currPublication, newSections))
  }

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        paddingHorizontal: 20,
        height: itemHeight,
        flexDirection: 'row',
        backgroundColor: isActive
          ? PublicationPrimaryColor(currPublication)
          : theme.backgroundColor,
        alignItems: 'center',
        borderBottomWidth: 0.8,
        borderBottomColor: theme.borderColor,
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
          color: isActive ? 'white' : theme.primaryTextColor,
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  )

  return (
    <DraggableFlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(_, index) => `draggable-item-${index}`}
      onDragEnd={updateItem}
      scrollEnabled={false}
    />
  )
}

const ManageFeedScreenComp = ({
  navigation,
  route,
  currPublication,
  settings,
  dispatch,
}) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  console.log('MANAGE FEED SCREEN COMP:', currPublication)
  const instructions =
    'Press down and drag the sections to the order you would like to see them appear on the home page'
  const itemHeight = 80

  return (
    <View style={styles.container}>
      <View
        style={{
          height: GET_HOME_SECTIONS(currPublication).length * itemHeight,
        }}
      >
        <HomeSectionsView
          key={currPublication}
          navigation={navigation}
          route={route}
          currPublication={currPublication}
          settings={settings}
          dispatch={dispatch}
          itemHeight={itemHeight}
        />
      </View>

      <Text style={styles.description}>{instructions}</Text>
    </View>
  )
}

const mapStateToProps = ({ publication, settings }) => {
  const { currPublication } = publication

  return { currPublication, settings }
}

export const ManageFeedScreen = connect(mapStateToProps)(ManageFeedScreenComp)

ManageFeedScreen.navigationOptions = ({ route }) => ({
  title: 'Manage Feed',
  headerRight: () => (
    <Button
      title="Save"
      onPress={() => {
        route.params.handleSave(route.params.sections)
      }}
    />
  ),
})
