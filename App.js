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
        <Tab.Navigator >
          <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88",
            }}
          />
          <Tab.Screen 
            name="Watchlist" 
            component={Watchlist} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88",
            }}
          />
          <Tab.Screen 
            name="Favorites" 
            component={Favorites} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88",
            }}
          />
        </Tab.Navigator>
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" 
            component={Home} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88", 
            }}
          />
        
          <Drawer.Screen name="Watchlist" 
            component={Watchlist} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88", 
            }}
          />
          
          <Drawer.Screen name="Favorites" 
            component={Favorites} 
            options={{
              headerStyle: {
                backgroundColor: "#14161a", //Top of page(Header)
                
              },
              headerTintColor: "#767f88", //Header Text Color
              tabBarStyle: {
                backgroundColor: "#14161a", //Bottom of page(Tabs)
              },
              tabBarActiveTintColor: "#1cc859",
              tabBarInactiveTintColor: "#767f88", 
            }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
