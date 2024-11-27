import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Home from "./screens/Home";
import Watchlist from "./screens/Watchlist.js";
import Favorites from "./screens/Favorites.js";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Watchlist" component={Watchlist} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Watchlist" component={Watchlist} />
          <Drawer.Screen name="Favorites" component={Favorites} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
