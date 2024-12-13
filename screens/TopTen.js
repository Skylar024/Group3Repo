import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { getTopTenMovies } from "../api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopTen() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Use Navigation
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the current watchlist and favorite movies
    const fetchLists = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem("watchlist");
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Error loading watchlist or favorites", error);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const topMovies = await getTopTenMovies();
      setMovies(topMovies);
    }

    fetchMovies();
  }, []);

  // Add Movie to Watchlist
  const addToWatchlist = async (movie) => {
    // Check if the movie is already in the watchlist
    if (watchlist.some((item) => item.id === movie.id)) {
      console.log("Movie is already in the watchlist");
      return;
    }
    // Add to Watchlist
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    await AsyncStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  // Add Movie to Favorites
  const addToFavorites = async (movie) => {
    // Check if the movie is already in the favorites
    if (favorites.some((item) => item.id === movie.id)) {
      console.log("Movie is already on your favorites.");
      return;
    }
    // Add to Favorites
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <View style={styles.wrapper}>
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
                onPress={() =>
                  navigation.navigate("MovieDetail", { movie: item })
                }
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
    </View>
  );
}
