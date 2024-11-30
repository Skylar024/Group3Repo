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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Watchlist and Favorites
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  // Add to Watchlist
  const addToWatchlist = async (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    await AsyncStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  // Add to Favorites
  const addToFavorites = async (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
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
          <Text style={localStyles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={localStyles.movieItem}>
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/50x75?text=No+Image",
                  }}
                  style={localStyles.moviePoster}
                />
                <Text style={localStyles.movieTitle}>{item.title}</Text>

                {/* Button for Watchlist */}
                <View style={localStyles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() => addToWatchlist(item)}
                    style={localStyles.watchlistButton}
                  >
                    <Text style={localStyles.buttonText}>Add to Watchlist</Text>
                  </TouchableOpacity>
                  {/* Button for Favorites */}
                  <TouchableOpacity
                    onPress={() => addToFavorites(item)}
                    style={localStyles.favoriteButton}
                  >
                    <Text style={localStyles.buttonText}>Add to Favorites</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              searchQuery.trim() && (
                <Text style={localStyles.noResults}>No results found</Text>
              )
            }
          />
        )}
      </LinearGradient>
    </View>
  );
}

// Additional styles
const localStyles = StyleSheet.create({
  movieItem: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  moviePoster: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  noResults: {
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  watchlistButton: {
    backgroundColor: "#0000ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  favoriteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "white",
  },
});
