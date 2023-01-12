import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find(task => task.title === newTaskTitle)
    if(existingTask){
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      )
    }
    setTasks([...tasks, {id: new Date().getTime(), title: newTaskTitle, done: false}])
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return ({
          ...task,
          title: taskNewTitle
      })
    }
    return task
  })

  setTasks(updatedTasks)
  }
  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return ({
          ...task,
          done: !task.done
      })
    }
    return task
  })

  setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const filteredWithoutTask = tasks.filter(task => task.id !== id );
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: 'Não',
          style: "cancel"
          
        },
        {
          text:'Sim',
          onPress: () => setTasks(filteredWithoutTask),
          style: "default"
        }
      ]
    )

    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})