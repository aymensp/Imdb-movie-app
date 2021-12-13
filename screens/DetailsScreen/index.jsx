import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import { API_KEY } from "@env";
import { styles } from "./styles";

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <View style={{ alignItems: "center" }}>
            <FontAwesome name="star" size={18} color="#f5c518" />
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {movie.imdbRating}
              </Text>
              <Text style={{ color: "gray", fontSize: 16 }}>/10</Text>
            </View>
            <Text style={{ color: "gray", fontSize: 16 }}>
              {movie.imdbVotes}
            </Text>
          </View>
          <Button
            icon={
              <FontAwesome
                name="star-o"
                size={18}
                color="#5799ef"
                style={{ marginTop: -5 }}
              />
            }
            title="Rate this"
            iconPosition="top"
            titleStyle={{ fontWeight: "500", fontSize: 20, color: "#5799ef" }}
            buttonStyle={{ backgroundColor: "transparent" }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              width: "20%",
              textAlign: "center",
            }}
          >
            Critic reviews
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsScreen;
