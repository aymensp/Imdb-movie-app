import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { API_KEY } from "@env";
//import categories from '../assets/data/categories'

const DetailsScreen = ({ navigation, route }) => {
  const { id, title } = route.params;
  const [movie, setmovie] = useState({});
  const [genre, setGenre] = useState("");
  const getData = () => {
    axios
      .get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((response) => {
        setmovie(response.data);
        setGenre(response.data.Genre);
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        height: 100,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },

      headerLeft: () => (
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={30}
          color="black"
          style={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoSection}>
          <Text style={styles.textInfo}>{movie.Type}</Text>
          <Text style={styles.textInfo}>{movie.Year}</Text>
          <Text style={styles.textInfo}>{movie.Rated}</Text>
        </View>
        <Image
          source={{ uri: movie.Poster }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoSection}>
          {genre.split(", ").map((word) => (
            <Text key={word} style={styles.genreText}>
              {word}
            </Text>
          ))}
        </View>
        <Text style={styles.PlotText}>{movie.Plot}</Text>
      </View>
      <View style={styles.divider} />
      <View style={{ paddingHorizontal: 20 }}>
        {movie.totalSeasons ? (
          <TouchableOpacity style={styles.seasonsView}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Season Guide
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.seasonsText}>
                {movie.totalSeasons + " Seasons"}
              </Text>
              <AntDesign name="right" size={20} color="#d6d4d4" />
            </View>
          </TouchableOpacity>
        ) : (
          false
        )}

        <Button
          icon={<Ionicons name="add" size={25} color="black" />}
          title="Add to Watchlist"
          iconPosition="left"
          titleStyle={styles.TextButton}
          buttonStyle={styles.button}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.ratingView}>
        <Button
          icon={<FontAwesome name="star" size={18} color="#f5c518" />}
          title={movie.imdbRating + "/10"}
          iconPosition="top"
          titleStyle={{ fontWeight: "bold", fontSize: 20, color: "black" }}
          buttonStyle={{ backgroundColor: "transparent" }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            width: "20%",
            textAlign: "center",
          }}
        >
          Critic reviews
        </Text>
      </View>
    </ScrollView>
  );
};
export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    height: 350,
  },
  infoSection: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 15,
  },
  textInfo: {
    fontSize: 20,
    color: "gray",
    fontWeight: "500",
    marginRight: 10,
  },
  list: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "400",
    fontSize: 40,
    marginTop: 18,
  },
  genreText: {
    padding: 4,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#d6d4d4",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#f5c518",
    height: 45,
    justifyContent: "flex-start",
  },
  TextButton: {
    fontSize: 20,
    color: "black",
    marginLeft: 10,
  },
  PlotText: {
    fontSize: 18,
    color: "gray",
  },
  divider: {
    borderWidth: 0.5,
    width: "100%",
    marginVertical: 14,
    borderColor: "#ededed",
  },
  seasonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seasonsText: {
    fontSize: 16,
  },
  ratingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
  },
});
