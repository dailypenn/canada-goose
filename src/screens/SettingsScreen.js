import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DISPLAY_SERIF_BLACK, GEOMETRIC_REGULAR } from '../utils/fonts'
import { SafeAreaView } from 'react-native'
import { PublicationPrimaryColor } from '../utils/branding'
import { PublicationEnum } from '../utils/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  title: {
    fontFamily: DISPLAY_SERIF_BLACK, //GEOMETRIC_BOLD,
    fontSize: 28,
    lineHeight: 40,
  },
  header_safe_area: {
    zIndex: 1000,
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  iconView: {
    justifyContent: 'center',
    paddingRight: 15,
  },

  icon: {
    backgroundColor: '#68a0af',
    borderRadius: 3,
    padding: 4,
  },

  textView: {
    paddingVertical: 10,
    flexDirection: 'row',
  },

  divider: {
    height: 0.6,
    backgroundColor: '#d4d4d4',
  },

  spacer: {
    flex: 1,
    flexDirection: 'row',
  },

  // sectionHeaderTitle: {
  //   fontFamily: GEOMETRIC_BOLD,
  //   color: '#a1a1a1',
  //   fontSize: 14,
  //   paddingVertical: 5,
  //   textTransform: 'uppercase',
  // },

  // sectionHeaderView: {
  //   flexDirection: 'row',
  //   paddingHorizontal: 15,
  //   height: 20,
  // },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const settings_sections = [
  {
    id: 'account section',
    name: 'Personal',
    items: [
      {
        id: 'manage feed cell',
        icon: 'list',
        // color: '#c4c4c4',

        color: '#007aff',
        name: 'Manage Feed',
        screenName: 'ManageFeedScreen',
        props: {},
      },
      {
        id: 'saved article cell',
        icon: 'bookmarks',
        // color: '#c4c4c4',

        color: '#f6a327',
        name: 'Bookmarked Articles',
        screenName: 'SavedArticles',
        props: {},
      },
    ],
  },
  {
    id: 'settings section',
    name: 'Settings',
    items: [
      {
        id: 'noti cell',
        icon: 'notifications',
        // color: '#c4c4c4',

        // color: '#4bd963',
        // color: '#e14138',
        color: '#f9423b',

        name: 'Notifications',
        screenName: 'Notification',
        props: {},
      },
      {
        id: 'privacy cell',
        icon: 'shield-checkmark',
        // color: '#007aff',
        color: '#66d464',
        // color: '#c4c4c4',

        name: 'Privacy',
        screenName: 'Privacy',
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
        icon: 'people',
        color: '#fe3257',
        color: '#c4c4c4',

        name: 'Operation Canada Goose x Jay',
        screenName: 'About',
        props: {},
      },
      {
        id: 'dp cell',
        icon: 'newspaper',
        color: '#4d49de',
        // color: '#c4c4c4',
        color: PublicationPrimaryColor(PublicationEnum.dp),

        name: 'The Daily Pennsylvanian',
        screenName: 'WebView',
        props: { link: 'https://thedp.com' },
      },
      {
        id: 'street cell',
        icon: 'newspaper',
        color: PublicationPrimaryColor(PublicationEnum.street),

        // color: '#4d49de',
        // color: '#c4c4c4',

        name: '34th Street',
        screenName: 'WebView',
        props: { link: 'https://34st.com' },
      },
      {
        id: 'utb cell',
        icon: 'newspaper',
        color: PublicationPrimaryColor(PublicationEnum.utb),
        // color: '#4d49de',
        // color: '#c4c4c4',

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
        <View style={styles.iconView}>
          <View style={{ ...styles.icon, backgroundColor: item.color }}>
            <Ionicons name={item.icon} size={14} color="white" />
          </View>
        </View>
        <Text style={styles.regText}>{item.name}</Text>
        <View style={styles.spacer} />
        <Ionicons name="chevron-forward" size={16} color="#c4c4c4" />
      </View>
      {/* <View style={styles.divider} /> */}
    </View>
  )
}

const SettingsSectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderView}>
    {/* <Text style={styles.sectionHeaderTitle}>{title}</Text> */}
  </View>
)

const SettingsSection = ({ navigateToScreen, name, items }) => (
  <View>
    <View style={{ ...styles.divider, marginTop: 20 }} />
    <SettingsSectionHeader title={name} />
    {items.map((el, i) => (
      <TouchableOpacity
        key={el.id}
        activeOpacity={1}
        onPress={() => navigateToScreen(el.screenName, el.props)}
      >
        <View>
          <SettingsCell item={el} />
          <View
            style={{
              ...(i != items.length - 1 ? styles.divider : {}),
              marginLeft: 45,
            }}
          />
        </View>
      </TouchableOpacity>
    ))}
    <View style={styles.divider} />
  </View>
)

export const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.header_safe_area}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          <Text style={styles.title}>Account</Text>
        </View>
      </View>
      {settings_sections.map((l, i) => (
        <SettingsSection
          key={l.id}
          name={l.name}
          items={l.items}
          navigateToScreen={(screen, props) =>
            navigation.navigate(screen, props)
          }
        />
      ))}
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Account</Text>

    //   {settings_sections.map((l, i) => (
    //     <SettingsSection
    //       key={l.id}
    //       name={l.name}
    //       items={l.items}
    //       navigateToScreen={(screen, props) =>
    //         navigation.navigate(screen, props)
    //       }
    //     />
    //   ))}
    // </View>
  )
}
