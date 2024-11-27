import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../styles";
import { getTopTenMovies } from "../api";

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
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
