import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import TaskForm from './components/TaskForm.js';
import TaskList from './components/TaskList.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSaveTask = (newTask) => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSortTasks = () => {
    const priorityOrder = { Alta: 1, Média: 2, Baixa: 3 };
    const sortedTasks = [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setTasks(sortedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gerenciador de Tarefas</Text>
      <TaskForm
        onSaveTask={handleSaveTask}
        editTask={editIndex !== null ? tasks[editIndex] : null}
      />
      <TaskList
        tasks={tasks}
        onEditTask={setEditIndex}
        onDeleteTask={handleDeleteTask}
      />
      <Pressable style={styles.sortButton} onPress={handleSortTasks}>
        <Text style={styles.sortButtonText}>Ordenar por Prioridade</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
