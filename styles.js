import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topTenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  movieItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  movieTitle: {
    fontSize: 18,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
});
