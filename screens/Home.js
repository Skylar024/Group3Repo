import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import styles from "../styles";
import { getTopTenMovies, getTwoMovies } from "../api";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

let movieArray = []

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const topMovies = await getTopTenMovies();
      setMovies(topMovies);
    }

    // ========================== //
    async function fetchTwoMovies() {
      const twoMovies = await getTwoMovies();
      setMovies2(twoMovies);
        
    }
    // ========================== //

    fetchMovies();
    fetchTwoMovies();

  }, []);

  return (
    //
    <View style={styles.wrapper}>
      <View style={styles.bodyContainer}>
        <LinearGradient
          colors={["#14161a", "#09481f", "#117b36", "#1cc859", "#117b36", "#09481f", "#14161a"]}
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
              <Text style={styles.darkText}>
                ≡
              </Text>
            </View>
          </View>
          <View style={styles.movieContainer}>
            <FlatList // First column
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
            <FlatList // Second column
              data={movies2}
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
        </LinearGradient>
      </View>
    </View>
  );
}
