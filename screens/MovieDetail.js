import React from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function MovieDetail({ route }) {
  const { movie } = route.params;

  // Provide a link to TMDB
  const handleTMDBPress = () => {
    const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;
    Linking.openURL(movieUrl);
  };

  // Movie Detail Screen
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

      {/* TMDB Link */}
      <TouchableOpacity onPress={handleTMDBPress}>
        <Text style={[localStyles.link, { marginBottom: 20 }]}>
          View on TMDB
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#730000",
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
    color: "#FABC3F",
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
    marginBottom: 20,
  },
  link: {
    color: "#FABC3F",
    textDecorationLine: "underline",
  },
});
