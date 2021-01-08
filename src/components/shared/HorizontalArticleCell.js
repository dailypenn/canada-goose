import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { PublicationPrimaryColor } from '../../utils/branding'
import { DISPLAY_SERIF_BOLD, GEOMETRIC_REGULAR } from '../../utils/fonts'
import { TIME_AGO } from '../../utils/helperFunctions'

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: DISPLAY_SERIF_BOLD,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  byline: {
    color: '#888',
    fontFamily: GEOMETRIC_REGULAR,
    flex: 100,
    fontSize: 12,
    paddingTop: 10,
  },
  image: {
    width: 100,
    height: 75,
    padding: 15,
    borderRadius: 2,
    backgroundColor: '#000',
    alignSelf: 'flex-end',
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 5.46,
    //elevation: 9,
  },
  category: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 13,
    paddingBottom: 4,
  },
  hView: {
    //backgroundColor: 'rgba(220, 220, 220, 1.0)',
    flexDirection: 'row',
    padding: 20,
  },
  vView: {
    paddingRight: 15,
    flexShrink: 1,
    width: '80%',
  },
})

const categoryStyle = publication => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  }
}

export const HorizontalArticleCell = ({
  imageURL,
  category,
  title,
  timeAgo,
  publication,
}) => {
  return (
    <View>
      <View style={styles.hView}>
        <View style={styles.vView}>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.byline}>By Jonah Charlton • {timeAgo}</Text>
        </View>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: imageURL }} />
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#CCC',
          borderBottomWidth: 1,
          marginHorizontal: 20,
        }}
      />
    </View>
  )
}

//<Text style={categoryStyle(publication)}>{category}</Text>
// style = {{borderWidth: 1, borderColor: '#333', marginVertical: 10}}
