import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos: (state, action) => action.payload,
    addTodo: (state, action) => {
      state.push(action.payload);
      AsyncStorage.setItem('todos', JSON.stringify(state));
    },
    editTodo: (state, action) => {
      const { id, title, date } = action.payload;
      const existingTodo = state.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.date = date;
        AsyncStorage.setItem('todos', JSON.stringify(state));
      }
    },
    deleteTodo: (state, action) => {
      const updatedState = state.filter(todo => todo.id !== action.payload);
      AsyncStorage.setItem('todos', JSON.stringify(updatedState));
      return updatedState;
    },
    toggleTodo: (state, action) => {
      const existingTodo = state.find(todo => todo.id === action.payload);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
        AsyncStorage.setItem('todos', JSON.stringify(state));
      }
    },
    clearCompleted: (state) => {
      const updatedState = state.filter(todo => !todo.completed);
      AsyncStorage.setItem('todos', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { setTodos, addTodo, editTodo, deleteTodo, toggleTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;

export const loadTodos = () => async dispatch => {
  const todosString = await AsyncStorage.getItem('todos');
  const todos = todosString ? JSON.parse(todosString) : [];
  dispatch(setTodos(todos));
};
