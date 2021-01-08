import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textView: {
    paddingVertical: 10,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 0.6,
    flexDirection: 'row',
  },

  divider: {
    paddingHorizontal: 15,
    borderColor: '#fff',
    borderWidth: 1,
  },

  spacer: {
    flex: 1,
    flexDirection: 'row',
  },

  sectionHeaderTitle: {
    fontFamily: GEOMETRIC_BOLD,
    color: '#a1a1a1',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    textTransform: 'uppercase',
  },

  sectionHeaderView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const sections = [
  {
    id: 'account section',
    name: 'Account',
    items: [
      {
        id: 'noti cell',
        name: 'Notifications',
        screenName: 'Notification',
        props: {},
      },
      {
        id: 'privacy cell',
        name: 'Privacy',
        screenName: 'Privacy',
        props: {},
      },
      {
        id: 'manage feed cell',
        name: 'Manage Feed',
        screenName: 'ManageFeedScreen',
        props: {},
      },
    ],
  },
  {
    id: 'features section',
    name: 'Features',
    items: [
      {
        id: 'about cell',
        name: 'About',
        screenName: 'About',
        props: {},
      },
    ],
  },
  {
    id: 'links section',
    name: 'Links',
    items: [
      {
        id: 'dp cell',
        name: 'The Daily Pennsylvanian',
        screenName: 'WebView',
        props: { link: 'https://thedp.com' },
      },
      {
        id: 'street cell',
        name: '34th Street',
        screenName: 'WebView',
        props: { link: 'https://34st.com' },
      },
      {
        id: 'utb cell',
        name: 'Under the Button',
        screenName: 'WebView',
        props: { link: 'https://underthebutton.com' },
      },
    ],
  },
]

const SettingsCell = ({ item }) => {
  return (
    <View style={styles.cell}>
      <View style={styles.textView}>
        <Text style={styles.regText}>{item.name}</Text>
        <View style={styles.spacer} />
        <Entypo name="chevron-right" size={16} color="#c4c4c4" />
      </View>
    </View>
  )
}

const SettingsSectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderView}>
    <Text style={styles.sectionHeaderTitle}>{title}</Text>
  </View>
)

const SettingsSection = ({ navigateToScreen, name, items }) => {
  return (
    <View>
      <SettingsSectionHeader title={name} />
      {items.map((l, i) => (
        <TouchableOpacity
          key={l.id}
          activeOpacity={1}
          onPress={() => {
            navigateToScreen(l.screenName, l.props)
          }}
        >
          <SettingsCell item={l} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

class SettingsView extends Component {
  constructor(props) {
    super(props)
    this.navigateToScreen = this.navigateToScreen.bind(this)
    this.publicationState = this.props.publicationState
  }

  navigateToScreen(screenName, props) {
    this.props.navigation.navigate(screenName, props)
  }

  render() {
    return (
      <View style={styles.container}>
        {sections.map((l, i) => (
          <SettingsSection
            key={l.id}
            name={l.name}
            items={l.items}
            navigateToScreen={this.navigateToScreen}
          />
        ))}
      </View>
    )
  }
}

const SettingsScreen = ({ navigation, screenProps }) => {
  const publicationState = screenProps.state

  return (
    <View>
      <SettingsView
        navigation={navigation}
        publicationState={publicationState}
      />
    </View>
  )
}

export { SettingsScreen, SettingsSectionHeader }
