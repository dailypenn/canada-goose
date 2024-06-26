// About Screen: Bios of developers and information about the app
import React, { useContext } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SectionGrid } from 'react-native-super-grid'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ThemeContext } from '../components'
import DEVELOPERS from "../json/developers"
import DESIGNERS from "../json/designers"

const GOOSE_LOGO = require('../static/logos/dpdevelopers-logo.png')
const { width } = Dimensions.get('window')
const PROFILE_PIC_SIZE = width / 5
const PROFILE_PIC_CELL_SIZE = width / 4
const TEAM_INTRO =
  "Hi, we're the engineering department at the DP, a team of student developers and designers!"
const MISSION =
  "Tasked with migrating content from the harsh winter environment of print publication to the temperate oasis of mobile communication, DP Tech faced a challenge like no other: what do we name our objective? It wasn't until we passed the hundreth person with an overpriced winter jacket that we found an animal which so accurately captured the migratory nature of our mission and Penn culture as a whole. And so, equipped with a fitting name, we hatched our plan.\n\nOperation Canada Goose is here to bring you the best of The Daily Pennyslvanian, straight to your down jacket pockets."

const createStyles = (theme) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
  },
  logo: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
  },
  sectionContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  intro: {
    color: theme.primaryTextColor,
    paddingHorizontal: 40,
    paddingBottom: 30,
    fontFamily: GEOMETRIC_BOLD,
  },
  mission: {
    color: theme.primaryTextColor,
    paddingHorizontal: 40,
    fontSize: 12,
    fontFamily: GEOMETRIC_REGULAR,
  },
  meetTeam: {
    color: theme.primaryTextColor,
    fontSize: 22,
    fontFamily: GEOMETRIC_BOLD,
    marginTop: 20,
    paddingVertical: 20,
  },
  profilePicImage: {
    paddingHorizontal: 20,
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: 1000,
  },
  profilePicCell: {
    paddingBottom: 5,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 12,
    color: theme.secondaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
  },
  sectionHeader: {
    alignItems: 'center',
    backgroundColor: theme.backgroundColor
  }
});

const ProfileCell = ({ name, pic }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  return (
    <View style={styles.profilePicCell}>
      <Image style={styles.profilePicImage} source={pic} />
      <View style={{ paddingVertical: 4 }}>
        <Text style={styles.profileName}>{name}</Text>
      </View>
    </View>
  )
}

const people_sections = [
  { title: 'Developers', data: DEVELOPERS },
  { title: 'Designers', data: DESIGNERS },
]

export const AboutScreen = () => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  return (
    <SectionGrid
      backgroundColor={theme.backgroundColor}
      ListHeaderComponent={
        <>
          <View style={{ paddingVertical: 40 }}>
            <Image style={styles.logo} source={GOOSE_LOGO} />
          </View>
          <Text style={styles.intro}>{TEAM_INTRO}</Text>
          <Text style={styles.mission}>{MISSION}</Text>
        </>
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponentStyle={styles.container}
      itemDimension={PROFILE_PIC_CELL_SIZE}
      sections={people_sections}
      renderItem={({ item }) => {
        return <ProfileCell name={item.name} pic={item.pic} />
      }}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.meetTeam}>Meet the {section.title}</Text>
        </View>
      )}
    />
  )
}
