import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../redux/todosSlice';

const TodoForm = ({ id, existingTitle, existingDate }) => {
  const [title, setTitle] = useState(existingTitle || '');
  const [date, setDate] = useState(existingDate ? new Date(existingDate) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date'); 
  const dispatch = useDispatch();

  const handleSave = () => {
    if (id) {
      dispatch(editTodo({ id, title, date: date.toISOString() }));
    } else {
      dispatch(addTodo({
        id: Date.now().toString(),
        title,
        date: date.toISOString(),
        completed: false,
      }));
    }
    setTitle('');
    setDate(new Date());
  };

  const showDatePicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const showTimePicker = () => {
    setMode('time');
    setShowPicker(true);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
      <TouchableOpacity onPress={showDatePicker} style={{backgroundColor:"skyblue",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontSize:20}}>Pick Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimePicker} style={{backgroundColor:"skyblue",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontSize:20}}>Pick Time</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowPicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <TouchableOpacity onPress={handleSave} style={{backgroundColor:"skyblue",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontSize:20}}>Save</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    marginVertical: 8,
  },
  input: {
    fontSize: 18,
    marginBottom: 8,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
});

export default TodoForm;
