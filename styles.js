import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  // Containers
  wrapper: {
    backgroundColor: "#8f091b",
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#C7253E",
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
    marginHorizontal: 15,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#E85C0D",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  filterContainer: {
    marginLeft: 15,
    backgroundColor: "#E85C0D",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  moviePoster: {
    width: 100,
    height: 150,
    marginBottom: 75,
    alignSelf: "center",
  },
  movieTitle: {
    color: "#FABC3F",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  loadingText: {
    color: "#FABC3F",
    fontSize: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  darkText: {
    color: "black",
  },
  lightText: {
    color: "ghostwhite",
  },
  topTenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FABC3F",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  movieItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "rgba(54, 54, 54, 0.5)",
    borderRadius: 15,
    maxWidth: 125,
    alignItems: "center",
    marginLeft: 30,
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

  // ================= //
  card: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#117b36",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginTop: -50,
  },
  poster: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginTop: -100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: "15%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "125%",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  buttonsContainer2: {
    position: "absolute",
    bottom: "25%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "150%",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },

  watchlistButton: {
    //In Search
    ...Platform.select({
      ios: {
        paddingTop: 8,
        backgroundColor: "#B43E0E",
        borderRadius: 5,
        alignItems: "center",
        width: "85%",
        height: 30,
        marginBottom: 5,
      },
      android: {
        backgroundColor: "#B43E0E",
        borderRadius: 5,
        alignItems: "center",
        width: "85%",
        marginBottom: 5,
      },
      web: {
        paddingVertical: 8,
        backgroundColor: "#B43E0E",
        borderRadius: 5,
        alignItems: "center",
        width: "60%",
        height: 30,
        marginBottom: 5,
      },
    }),
  },
  favoriteButton: {
    ...Platform.select({
      ios: {
        paddingTop: 9,
        backgroundColor: "#E05F1D",
        borderRadius: 5,
        alignItems: "center",
        width: "85%",
        height: 30,
      },
      android: {
        paddingTop: 9,
        backgroundColor: "#E05F1D",
        borderRadius: 5,
        alignItems: "center",
        width: "85%",
        height: 30,
      },
      web: {
        paddingTop: 8,
        backgroundColor: "#E05F1D",
        borderRadius: 5,
        alignItems: "center",
        width: "60%",
        height: 30,
      },
    }),
  },
  disabledButton: {
    backgroundColor: "gray",
    opacity: 0.7,
  },
  noResults: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#E85C0D",
    padding: 8,
    borderRadius: 5,
    marginRight: 15,
  },
  deleteButtonText: {
    color: "black",
    fontSize: 14,
  },
  test: {
    // Used for the Swipe message on the swipers
    position: "absolute",
    top: "5%",
    color: "ghostwhite",
  },
  icon: {
    position: "absolute",
  },
});
