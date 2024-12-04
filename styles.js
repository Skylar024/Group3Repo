import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  // Containers
  wrapper: {
    backgroundColor: "#21252b",
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#12161a",
    width: "90%",
    borderRadius: 35,
    paddingTop: 30,

    ...Platform.select({
      ios: { marginTop: 30 },
      android: { marginTop: StatusBar.currentHeight },
      web: {
        marginTop: 25,
      },
    }),
  },
  searchAndFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#767f88",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  filterContainer: {
    marginLeft: 15,
    backgroundColor: "#767f88",
    height: 50,
    width: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  movieContainer: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  movieItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(54, 54, 54, 0.5)",
    borderRadius: 15,
    margin: 5,
    padding: 8,
    maxWidth: 150,
  },
  movieImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  movieTitle: {
    marginTop: 5,
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  movieListContainer: {
    flex: 1,
    marginTop: 10,
  },

  // Search Styles
  searchMovieItem: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchMoviePoster: {
    width: 100,
    height: 150,
    marginBottom: 10,
    alignSelf: "center",
  },
  searchMovieTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  noResults: {
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },

  // Button Styles
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  watchlistButton: {
    backgroundColor: "#0000ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  favoriteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "white",
  },

  // Text Styles
  darkText: {
    color: "black",
  },
  lightText: {
    color: "ghostwhite",
  },
  topTenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#767f88",
    textAlign: "center",
    marginBottom: 20,
  },

  movieItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "rgba(54, 54, 54, 0.5)", // Transparent background for each row
    borderRadius: 15,
    maxWidth: 125,
    alignItems: "center",
    marginLeft: 30,
  },
  movieTitle: {
    fontSize: 14,
  },
  movieImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
    borderWidth: 2,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
});
