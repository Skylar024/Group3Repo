import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Watchlist from "./screens/Watchlist.js";
import Favorites from "./screens/Favorites.js";
import TopTen from "./screens/TopTen.js";
import MovieDetail from "./screens/MovieDetail.js";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Screen options for Tab and Drawer
const screenOptions = {
  headerStyle: {
    backgroundColor: "#14161a", // Top of page(Header)
  },
  headerTintColor: "#767f88", // Header Text Color
  tabBarStyle: {
    backgroundColor: "#14161a", // Bottom of page(Tabs)
  },
  tabBarActiveTintColor: "#1cc859",
  tabBarInactiveTintColor: "#767f88",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Stack Screen for Home */}
        <Stack.Screen name="Home" component={Home} options={screenOptions} />

        {/* Stack Screen for MovieDetail */}
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={screenOptions}
        />

        {/* Stack Screen for Tab/Drawer Navigator */}
        <Stack.Screen name="MainNavigator" options={{ headerShown: false }}>
          {() =>
            Platform.OS === "ios" ? (
              <Tab.Navigator>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={screenOptions}
                />
                <Tab.Screen
                  name="TopTen"
                  component={TopTen}
                  options={screenOptions}
                />
                <Tab.Screen
                  name="Watchlist"
                  component={Watchlist}
                  options={screenOptions}
                />
                <Tab.Screen
                  name="Favorites"
                  component={Favorites}
                  options={screenOptions}
                />
              </Tab.Navigator>
            ) : (
              <Drawer.Navigator>
                <Drawer.Screen
                  name="Home"
                  component={Home}
                  options={screenOptions}
                />
                <Drawer.Screen
                  name="Top Ten"
                  component={TopTen}
                  options={screenOptions}
                />
                <Drawer.Screen
                  name="Watchlist"
                  component={Watchlist}
                  options={screenOptions}
                />
                <Drawer.Screen
                  name="Favorites"
                  component={Favorites}
                  options={screenOptions}
                />
              </Drawer.Navigator>
            )
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
