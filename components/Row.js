import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Row({ item, selectedId, select, data, setData }) {
  const backgroundColor = item.completed ? "#d3ffd3" : "#fff";

  const toggleComplete = () => {
    const updatedData = data.map((task) =>
      task.id === item.id ? { ...task, completed: !task.completed } : task
    );
    setData(updatedData);
  };



  const remove = () => {
    const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId);
    setData(arrayWithoutRemoved);
    select(null);
  };

  return (
    <Pressable
    style={[styles.row, { backgroundColor }]}
    onPress={toggleComplete}
    onLongPress={() => select(item.id)} // talla voi sit poistaakki niit vaik on rustannu tehdyks
  >
      <Text style={[styles.rowText, item.completed && styles.completedText, ]}> {item.name}</Text>
      {item.id === selectedId && (
        <Ionicons name="trash" size={24} onPress={remove} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowText: {
    fontSize: 16,
    padding: 4,
    margin: 4,
    paddingTop: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 10
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
