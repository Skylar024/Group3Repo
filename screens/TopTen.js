import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { getTopTenMovies } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function TopTen() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

    // Use Navigation
    const navigation = useNavigation();

  useEffect(() => {
    async function fetchMovies() {
      const topMovies = await getTopTenMovies();
      setMovies(topMovies);
    }

    fetchMovies();
  }, []);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => [...prev, movie]);
  };

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

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

        <View style={styles.movieListContainer}>
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.movieContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MovieDetail", { movie: item })}
                >
                  <Image
                    source={{
                      uri: item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/50x75?text=No+Image",
                    }}
                    style={styles.moviePoster}
                  />
                  <Text style={styles.movieTitle}>{item.title}</Text>
                </TouchableOpacity>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() => addToWatchlist(item)}
                    style={[
                      styles.watchlistButton,
                      watchlist.some((m) => m.id === item.id) && {
                        backgroundColor: "gray",
                      },
                    ]}
                    disabled={watchlist.some((m) => m.id === item.id)}
                  >
                    <Text style={styles.buttonText}>
                      {watchlist.some((m) => m.id === item.id)
                        ? "In Watchlist"
                        : "Add to Watchlist"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => addToFavorites(item)}
                    style={[
                      styles.favoriteButton,
                      favorites.some((m) => m.id === item.id) && {
                        backgroundColor: "gray",
                      },
                    ]}
                    disabled={favorites.some((m) => m.id === item.id)}
                  >
                    <Text style={styles.buttonText}>
                      {favorites.some((m) => m.id === item.id)
                        ? "In Favorites"
                        : "Add to Favorites"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
