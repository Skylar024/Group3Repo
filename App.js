import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Home from "./screens/Home";
import Placeholder from "./screens/Placeholder.js";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Placeholder" component={Placeholder} />
        </Tab.Navigator>
      )}

      {(Platform.OS === "android" || Platform.OS === "web") && (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Placeholder" component={Placeholder} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
