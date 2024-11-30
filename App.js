import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Alta');
  const [editIndex, setEditIndex] = useState(null);

  const handleSaveTask = () => {
    if (!taskName.trim()) {
      Alert.alert('Erro', 'O nome da tarefa é obrigatório.');
      return;
    }

    const newTask = { name: taskName, description: taskDescription, priority: taskPriority };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Alta');
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

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gerenciador de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />

      {/* "Radio Buttons" para Prioridade */}
      <Text style={styles.radioLabel}>Prioridade:</Text>
      <View style={styles.radioGroup}>
        {['Alta', 'Média', 'Baixa'].map((priority) => (
          <Pressable
            key={priority}
            style={styles.radioButton}
            onPress={() => setTaskPriority(priority)}
          >
            <View style={styles.radioCircle}>
              {taskPriority === priority && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>{priority}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.addButton} onPress={handleSaveTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== null ? 'Editar Tarefa' : 'Adicionar Tarefa'}
        </Text>
      </Pressable>

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
              <Pressable onPress={() => handleEditTask(index)}>
                <Text style={styles.editText}>Editar</Text>
              </Pressable>
              <Pressable onPress={() => handleDeleteTask(index)}>
                <Text style={styles.deleteText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
