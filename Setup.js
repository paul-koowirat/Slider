import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useNavigation } from "@react-navigation/native";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Setup = () => {
  const [initialCount, setInitialCount] = useState(0);
  const [offsetLevel, setOffsetLevel] = useState(0);
  const [shotDelay, setShotDelay] = useState(0);
  //const navigation = useNavigation();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const savedInitialCount = await AsyncStorage.getItem("initialCount");
        const savedOffsetLevel = await AsyncStorage.getItem("offsetLevel");
        const savedShotDelay = await AsyncStorage.getItem("shotDelay");

        if (savedInitialCount !== null) {
          setInitialCount(parseInt(savedInitialCount));
        }
        if (savedOffsetLevel !== null) {
          setOffsetLevel(parseInt(savedOffsetLevel));
        }
        if (savedShotDelay !== null) {
          setShotDelay(parseInt(savedShotDelay));
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    retrieveData();
  }, []);

  const saveToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem("initialCount", initialCount.toString());
      await AsyncStorage.setItem("offsetLevel", offsetLevel.toString());
      await AsyncStorage.setItem("shotDelay", shotDelay.toString());
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const saveSetup = async () => {
    await saveToAsyncStorage();
    //navigation.navigate("Home");
  };

  const reset = () => {
    setInitialCount(5);
    setOffsetLevel(-10);
    setShotDelay(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set up</Text>
      <View style={styles.slideHeader}>
        <Text style={styles.text}>Count Down : </Text>
        <Text style={styles.text}>{initialCount} Seconds</Text>
      </View>
      <Slider
        style={{ width: screenWidth * 0.8, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#00ff00"
        maximumTrackTintColor="#ff0000"
        value={initialCount}
        onValueChange={(value) => setInitialCount(value)}
      />

      <View style={styles.slideHeader}>
        <Text style={styles.text}>Offset Level : </Text>
        <Text style={styles.text}>{offsetLevel} dB</Text>
      </View>
      <Slider
        style={{ width: screenWidth * 0.8, height: 40 }}
        minimumValue={-40}
        maximumValue={0}
        step={1}
        minimumTrackTintColor="#00ff00"
        maximumTrackTintColor="#ff0000"
        value={offsetLevel}
        onValueChange={(value) => setOffsetLevel(value)}
      />

      <View style={styles.slideHeader}>
        <Text style={styles.text}>Shot Delay : </Text>
        <Text style={styles.text}>{shotDelay} Seconds</Text>
      </View>
      <Slider
        style={{ width: screenWidth * 0.8, height: 40 }}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        minimumTrackTintColor="#00ff00"
        maximumTrackTintColor="#ff0000"
        value={shotDelay}
        onValueChange={(value) => setShotDelay(value)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveSetup}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  slideHeader: {
    flexDirection: "row",
    //alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 10,
    backgroundColor: "blue",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
export default Setup;
