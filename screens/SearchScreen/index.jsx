import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import MovieItem from "../../components/MovieItem";
import axios from "axios";
import { API_KEY } from "@env";

const SearchScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setsearchValue] = useState("");
  const [page, setPage] = useState(2);
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
      .then((response) => {
        if (response.data.Error) {
          setData([]);
        } else {
          setData(response.data.Search);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [searchValue]);

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
            borderRadius: 20,
            alignItems: "center",
            width: 35,
            height: 35,
            justifyContent: "center",
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
  const _keyExtractor = (item, index) => index;
  const loadMore = () => {
    setLoading(true);
    //Service to get the data from the server to render
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&page=${page}`
      )
      //Sending the currect offset with get request
      .then((response) => {
        //Successful response
        setPage(page + 1);
        //Increasing the offset for the next API call
        setData([...data, ...response.data.Search]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const goToDetails = (id,title) => {
    navigation.navigate("Details", {id,title});
  };
  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        ListFooterComponent={
          data.length > 0 ? (
            <TouchableOpacity style={styles.footer} onPress={loadMore}>
              <Text style={styles.footerText}>Show More ...</Text>
              {loading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : (
                false
              )}
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
                placeholder="Search movies ..."
                placeholderTextColor="gray"
              />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginVertical: 20,
    width: "80%",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    fontSize: 20,
    margin: 15,
    flex: 1,
  },
  inputLabel: {
    backgroundColor: "#ededed",
    height: 55,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  footer: {
    height: 80,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
  },
  footerText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
