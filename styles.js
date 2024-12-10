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
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-between", 
    margin: 10, 
    backgroundColor: "rgba(0, 0, 0, 0.5)" ,
    padding: 10, 
    borderRadius: 8, 
  },
  moviePoster: {
    width: 100, 
    height: 150, 
    marginBottom: 5,
    alignSelf:"center",
  },
  movieTitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  noResults: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column", 
    justifyContent: "space-between", 
    width: "100%", 
  },
  watchlistButton: {
    backgroundColor: "#0000ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1, 
    marginHorizontal: 5, 
    marginBottom:7,
    marginTop:5,
  },
  favoriteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1, 
    marginHorizontal: 5, 
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
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
    textAlign:"center",
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
