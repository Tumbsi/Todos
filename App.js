import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Row from "./components/Row";
import Add from "./components/Add";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("tasks");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save data", error);
      }
    };
    saveData();
  }, [data]);

  const handleAdd = useCallback(
    (name) => {
      const newItem = {
        id: uuid.v4(),
        name: name,
        completed: false,
      };
      const tempData = [...data, newItem];
      setData(tempData);
    },
    [data]
  );

  const select = (id) => {
    setSelectedId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <Add add={handleAdd} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
          <Row
            item={item}
            selectedId={selectedId}
            select={select}
            data={data}
            setData={setData}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    paddingTop: 100,
  },
});
