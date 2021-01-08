import React from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { PublicationPrimaryColor } from '../../utils/branding'
import { LinearGradient } from 'expo-linear-gradient'
import { CategoryTag } from './CategoryTag'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../../utils/fonts'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 0.8,
  },

  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
    resizeMode: 'contain',
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
  },

  textRow: {
    flexDirection: 'row',
  },

  title: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 12,
    flexShrink: 1,
    lineHeight: 24,
  },

  category: {
    fontFamily: GEOMETRIC_BOLD,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
  },

  time: {
    fontFamily: GEOMETRIC_REGULAR,
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 9,
  },
  spacer: {
    flex: 1,
  },
})

const categoryStyle = publication => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  }
}

const VerticalArticleCard = ({
  category,
  time,
  title,
  imageUrl,
  publication,
}) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: imageUrl }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
        </ImageBackground>
      </View>
    </View>
  )
}

export default VerticalArticleCard

/*

<Text style={categoryStyle(publication)}>{category}</Text>

<ImageBackground style={styles.imageBackground} source={{ uri: imageUrl }}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.spacer} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={categoryStyle(publication)}>{category}</Text>
        <View style={styles.spacer} />
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.headline} numberOfLines={5}>
        {title}
      </Text>
    </ImageBackground>
*/

/*

import React from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { PublicationPrimaryColor } from '../../utils/branding'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 7,
    overflow: 'hidden',
  },

  imageBackground: {
    flex: 1,
    height: 180,
    paddingHorizontal: 15,
  },

  textRow: {
    flexDirection: 'row',
  },

  title: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 16,
    flexShrink: 1,
    paddingTop: 5,
  },

  category: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.75,
  },

  time: {
    fontFamily: 'AvenirNextCondensed-Regular',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 9,
  },
  spacer: {
    flex: 1,
  },
})

const categoryStyle = (publication) => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  }
}

const VerticalArticleCard = ({
  category,
  time,
  title,
  imageUrl,
  publication,
}) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: imageUrl }}
        ></ImageBackground>
        <View style={{ padding: 15, height: 130 }}>
          <View style={styles.textRow}>
            <Text style={categoryStyle(publication)}>{category}</Text>
            <View style={styles.spacer} />
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text numberOfLines={5} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default VerticalArticleCard
*/
