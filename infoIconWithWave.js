import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function InfoIconWithWave({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => loopAnimation());
    };

    loopAnimation();
  }, [scale]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.iconContainer}>
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [{ scale }],
            },
          ]}
        />
        <Ionicons
          name="information-circle-outline"
          size={30}
          color="#1cc859"
          style={styles.icon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight:50,
  },
  wave: {
    position: "absolute",
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight:53,
    backgroundColor: "rgba(28, 184, 89, 0.3)",
    zIndex: -1, 
  },
  icon: {
    position: "absolute",
  },
});
