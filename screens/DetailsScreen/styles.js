import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "white",
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
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
});
