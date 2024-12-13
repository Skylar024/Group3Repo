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
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use Navigation
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const storedFavorites = await AsyncStorage.getItem("favorites");
          setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
        } catch (error) {
          console.error("Error loading favorites", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }, [])
  );

  const removeFromFavorites = async (movieId) => {
    try {
      const updatedFavorites = favorites.filter(
        (movie) => movie.id !== movieId
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing movie from favorites", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topTenTitle}>My Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noResults}>No movies in favorites</Text>
      ) : (
        <FlatList
          data={favorites}
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

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromFavorites(item.id)}
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
