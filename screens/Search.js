import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../styles";
import { LinearGradient } from "expo-linear-gradient";
import { searchMovies } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Watchlist and Favorites
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

  // Search Function
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setMovies([]);
      return;
    }

    setLoading(true);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <Text style={styles.topTenTitle}>Search Movies</Text>

      {/* Search Input */}
      <View style={styles.searchAndFilterContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.darkText}
            placeholder="Search for movies"
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Search Results */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // 3 movies per row
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

              {/* Buttons for Watchlist and Favorites */}
              <View style={styles.buttonsContainer2}>
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
          ListEmptyComponent={
            searchQuery.trim() && (
              <Text style={styles.noResults}>No results found</Text>
            )
          }
        />
      )}
    </View>
  );
}
