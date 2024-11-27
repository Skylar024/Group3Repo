import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../styles";
import { getTopTenMovies } from "../api";
import { Image } from "react-native";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const topMovies = await getTopTenMovies();
      setMovies(topMovies);
    }

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topTenTitle}>Top 10 Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
