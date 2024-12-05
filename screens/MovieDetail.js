import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MovieDetails({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView style={localStyles.container}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={localStyles.poster}
        resizeMode="contain"
      />
      <Text style={localStyles.title}>{movie.title}</Text>
      <Text style={localStyles.releaseDate}>
        Release Date: {movie.release_date}
      </Text>
      <Text style={localStyles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14161a",
    padding: 20,
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1cc859",
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: "#767f88",
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    color: "#ddd",
  },
});
