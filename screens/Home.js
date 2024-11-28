import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import styles from "../styles";
import { getTopTenMovies, getTwoMovies } from "../api";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// let movieArray = [];

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const topMovies = await getTopTenMovies();
      const twoMovies = await getTwoMovies();
      const allMovies = [...topMovies, ...twoMovies];
      console.log("Movies Array Length:", allMovies.length);
      setMovies(allMovies);
    }

    fetchMovies();
  }, []);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[
          "#14161a",
          "#09481f",
          "#117b36",
          "#1cc859",
          "#117b36",
          "#09481f",
          "#14161a",
        ]}
        style={styles.gradient}
      >
        <Text style={styles.topTenTitle}>Top 10 Movies</Text>
        <View style={styles.searchAndFilterContainer}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.darkText}
              placeholder="Search"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.darkText}>≡</Text>
          </View>
        </View>

        <View style={styles.movieListContainer}>
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 20 }}
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
      </LinearGradient>
    </View>
  );
}
