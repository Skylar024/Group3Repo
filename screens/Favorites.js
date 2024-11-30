import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Error loading favorites", error);
      }
    };

    fetchFavorites();
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
        <Text style={styles.topTenTitle}>My Favorites</Text>

        {/* Favorites Movies */}
        {favorites.length === 0 ? (
          <Text style={localStyles.noResults}>No movies in favorites</Text>
        ) : (
          <FlatList
            data={favorites}
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
});
