import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function TaskForm({ onSaveTask, editTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Alta');

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.name);
      setTaskDescription(editTask.description);
      setTaskPriority(editTask.priority);
    }
  }, [editTask]);

  const handleSave = () => {
    if (!taskName.trim()) {
      alert('O nome da tarefa é obrigatório.');
      return;
    }

    onSaveTask({ name: taskName, description: taskDescription, priority: taskPriority });
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Alta');
  };

  return (
    <View>
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
      <Pressable style={styles.addButton} onPress={handleSave}>
        <Text style={styles.addButtonText}>Salvar Tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
