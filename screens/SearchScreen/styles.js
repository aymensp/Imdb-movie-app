import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  filterText: {
    fontSize: 20,
    color: "gray",
  },
  selectedFilter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
