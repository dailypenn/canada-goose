import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { PublicationPrimaryColor } from "../../utils/branding";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 7,
    overflow: "hidden",
  },

  imageBackground: {
    flex: 1,
    height: 180,
    paddingHorizontal: 15,
  },

  textRow: {
    flexDirection: "row",
  },

  title: {
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 16,
    flexShrink: 1,
    paddingTop: 5,
  },

  category: {
    fontFamily: "HelveticaNeue-CondensedBold",
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0.75,
  },

  time: {
    fontFamily: "AvenirNextCondensed-Regular",
    textTransform: "uppercase",
    fontSize: 14,
  },
  shadow: {
    shadowColor: "#000",
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
});

const categoryStyle = (publication) => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  };
};

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
  );
};

export default VerticalArticleCard;
