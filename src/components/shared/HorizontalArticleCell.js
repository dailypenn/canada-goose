import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { PublicationPrimaryColor } from '../../utils/branding'

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: 'HelveticaNeue-CondensedBold',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  byline: {
    color: '#888',
    fontFamily: 'HelveticaNeue',
    flex: 1,
    fontSize: 11,
    paddingTop: 10,
  },
  image: {
    width: 100,
    height: 75,
    padding: 15,
    borderRadius: 0,
    backgroundColor: '#000',
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 5.46,
    elevation: 9,
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
    //marginVertical: 10,
  },
  vView: {
    //paddingHorizontal: 15,
    paddingRight: 20,
    flexShrink: 1,
  },
})

const categoryStyle = (publication) => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  }
}

export const HorizontalArticleCell = ({
  imageURL,
  category,
  title,
  publication,
}) => {
  return (
    <View>
      <View style={styles.hView}>
        <View style={styles.vView}>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.byline}>
            By Jonah Charlton • 1 hour ago
          </Text>
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