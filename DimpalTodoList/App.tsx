import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadTodos, clearCompleted } from './src/redux/todosSlice';
import TodoItem from './src/components/TodoItem';
import TodoForm from './src/components/TodoForm';

const MainApp = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
    const interval = setInterval(() => {
      dispatch(clearCompleted());
    }, 60000); 
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <SafeAreaView>
      <TodoForm />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem {...item} />
        )}
        keyExtractor={item => item.id}
      />
          <TouchableOpacity onPress={() => dispatch(clearCompleted())} style={{backgroundColor:"skyblue", padding:10, borderRadius:10, alignItems:"center", marginHorizontal:10, marginTop:10}}>
        <Text style={{color:"white", fontSize:20}}>Clear Completed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
