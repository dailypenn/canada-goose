// About Screen: Bios of developers and information about the app
import React from 'react'
import {
  Dimensions,
  Image,
  PickerIOSItem,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SectionGrid } from 'react-native-super-grid'

import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

const GOOSE_LOGO = require('../static/logos/dp-tech.png')

const { width } = Dimensions.get('window')
const PROFILE_PIC_SIZE = width / 5
const PROFILE_PIC_CELL_SIZE = width / 4

const TEAM_INTRO =
  "Hi, we're the tech department at the DP: a team of student software engineers!"

const MISSION =
  "Our name originates from migrating the DP to a mobile platform. After looking around campus, we decided the Canada Goose, a bird that flies south over winter and repped by everyone's winter jackets, was the perfect symbol for our operation"

const DESIGNERS = require('../json/designers.json')

const DEVELOPERS = require('../json/developers.json')

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  logo: {
    width: 270,
    height: 80,
  },

  sectionContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },

  intro: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    fontFamily: GEOMETRIC_BOLD,
  },

  mission: {
    paddingHorizontal: 60,
    fontSize: 12,
    fontFamily: GEOMETRIC_REGULAR,
  },

  meetTeam: {
    fontSize: 22,
    fontFamily: GEOMETRIC_BOLD,
    marginTop: 20,
    paddingVertical: 20,
  },

  profilePicImage: {
    paddingHorizontal: 20,
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: 10,
  },

  profilePicCell: {
    alignItems: 'center',
  },

  profileName: {
    fontSize: 12,
    color: '#808080',
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const ProfileCell = ({ name, pic }) => (
  <View style={styles.profilePicCell}>
    <Image style={styles.profilePicImage} source={{ uri: pic }} />
    <Text style={styles.profileName}>{name}</Text>
  </View>
)

const people_sections = [
  { title: 'Developers', data: DEVELOPERS },
  { title: 'Designers', data: DESIGNERS },
]

export const AboutScreen = () => (
  <SectionGrid
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
      console.log(item)
      return <ProfileCell name={item.name} pic={item.pic} />
    }}
    renderSectionHeader={({ section }) => (
      <View style={{ alignItems: 'center', backgroundColor: '#eee' }}>
        <Text style={styles.meetTeam}>Meet the {section.title}</Text>
      </View>
    )}
  />
)
