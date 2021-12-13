import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

const MovieItem = ({ item, goToDetails }) => {
  return (
    <ListItem bottomDivider onPress={() => goToDetails(item.imdbID,item.Title)}>
      <Image
        style={{
          width: "18%",
          height: 100,
          resizeMode: "cover",
        }}
        source={{
          uri: item.Poster,
        }}
      />
      <View>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.type}>{item.Type}</Text>
        <Text style={styles.year}>{item.Year}</Text>
      </View>
    </ListItem>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "600", lineHeight: 25 },
  year: { color: "gray" },
  type: { fontSize: 16, lineHeight: 25 },
});
