import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { Task, TasksListProps } from "./TasksList";

interface TaskItemProps extends TasksListProps {
  item: Task;
  index: number;
}
export function TaskItem({
  item,
  editTask,
  index,
  toggleTaskDone,
  removeTask,
}: TaskItemProps) {
  const [editItem, setEditItem] = useState(false);
  const [newTitleTask, setNewTitleTask] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditItem(true);
  }

  function handleCancelEditing() {
    setNewTitleTask(item.title);
    setEditItem(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitleTask);
    setEditItem(false);
  }

  useEffect(() => {
    if (editItem) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [editItem]);
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => {
            toggleTaskDone(item.id);
          }}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newTitleTask}
            onChangeText={setNewTitleTask}
            editable={editItem}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {editItem ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ marginRight: 18 }}
          >
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEditItem(true)}
            style={{ marginRight: 18 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={editItem}
          onPress={() => removeTask(item.id)}
          style={{ paddingHorizontal: 24 }}
        >
          <Image source={trashIcon} style={{ opacity: editItem ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196, 0.24)",
  },
});
