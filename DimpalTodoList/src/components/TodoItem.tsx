import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../redux/todosSlice';

const TodoItem = ({ id, title, date, completed }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Text style={completed ? styles.completed : styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20,marginTop:20}}>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(id))} style={{backgroundColor:"skyblue",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontSize:20}}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTodo(id))} style={{backgroundColor:"skyblue",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontSize:20}}>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal:10
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 20,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
});

export default TodoItem;
