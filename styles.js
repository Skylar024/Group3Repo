import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  // Containers
  wrapper: {
    backgroundColor: "#21252b",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    
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
      ios: { marginTop: 30,
      },
      android: { marginTop: StatusBar.currentHeight },
      web: {
        marginTop: 25,
      },
    }),
  },
  searchAndFilterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    marginVertical: 15,

  },
  searchBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#767f88",
    height: 50,
    borderRadius: 15,
    marginLeft: 30,

  },
  filterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#767f88",
    height: 50,
    maxWidth: 50,
    borderRadius: 15,
    marginHorizontal: 30,

  },
  movieContainer: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 10,
    //width: "100%",

  },
  
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    alignSelf: "center",
  },
  movieItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "rgba(54,54,54, 0.5)", //Transparent background for eahc row
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
