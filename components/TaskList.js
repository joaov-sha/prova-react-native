import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.taskItem}>
          <View>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskPriority}>Prioridade: {item.priority}</Text>
          </View>
          <View style={styles.taskActions}>
            <Pressable onPress={() => onEditTask(index)}>
              <Text style={styles.editText}>Editar</Text>
            </Pressable>
            <Pressable onPress={() => onDeleteTask(index)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDescription: {
    color: '#555',
  },
  taskPriority: {
    color: '#999',
  },
  taskActions: {
    justifyContent: 'space-between',
  },
  editText: {
    color: 'blue',
  },
  deleteText: {
    color: 'red',
  },
});
