import React from "react";
import { Text, View, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { styles } from "./styles";
const MovieItem = ({ item, goToDetails }) => {
  return (
    <ListItem bottomDivider onPress={() => goToDetails(item)}>
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
      <View style={styles.detailsSection}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.type}>{item.Type}</Text>
        <Text style={styles.year}>{item.Year}</Text>
      </View>
    </ListItem>
  );
};

export default MovieItem;
