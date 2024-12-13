import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import styles from "../styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-deck-swiper";
import { allMovies } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {

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

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedMovies = await allMovies();
        setMovies(fetchedMovies);

        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists(),fetchData();
  }, []);

  const addToWatchlist = async (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      console.log("Movie already in Watchlist");
      return;
    }

    try {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist([...updatedWatchlist]); // Forcing re-render
      await AsyncStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      console.log("Added to Watchlist:", movie.title);
    } catch (error) {
      console.error("Error adding to Watchlist:", error);
    }
  };

  const addToFavorites = async (movie) => {
    if (favorites.some((item) => item.id === movie.id)) {
      console.log("Movie already in Favorites");
      return;
    }

    try {
      const updatedFavorites = [...favorites, movie];
      setFavorites([...updatedFavorites]); // Forcing re-render
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Added to Favorites:", movie.title);
    } catch (error) {
      console.error("Error adding to Favorites:", error);
    }
  };

  const isInWatchlist = (movie) =>
    watchlist.some((item) => item.id === movie.id);

  const isInFavorites = (movie) =>
    favorites.some((item) => item.id === movie.id);

  return (
    <View style={styles.wrapper}>
      
      <Text style={styles.topTenTitle}>Swipe Movies, are you ready?</Text>

      {loading ? (
        <ActivityIndicator size="large" color="yellow" />
      ) : movies.length > 0 ? (
        <Swiper
          cards={movies}
          renderCard={(movie) => (
            <View style={localStyles.card}>
              <Text style={styles.test}> ⓘ Swipe any Direction to view another movie!</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MovieDetail", { movie: movie })
                }
              >
                <Image
                  source={{
                    uri: movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image",
                  }}
                  style={localStyles.poster}
                />
              </TouchableOpacity>
              <Text style={localStyles.title}>{movie.title}</Text>
              <Text style={localStyles.overview}>{movie.overview}</Text>

              <View style={localStyles.buttonsContainer}>
                {/* Watchlist Button */}
                <TouchableOpacity
                  onPress={() => addToWatchlist(movie)}
                  style={[
                    localStyles.watchlistButton,
                    isInWatchlist(movie) && localStyles.disabledButton,
                  ]}
                  disabled={isInWatchlist(movie)}
                >
                  <Text style={localStyles.buttonText}>
                    {isInWatchlist(movie)
                      ? "In Watchlist"
                      : "Add to Watchlist"}
                  </Text>
                </TouchableOpacity>

                {/* Favorites Button */}
                <TouchableOpacity
                  onPress={() => addToFavorites(movie)}
                  style={[
                    localStyles.favoriteButton,
                    isInFavorites(movie) && localStyles.disabledButton,
                  ]}
                  disabled={isInFavorites(movie)}
                >
                  <Text style={localStyles.buttonText}>
                    {isInFavorites(movie)
                      ? "In Favorites"
                      : "Add to Favorites"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          cardIndex={0}
          backgroundColor="#E85C0D" //Background Color of Swiper
          stackSize={3}
        />
      ) : (
        <Text style={styles.noResults}>No movies to display</Text>
      )}
      
    </View>
  );
}

const localStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730000",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    marginTop: -50,
    
  },
  poster: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginTop: -100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "ghostwhite",
    textAlign: "center",
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: "ghostwhite",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: '20%',
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
  },
  watchlistButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#B43E0E",
    borderRadius: 5,
    alignItems: "center",
  },
  favoriteButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E05F1D",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
    opacity: 0.7,
  },
  
});
