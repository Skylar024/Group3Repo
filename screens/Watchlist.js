import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem("watchlist");
        setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
      } catch (error) {
        console.error("Error loading watchlist", error);
      }
    };

    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    try {
      const updatedWatchlist = watchlist.filter(
        (movie) => movie.id !== movieId
      );
      setWatchlist(updatedWatchlist);
      await AsyncStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } catch (error) {
      console.error("Error removing movie from watchlist", error);
    }
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
        <Text style={styles.topTenTitle}>My Watchlist</Text>

        {/* Watchlist Movies */}
        {watchlist.length === 0 ? (
          <Text style={localStyles.noResults}>No movies in watchlist</Text>
        ) : (
          <FlatList
            data={watchlist}
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
                {/* Delete Button */}
                <TouchableOpacity
                  style={localStyles.deleteButton}
                  onPress={() => removeFromWatchlist(item.id)}
                >
                  <Text style={localStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </LinearGradient>
    </View>
  );
}

const localStyles = StyleSheet.create({
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  moviePoster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  noResults: {
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
});
