import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import MovieItem from "../../components/MovieItem";
import axios from "axios";
import { API_KEY } from "@env";
import {
  getRecentData,
  getReduxData,
  saveData,
  saveRecentData,
} from "../../slices/appSlice";
import { useSelector } from "react-redux";
import { styles } from "./styles";

const SearchScreen = ({ navigation }) => {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const [page, setPage] = useState(2);
  const [typeFilter, setTypeFilter] = useState("");

  //this is for getting the data from the redux store
  const ReduxData = useSelector(getReduxData);
  const recentData = useSelector(getRecentData);
  //console.log(ReduxData);
  console.log(typeFilter);
  //this function fetch the data from the omdb api
  const getData = () => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${typeFilter}`
      )
      .then((response) => {
        if (response.data.Error) {
          setData([]);
          setTypeFilter("");
          dispatch(
            saveData({
              data: [],
            })
          );
        } else {
          setData(response.data.Search);
          dispatch(
            saveData({
              data: response.data.Search,
            })
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  //I used useLayoutEffect to set the header of the screen using navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0,
        shadowColor: "transparent",
        height: 100,
      },
      headerTitle: () => (
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1024px-IMDB_Logo_2016.svg.png",
          }}
          resizeMode="contain"
          style={{ width: 90, height: "85%", borderRadius: 15 }}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 20,
            backgroundColor: "#ededed",
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center",
            width: 35,
            height: 35,
          }}
        >
          <Ionicons name="menu-outline" size={25} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 20 }}>
          <Avatar
            rounded
            source={{
              uri: "https://avatars.githubusercontent.com/u/49190728?v=4",
            }}
          ></Avatar>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    getData();
  }, [searchValue, typeFilter]);

  //keyextractor to generate keys for the list
  const _keyExtractor = (item, index) => index;

  //LoadMore is to fetch the next pages from the api
  const loadMore = () => {
    setLoading(true);
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${typeFilter}&page=${page}`
      )

      .then((response) => {
        setPage(page + 1);
        setData([...data, ...response.data.Search]);
        dispatch(
          saveData({
            data: [...data, ...response.data.Search],
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //navigate to details screen and passing the id and title to use them in the other screen
  const goToDetails = (item) => {
    navigation.navigate("Details", { id: item.imdbID, title: item.Title });
    dispatch(
      saveRecentData({
        recentData: [item, ...recentData],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListFooterComponent={
          data.length > 9 ? (
            <TouchableOpacity style={styles.footer} onPress={loadMore}>
              <Text style={styles.footerText}>Show More ...</Text>
              {loading ? <ActivityIndicator color="black" /> : false}
            </TouchableOpacity>
          ) : (
            false
          )
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Find Movies, TV shows and more ...</Text>
            <View style={styles.inputLabel}>
              <AntDesign name="search1" size={20} color="black" />
              <TextInput
                onChangeText={(value) => setsearchValue(value)}
                value={searchValue}
                style={styles.input}
                placeholder="Search IMDb ..."
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={
                  (typeFilter === ""
                    ? styles.selectedFilter
                    : styles.filterText)
                }
                onPress={() => setTypeFilter("")}
              >
                All
              </Text>
              <Text
                style={
                  typeFilter === "movie"
                    ? styles.selectedFilter
                    : styles.filterText
                }
                onPress={() => setTypeFilter("movie")}
              >
                Movies
              </Text>
              <Text
                style={
                  typeFilter === "series"
                    ? styles.selectedFilter
                    : styles.filterText
                }
                onPress={() => setTypeFilter("series")}
              >
                Series
              </Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <MovieItem key={item.imdbID} item={item} goToDetails={goToDetails} />
        )}
        keyExtractor={_keyExtractor}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
