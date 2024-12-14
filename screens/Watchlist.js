import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use Navigation
  const navigation = useNavigation();

  // Fetch Watchlist
  useFocusEffect(
    React.useCallback(() => {
      const fetchWatchlist = async () => {
        setLoading(true);
        try {
          const storedWatchlist = await AsyncStorage.getItem("watchlist");
          setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
        } catch (error) {
          console.error("Error loading watchlist", error);
        } finally {
          setLoading(false);
        }
      };

      fetchWatchlist();
    }, [])
  );

  // Remove Movie from Watchlist
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

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  // Watchlist Screen
  return (
    <View style={styles.wrapper}>
      <Text style={styles.topTenTitle}>My Watchlist</Text>

      {watchlist.length === 0 ? (
        <Text style={styles.noResults}>No movies in watchlist</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={localStyles.movieItem}>
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
                  style={localStyles.moviePoster}
                />
              </TouchableOpacity>
              <Text style={localStyles.movieTitle}>{item.title}</Text>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromWatchlist(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    marginHorizontal: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
});
