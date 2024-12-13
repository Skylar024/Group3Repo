import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import Watchlist from "./screens/Watchlist";
import Favorites from "./screens/Favorites";
import TopTen from "./screens/TopTen";
import Search from "./screens/Search";
import MovieDetail from "./screens/MovieDetail";
import { Alert, Platform } from "react-native";
import { InfoIconWithWave } from "./infoIconWithWave";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function showInfoAlert() {
  Alert.alert(
    "App Info",
    "This is a movie app to browse and manage your watchlist and favorites. The app uses the IMDB database to fetch movie data.\n\n" +
      "For Academic Final Project\n" +
      "Realized by: Skylar Thompson, Jacob Oswalt, Olivia Stanich & Daniel Santana\n" +
      "Course: 50P - Fall 2024 - Hybrid Apps and Frameworks\n" +
      "Institution: IvyTech Community College\n" +
      "Indiana @ December 2024"
  );
}

// Screen Stacks

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

function TopTenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTenScreen"
        component={TopTen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

function WatchlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WatchlistScreen"
        component={Watchlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesScreen"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#460000", // Header background color
  },
  headerTintColor: "#FABC3F", // Header text color
  tabBarStyle: {
    backgroundColor: "#460000", // Bottom tab background color
  },
  tabBarActiveTintColor: "#FABC3F",
  tabBarInactiveTintColor: "#8f091b",
  drawerStyle: {
    backgroundColor: "#460000", // Drawer background color
  },
  drawerActiveTintColor: "#FABC3F",
  drawerInactiveTintColor: "#8f091b",
  headerRight: () => <InfoIconWithWave onPress={showInfoAlert} />,
};

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            ...screenOptions,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "TopTen") {
                iconName = focused ? "star" : "star-outline";
              } else if (route.name === "Watchlist") {
                iconName = focused ? "bookmark" : "bookmark-outline";
              } else if (route.name === "Favorites") {
                iconName = focused ? "heart" : "heart-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="TopTen" component={TopTenStack} />
          <Tab.Screen name="Watchlist" component={WatchlistStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
        </Tab.Navigator>
      ) : (
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            ...screenOptions,
            drawerIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "Top Ten") {
                iconName = focused ? "star" : "star-outline";
              } else if (route.name === "Watchlist") {
                iconName = focused ? "bookmark" : "bookmark-outline";
              } else if (route.name === "Favorites") {
                iconName = focused ? "heart" : "heart-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="Search" component={SearchStack} />
          <Drawer.Screen name="Top Ten" component={TopTenStack} />
          <Drawer.Screen name="Watchlist" component={WatchlistStack} />
          <Drawer.Screen name="Favorites" component={FavoritesStack} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
